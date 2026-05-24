import { Hono } from "hono"
import authRoute from "./auth-route"

const route = new Hono()

route.route("/auth", authRoute)

export default route
