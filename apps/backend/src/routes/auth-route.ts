import {
    refreshTokenController,
    signInController,
    signOutController,
    signUpController
} from '@/controllers/auth-controller'
import { isAuthenticated } from '@/middleware/is-authenticated-middleware'
import { validationsMiddleware } from '@/middleware/validation-middleware'
import {
    refreshTokenValidation,
    signInValidation,
    signOutValidation,
    signUpValidation
} from '@repo/validations/auth-validations'
import { Hono } from 'hono'

const authRoute = new Hono()

authRoute.post(
    '/sign-up',
    (c, next) => validationsMiddleware(c, next, signUpValidation),
    signUpController
)

authRoute.post(
    '/sign-in',
    (c, next) => validationsMiddleware(c, next, signInValidation),
    signInController
)

authRoute.delete(
    '/sign-out',
    isAuthenticated,
    (c, next) => validationsMiddleware(c, next, signOutValidation),
    signOutController
)

authRoute.post(
    '/refresh-token',
    (c, next) => validationsMiddleware(c, next, refreshTokenValidation),
    refreshTokenController
)

export default authRoute
