import route from "@/routes/route"
import { ErrorHandler, HTTP_CODE, HTTP_STATUS_CODE } from "@repo/utils/utils"
import { Hono } from "hono"
import { ContentfulStatusCode } from "hono/utils/http-status"

const app = new Hono()

app.route("/api", route)

app.onError((err, c) => {
    if (err instanceof ErrorHandler) {
        return c.json(
            {
                success: false,
                error: {
                    code: err.code,
                    message: err.message
                }
            },
            err.status as ContentfulStatusCode
        )
    }

    return c.json(
        {
            success: false,
            error: {
                code: HTTP_CODE.INTERNAL_SERVER_ERROR,
                message: err.message ?? "Internal Server Error"
            }
        },
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR as ContentfulStatusCode
    )
})

export default {
    port: 3000,
    fetch: app.fetch
}
