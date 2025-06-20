import { ReactNode } from "react"
import { Navigate } from "react-router"
import { Path } from "@/common/routing"

type Props = {
  isAllowed: boolean
  children: ReactNode
}

export const ProtectedRoute = ({ isAllowed, children }: Props) => {
  if (!isAllowed) {
    return <Navigate to={Path.Login} />
  }
  return children
}
