import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}

function Main({ children }: LayoutProps) {
  return <main>{children}</main>
}

export default Main
