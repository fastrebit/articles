import React, { useEffect } from 'react'
import FormSignUp from '../../components/forms/autorizationForm/FormSignUp.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const SignUpPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/articles')
    }
  }, [isAuthenticated, navigate])

  return <FormSignUp />
}

export default SignUpPage
