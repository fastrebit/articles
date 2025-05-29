import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { fetchArticle } from '../../api/api.js'
import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../../components/Articles/ArticleItem.jsx'
import ArticleBody from '../../components/Articles/ArticleBody.jsx'
import style from './ArticlePage.module.css'

const ArticlePage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { token } = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(fetchArticle({ slug, token }))
  }, [dispatch, slug, token])

  const { article, status, error } = useSelector((state) => state.article)
  const { user } = useSelector((state) => state.user)

  if (status === 'loading' || status === 'idle') {
    return <div>Загрузка</div>
  }
  if (status === 'error') {
    return <div>Произошла ошибка: {error}</div>
  }

  const showEditingPanel = Boolean(article.author['username'] === user.username)

  return (
    <div className={style.container}>
      <ArticleItem article={article} showEditingPanel={showEditingPanel} />
      <ArticleBody body={article.body} />
    </div>
  )
}

export default ArticlePage
