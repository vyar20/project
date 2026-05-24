import z from 'zod'

export const signInValidation = z.object({
    email: z.email('Invalid email address'),
    password: z
        .string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{12,}$/,
            'Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and special characters'
        ),
    deviceId: z.string(),
    deviceModel: z.string(),
    deviceType: z.enum(['UNKNOWN', 'PHONE', 'TABLET', 'TV', 'DESKTOP'])
})

export type SignInValidation = z.infer<typeof signInValidation>

export const signUpValidation = z.object({
    ...signInValidation.shape,
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    deviceId: z.string().optional(),
    deviceModel: z.string().optional(),
    deviceType: z.string().optional()
})

export type SignUpValidation = z.infer<typeof signUpValidation>

export const signOutValidation = z.object({
    deviceId: z.string(),
    accessToken: z.string(),
    refreshToken: z.string()
})

export type SignOutValidation = z.infer<typeof signOutValidation>

export const refreshTokenValidation = z.object({
    refreshToken: z.string(),
    deviceId: z.string()
})

export type RefreshTokenValidation = z.infer<typeof refreshTokenValidation>
