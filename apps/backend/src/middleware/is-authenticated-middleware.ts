import { verifyJWT } from '@repo/utils/lib/jwt-utils'
import { ErrorHandler } from '@repo/utils/utils'
import { Context, Next } from 'hono'
import { cloneRawRequest } from 'hono/request'

export const isAuthenticated = async (c: Context, next: Next) => {
    const clone = await cloneRawRequest(c.req)
    const authorization = clone.headers.get('Authorization')

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

    return await next()
}
