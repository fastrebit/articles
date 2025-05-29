import React, { useEffect } from 'react'
import ArticlesList from '../../components/Articles/ArticlesList.jsx'
import { fetchAllArticles } from '../../api/api.js'
import { useDispatch, useSelector } from 'react-redux'

const ArticlesPage = () => {
  const dispatch = useDispatch()
  const { offset, status, error } = useSelector((state) => state.articles)
  const { token } = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(fetchAllArticles({ offset, token }))
  }, [dispatch, offset, token])

  if (status === 'loading' || status === 'idle') {
    return <div>Загрузка</div>
  }
  if (status === 'error') {
    return <div>Произошла ошибка:{error}</div>
  }

  return (
    <main className="content">
      <ArticlesList />
    </main>
  )
}

export default ArticlesPage
