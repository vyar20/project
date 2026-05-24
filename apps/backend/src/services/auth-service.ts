import { db } from '@/repositories/db'
import { generateRandomString, hashString, verifyHash } from '@repo/utils/lib/auth-utils'
import { signJWT } from '@repo/utils/lib/jwt-utils'
import { ErrorHandler, p } from '@repo/utils/utils'
import {
    RefreshTokenValidation,
    SignInValidation,
    SignOutValidation,
    SignUpValidation
} from '@repo/validations/auth-validations'

export const signUpUser = async (inputs: SignUpValidation) => {
    const { email, name, password } = inputs

    const hashPassword = await hashString(password)

    const [errCheckUser, user] = await p(
        db.user.findFirst({
            where: { email }
        })
    )

    if (errCheckUser)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    if (user)
        throw new ErrorHandler('CONFLICT', 'Email already exist, please try with another email.')

    const [errCreateUser, createdUser] = await p(
        db.user.create({
            data: {
                email,
                name,
                password: hashPassword
            }
        })
    )

    if (errCreateUser)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    return createdUser
}

export const signInUser = async (inputs: SignInValidation) => {
    const { email, password, deviceId, deviceModel, deviceType } = inputs

    const [errCheckUser, user] = await p(
        db.user.findFirst({
            where: { email }
        })
    )

    if (errCheckUser)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    if (!user) throw new ErrorHandler('NOT_FOUND', 'Email or password combination not matched.')

    const isPasswordValid = await verifyHash(password, user.password)

    if (!isPasswordValid)
        throw new ErrorHandler('NOT_FOUND', 'Email or password combination not matched.')

    const accessToken = await signJWT({ sub: user.id, role: user.role, email: user.email })
    const refreshToken = generateRandomString()
    const hashRefreshToken = await hashString(refreshToken)

    const [errUpdateUser] = await p(
        db.session.upsert({
            where: { deviceId, deleted: false },
            create: {
                userId: user.id,
                deviceType: deviceType ?? 'UNKNOWN',
                deviceId,
                deviceModel,
                refreshTokenExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
                hashRefreshToken
            },
            update: {
                hashRefreshToken,
                deleted: false
            }
        })
    )

    if (errUpdateUser)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    return {
        accessToken,
        refreshToken
    }
}

export const signOutUser = async (inputs: SignOutValidation) => {
    const { deviceId } = inputs

    const [errUpdateSession] = await p(
        db.session.update({
            where: { deviceId, deleted: false },
            data: {
                deleted: true
            }
        })
    )

    if (errUpdateSession)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    return null
}

export const refreshToken = async (inputs: RefreshTokenValidation) => {
    const { refreshToken, deviceId } = inputs

    const [errFindSession, session] = await p(
        db.session.findFirst({
            where: { deviceId, deleted: false }
        })
    )

    if (errFindSession)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    if (!session)
        throw new ErrorHandler('NOT_FOUND', 'Invalid refresh token, please sign in again.')

    if (session.refreshTokenExpiredAt < new Date())
        throw new ErrorHandler('UNAUTHORIZED', 'Invalid refresh token, please sign in again.')

    const isRefreshTokenValid = await verifyHash(refreshToken, session.hashRefreshToken)

    if (!isRefreshTokenValid)
        throw new ErrorHandler('UNAUTHORIZED', 'Invalid refresh token, please sign in again.')

    const [errFindUser, user] = await p(
        db.user.findFirst({
            where: { id: session.userId }
        })
    )

    if (errFindUser)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    if (!user) throw new ErrorHandler('NOT_FOUND', 'Invalid refresh token, please sign in again.')

    const accessToken = await signJWT({ sub: user.id, role: user.role, email: user.email })
    const refreshTokenNew = generateRandomString()
    const hashRefreshToken = await hashString(refreshTokenNew)

    const [errUpdateSession] = await p(
        db.session.update({
            where: { deviceId, deleted: false },
            data: {
                hashRefreshToken,
                refreshTokenExpiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
            }
        })
    )

    if (errUpdateSession)
        throw new ErrorHandler(
            'INTERNAL_SERVER_ERROR',
            'Something went wrong, please try again later.'
        )

    return {
        accessToken,
        refreshToken: refreshTokenNew
    }
}
