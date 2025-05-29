import React, { useEffect } from 'react'
import FormSignIn from '../../components/forms/autorizationForm/FormSignIn.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const SignInPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/articles')
    }
  }, [isAuthenticated, navigate])
  return <FormSignIn />
}

export default SignInPage
