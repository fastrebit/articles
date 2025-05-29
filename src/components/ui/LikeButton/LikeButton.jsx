import React from 'react'
import style from './LikeButton.module.css'
import { favoriteArticle, unFavoriteArticle } from '../../../api/api.js'

const LikeButton = ({ likeCount = 0, slug, token, isFavorited }) => {
  const [liked, setLiked] = React.useState(isFavorited)
  const [count, setCount] = React.useState(likeCount)

  const handleClick = async () => {
    try {
      const response = liked ? await unFavoriteArticle(slug, token) : await favoriteArticle(slug, token)
      const { favorited, favoritesCount } = response.article
      setLiked(favorited)
      setCount(favoritesCount)
    } catch (error) {
      console.log('Ошибка лайка:', error)
    }
  }

  return (
    <button disabled={!token} className={style.likeButton} onClick={handleClick}>
      <img src={liked ? '/heart red.svg' : '/heart 1.svg'} alt="add like" />
      <span className={style.likeCount}>{count}</span>
    </button>
  )
}

export default LikeButton
