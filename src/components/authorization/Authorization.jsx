import React from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../slices/userSlice.jsx'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Autorization.module.css'

const Authorization = () => {
  const { isAuthenticated } = useAuth()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const handleSignOut = () => {
    dispatch(removeUser())
    navigate('/articles')
  }
  return isAuthenticated ? (
    <div className={styles.authorization}>
      <Link className={styles.newArticle} to="/new-article">
        Create article
      </Link>
      <Link to={'profile'}>
        <div className={styles.user}>
          <span>{user.username}</span>
          <img className={styles.avatar} src={user.image ? user.image : '/avatar.svg'} alt="avatar" />
        </div>
      </Link>
      <button className={styles.logUotButton} onClick={handleSignOut}>
        Log Out
      </button>
    </div>
  ) : (
    <div className={styles.authorization}>
      <Link to="/sign-in" className={styles}>
        Sign In
      </Link>
      <Link to="/sign-up" className={styles.signUp}>
        Sign up
      </Link>
    </div>
  )
}

export default Authorization
