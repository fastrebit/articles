import React from 'react'
import ArticleForm from '../forms/articleForm/ArticleForm.jsx'
import { useSelector } from 'react-redux'
import { editArticle } from '../../api/api.js'
import { useNavigate } from 'react-router-dom'

const EditArticle = () => {
  const { status } = useSelector((state) => state.article)
  const { slug } = useSelector((state) => state.article.article)
  const { token } = useSelector((state) => state.user.user)
  const [fetchError, setFetchError] = React.useState(null)

  const navigate = useNavigate()

  if (status === 'loading') {
    return <div>Загрузка</div>
  }

  const onSubmit = async (data) => {
    setFetchError(null)
    try {
      await editArticle({ articleData: data, token, slug })
      navigate('/articles')
    } catch (error) {
      setFetchError(`${error}`)
    }
  }

  return (
    <ArticleForm
      title="Edit Article"
      isEdit
      onSubmit={onSubmit}
      fetchError={fetchError}
      setFetchError={setFetchError}
    />
  )
}

export default EditArticle
