import Fastify from "fastify"
import cors from "@fastify/cors"
import multipart from "@fastify/multipart"
import jwtPlugin from "./plugins/jwt.js"
import authRoutes from "./routes/auth/index.js"
import healthRoutes from "./routes/health/index.js"
import { AppError } from "./lib/errors.js"

export async function buildApp() {
  const app = Fastify({ logger: true })

  await app.register(cors, { origin: true })
  await app.register(multipart)
  await app.register(jwtPlugin)

  await app.register(authRoutes, { prefix: "/api/v1/auth" })
  await app.register(healthRoutes, { prefix: "/api/v1/health" })

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply
        .code(error.statusCode)
        .send({ error: error.message, code: error.code })
    }
    request.log.error(error)
    return reply.code(500).send({ error: "Internal Server Error" })
  })

  return app
}
