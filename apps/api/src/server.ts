import { env } from "./config/env.js"
import { buildApp } from "./app.js"
import { startScheduler } from "./jobs/scheduler.js"

const app = await buildApp()

const shutdown = async (signal: string) => {
  app.log.info(`Received ${signal}, shutting down gracefully`)
  await app.close()
  process.exit(0)
}

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

try {
  await app.listen({ port: env.PORT, host: "0.0.0.0" })
  startScheduler()
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
