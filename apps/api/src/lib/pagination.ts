interface PaginateParams {
  page?: number | string
  limit?: number | string
}

interface PaginateResult {
  offset: number
  limit: number
}

interface PaginatedResponseParams<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function paginate(params: PaginateParams): PaginateResult {
  const page = Math.max(1, Number(params.page ?? 1))
  const limit = Math.min(100, Math.max(1, Number(params.limit ?? 20)))
  const offset = (page - 1) * limit
  return { offset, limit }
}

export function paginatedResponse<T>(
  params: PaginatedResponseParams<T>,
): PaginatedResponse<T> {
  const { data, total, page, limit } = params
  const totalPages = Math.ceil(total / limit)
  return {
    data,
    pagination: { page, limit, total, totalPages },
  }
}
