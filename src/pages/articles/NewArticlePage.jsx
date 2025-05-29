import React, { useEffect } from 'react'
import NewArticle from '../../components/Articles/NewArticle.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const NewArticlePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in')
    }
  }, [isAuthenticated, navigate])

  return <NewArticle />
}

export default NewArticlePage
