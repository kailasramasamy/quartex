import Fastify from "fastify"
import cors from "@fastify/cors"
import multipart from "@fastify/multipart"
import jwtPlugin from "./plugins/jwt.js"
import authRoutes from "./routes/auth/index.js"
import healthRoutes from "./routes/health/index.js"
import programRoutes from "./routes/programs/index.js"
import inviteRoutes from "./routes/invite/index.js"
import testerRoutes from "./routes/testers/index.js"
import feedbackRoutes from "./routes/feedback/index.js"
import releaseRoutes from "./routes/releases/index.js"
import dashboardRoutes from "./routes/dashboard/index.js"
import { AppError } from "./lib/errors.js"

export async function buildApp() {
  const app = Fastify({ logger: true })

  await app.register(cors, { origin: true })
  await app.register(multipart)
  await app.register(jwtPlugin)

  await app.register(authRoutes, { prefix: "/api/v1/auth" })
  await app.register(healthRoutes, { prefix: "/api/v1/health" })
  await app.register(programRoutes, { prefix: "/api/v1/programs" })
  await app.register(inviteRoutes, { prefix: "/api/v1/invite" })
  await app.register(testerRoutes, { prefix: "/api/v1/testers" })
  await app.register(feedbackRoutes, { prefix: "/api/v1/feedback" })
  await app.register(releaseRoutes, { prefix: "/api/v1/releases" })
  await app.register(dashboardRoutes, { prefix: "/api/v1/dashboard" })

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
