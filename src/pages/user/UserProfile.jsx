import React, { useEffect } from 'react'
import FormEditProfile from '../../components/forms/autorizationForm/FormEditProfile.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const UserProfile = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in')
    }
  }, [isAuthenticated, navigate])
  return <FormEditProfile />
}

export default UserProfile
