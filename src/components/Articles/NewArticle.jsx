import React from 'react'
import ArticleForm from '../forms/articleForm/ArticleForm.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../../api/api.js'

const NewArticle = () => {
  const { token } = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const [fetchError, setFetchError] = React.useState(null)

  const onSubmit = async (data) => {
    setFetchError(null)
    try {
      await createArticle({ articleData: data, token: token })
      navigate('/articles')
    } catch (error) {
      setFetchError(`${error}`)
    }
  }

  return (
    <div>
      <ArticleForm title={'New Article'} onSubmit={onSubmit} fetchError={fetchError} setFetchError={setFetchError} />
    </div>
  )
}

export default NewArticle
