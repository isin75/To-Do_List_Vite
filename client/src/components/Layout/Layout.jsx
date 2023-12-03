import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>{false}</header>
      <main className="flex-grow flex justify-center items-center h-full">
        <Outlet />
      </main>
      <footer className="p-3">
        <a href="https://github.com/isin75/vite-react-redux-template">by ISIN</a>
      </footer>
    </div>
  )
}

export default Layout
