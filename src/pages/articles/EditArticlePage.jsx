import React, { useEffect } from 'react'

import EditArticle from '../../components/Articles/EditArticle.jsx'
import { fetchArticle } from '../../api/api.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
const EditArticlePage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticle({ slug }))
  }, [dispatch, slug])

  const navigate = useNavigate()
  const { user } = useAuth()
  const { author } = useSelector((state) => state.article.article)

  useEffect(() => {
    if (!user || !author) return
    if (user.username !== author.username) {
      navigate('/articles')
    }
  }, [user, author, navigate])

  return (
    <div>
      <EditArticle />
    </div>
  )
}

export default EditArticlePage
