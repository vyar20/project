import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const jwtExpirationTime = '15m'
const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export const signJWT = (payload: JWTPayload, expirationAt: string = jwtExpirationTime) =>
    new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expirationAt)
        .sign(secret)

export const verifyJWT = async (token: string) => {
    const { payload } = await jwtVerify(token, secret)

    return payload
}
