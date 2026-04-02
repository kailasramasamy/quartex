import type { FastifyRequest, FastifyReply } from "fastify"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string; email: string; role: string }
    user: { id: string; email: string; role: string }
  }
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    await request.jwtVerify()
  } catch {
    reply.code(401).send({ error: "Unauthorized" })
  }
}
