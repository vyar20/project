import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export class ErrorHandler extends Error {
    code: keyof typeof HTTP_CODE
    message: string
    status: number

    constructor(code: keyof typeof HTTP_CODE, message: string) {
        super()
        this.code = code
        this.message = message
        this.status = getHTTPStatusCode(code)
    }
}

export const p = <T>(p: Promise<T>): Promise<[null, T] | [Error | ErrorHandler]> =>
    p.then((result) => [null, result] as [null, T]).catch((error) => [error])

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes))

export enum HTTP_CODE {
    OK = "OK",
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    CONFLICT = "CONFLICT"
}

export const HTTP_STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409
}

export const getHTTPStatusCode = (code: keyof typeof HTTP_CODE): number => HTTP_STATUS_CODE[code]
