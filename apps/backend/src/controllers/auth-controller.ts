import { refreshToken, signInUser, signOutUser, signUpUser } from '@/services/auth-service'
import { Context } from 'hono'

export const signUpController = async (c: Context) => {
    const input = await c.req.json()

    await signUpUser(input)

    return c.json({
        success: true,
        data: {
            message: 'Sign up successful'
        }
    })
}

export const signInController = async (c: Context) => {
    const input = await c.req.json()

    const { accessToken, refreshToken } = await signInUser(input)

    return c.json({
        success: true,
        data: {
            accessToken,
            refreshToken
        }
    })
}

export const signOutController = async (c: Context) => {
    const input = await c.req.json()

    await signOutUser(input)

    return c.json({
        success: true,
        data: {
            message: 'Sign out successful'
        }
    })
}

export const refreshTokenController = async (c: Context) => {
    const input = await c.req.json()

    const { accessToken } = await refreshToken(input)

    return c.json({
        success: true,
        data: {
            accessToken
        }
    })
}
