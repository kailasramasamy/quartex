export class AppError extends Error {
  readonly statusCode: number
  readonly code: string

  constructor(message: string, statusCode: number, code: string) {
    super(message)
    this.name = "AppError"
    this.statusCode = statusCode
    this.code = code
  }
}

export function notFound(message: string): AppError {
  return new AppError(message, 404, "NOT_FOUND")
}

export function badRequest(message: string): AppError {
  return new AppError(message, 400, "BAD_REQUEST")
}

export function unauthorized(message: string): AppError {
  return new AppError(message, 401, "UNAUTHORIZED")
}

export function conflict(message: string): AppError {
  return new AppError(message, 409, "CONFLICT")
}
