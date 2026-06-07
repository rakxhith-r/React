import { ReactNode } from "react"

export type LayoutProps = {
  children: ReactNode
}

function Main({ children }: LayoutProps) {
  return <main className="main">{children}</main>
}

export default Main
