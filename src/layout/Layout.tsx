import React, { ReactNode } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      <main className="container">{children}</main>
    </>
  )
}

export default Layout
