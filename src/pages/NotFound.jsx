import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      this page does not exist. Go <Link to="/">here</Link>./
    </div>
  )
}

export default NotFound
