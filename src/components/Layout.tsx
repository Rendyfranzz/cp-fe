import React from 'react'
import { Toaster } from 'react-hot-toast'

interface Page {
    children : React.ReactNode
}

export const Layout = ({children}:Page) => {
  return (
    <>
    <Toaster/>
        {children}
    </>
  )
}
