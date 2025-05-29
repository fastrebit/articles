import React from 'react'
import style from './ArticleItem.module.css'
import LikeButton from '../ui/LikeButton/LikeButton.jsx'
import Tags from '../ui/Tags/Tags.jsx'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import TransparentButton from '../ui/TransparentButton/TransparentButton.jsx'
import Alert from '../ui/Alert/Alert.jsx'
import { deleteArticle } from '../../api/api.js'
import { useSelector } from 'react-redux'

const ArticleItem = ({ article, showEditingPanel }) => {
  const [showAlert, setShowAlert] = React.useState(false)
  const { token } = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await deleteArticle({ slug: article.slug, token })
      navigate('/articles')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.content}>
      <div className={style.articleItem}>
        <div className={style.articleTitle}>
          <Link to={`/article/${article['slug']}`}>
            <h5>{article.title}</h5>
          </Link>
          <LikeButton
            likeCount={article['favoritesCount']}
            token={token}
            slug={article.slug}
            isFavorited={article['favorited']}
          />
        </div>
        <div className={style.articleTags}>
          <Tags tags={article['tagList']} />
        </div>
        <div className={style.description}>
          <p>{article.description}</p>
        </div>
      </div>
      <div className={style.articleInfo}>
        <div className={style.articleAuthor}>
          <div className={style.articleAuthorInfo}>
            <h6>{article.author['username']}</h6>
            <span className={style.createdDate}>{format(new Date(article['createdAt']), 'MMMM d, yyyy')}</span>
          </div>
          <img className={style.articleAuthorImg} src={article.author['image']} alt={'Author img'} />
        </div>
        {showEditingPanel && (
          <div className={style.editingPanel}>
            <TransparentButton className={style.deleteButton} onClick={() => setShowAlert(true)}>
              Delete
            </TransparentButton>
            {showAlert && (
              <Alert onClick={handleDelete} position={style.alertPosition} setShowAlert={setShowAlert}>
                Are you sure to delete this article?
              </Alert>
            )}
            <TransparentButton onClick={() => navigate(`/articles/${article.slug}/edit`)} className={style.editButton}>
              Edit
            </TransparentButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleItem
