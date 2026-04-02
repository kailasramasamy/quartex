import {
  createContext,
  useContext,
  useState,
  useEffect,
  createElement,
  type ReactNode,
} from "react"
import { api } from "./api"

interface Admin {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  admin: Admin | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

interface LoginResponse {
  token: string
  admin: Admin
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("quartex_token")
    if (!token) {
      setIsLoading(false)
      return
    }
    api
      .get<Admin>("/auth/me")
      .then(setAdmin)
      .catch(() => localStorage.removeItem("quartex_token"))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, password: string): Promise<void> {
    const { token, admin: data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    })
    localStorage.setItem("quartex_token", token)
    setAdmin(data)
  }

  function logout(): void {
    localStorage.removeItem("quartex_token")
    setAdmin(null)
  }

  return createElement(
    AuthContext.Provider,
    { value: { admin, isLoading, login, logout } },
    children,
  )
}

function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export { AuthProvider, useAuth }
export type { Admin, AuthContextType }
