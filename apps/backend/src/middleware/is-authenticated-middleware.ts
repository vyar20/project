import { verifyJWT } from '@repo/utils/lib/jwt-utils'
import { ErrorHandler } from '@repo/utils/utils'
import { Context, Next } from 'hono'

export const isAuthenticated = async (c: Context, next: Next) => {
    const authorization = c.req.header('Authorization')

    if (!authorization)
        throw new ErrorHandler('UNAUTHORIZED', 'Token is missing in the Authorization header.')

    const [authType, token] = authorization.split(' ')

    if (authType !== 'Bearer')
        throw new ErrorHandler(
            'UNAUTHORIZED',
            'Authorization header must be in the format: Bearer <token>.'
        )

    if (!token)
        throw new ErrorHandler('UNAUTHORIZED', 'Token is missing in the Authorization header.')

    const payload = await verifyJWT(token)

    if (!payload)
        throw new ErrorHandler('UNAUTHORIZED', 'Token is missing in the Authorization header.')

    c.set('user', payload)

    return await next()
}
