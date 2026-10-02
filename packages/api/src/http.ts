let getToken: () => Promise<string | null> = async () => null
let onRefresh: (() => Promise<boolean>) | null = null
let onUnauthorized: (() => void) | null = null
let baseUrl = ''

export const configureApi = (options: {
  baseUrl: string
  getToken: () => Promise<string | null>
  onRefresh?: () => Promise<boolean>
  onUnauthorized?: () => void
}) => {
  baseUrl = options.baseUrl
  getToken = options.getToken
  onRefresh = options.onRefresh ?? null
  onUnauthorized = options.onUnauthorized ?? null
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public messages: string[]
  ) {
    super(messages[0])
  }
}

let refreshPromise: Promise<boolean> | null = null

const request = async (url: string, init?: RequestInit) => {
  const token = await getToken()

  return fetch(`${baseUrl}${url}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })
}

export const http = async <T>(url: string, init?: RequestInit): Promise<T> => {
  if (!baseUrl) throw new Error('baseUrl is not configured')

  let response = await request(url, init)

  if (response.status === 401 && onRefresh && !url.includes('/auth')) {
    if (!refreshPromise) {
      refreshPromise = onRefresh().finally(() => {
        refreshPromise = null
      })
    }

    const isRefreshed = await refreshPromise

    if (isRefreshed) {
      response = await request(url, init)
    } else {
      onUnauthorized?.()
    }
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const raw = body?.message ?? response.statusText
    throw new ApiError(response.status, Array.isArray(raw) ? raw : [raw])
  }

  const text = response.status === 204 ? '' : await response.text()
  const data = text ? JSON.parse(text) : undefined

  return { data, status: response.status, headers: response.headers } as T
}
