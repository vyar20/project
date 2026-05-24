import { ErrorHandler } from '@repo/utils/utils'
import { Context, Next } from 'hono'
import { cloneRawRequest } from 'hono/request'
import { ZodSchema } from 'zod'

export const validationsMiddleware = async (c: Context, next: Next, schema: ZodSchema) => {
    const input = await (await cloneRawRequest(c.req)).json()

    const parsed = schema.safeParse(input)
    if (!parsed.success)
        throw new ErrorHandler(
            'BAD_REQUEST',
            'Invalid input, please check your data and try again.'
        )

    return await next()
}
