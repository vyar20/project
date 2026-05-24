import { randomBytes } from 'crypto'

export const hashString = (input: string) =>
    Bun.password.hash(input, {
        algorithm: 'bcrypt',
        cost: 10
    })

export const verifyHash = (input: string, hash: string) => Bun.password.verify(input, hash)

export const generateRandomString = () => randomBytes(32).toString('hex')
