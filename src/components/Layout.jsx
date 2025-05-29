import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Authorization from './authorization/Authorization.jsx'
const Layout = () => {
  return (
    <div className="content">
      <header className="header">
        <Link to="/articles">Realworld Blog</Link>
        <Authorization />
      </header>
      <Outlet />
    </div>
  )
}

export default Layout
