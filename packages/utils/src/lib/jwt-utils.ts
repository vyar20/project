import { JWTPayload, SignJWT, jwtVerify } from 'jose'

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET env variable is not set or empty')
}

const jwtExpirationTime = '15m'
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export const signJWT = (payload: JWTPayload, expirationAt: string = jwtExpirationTime) =>
    new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expirationAt)
        .sign(secret)

export const verifyJWT = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })

        return payload
    } catch (error) {
        return null
    }
}
