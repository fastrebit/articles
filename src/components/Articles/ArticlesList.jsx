import React from 'react'
import { useSelector } from 'react-redux'
import ArticleItem from './ArticleItem.jsx'
import style from './ArticleList.module.css'
import Pagination from '../ui/Pagination/Pagination.jsx'

const ArticlesList = () => {
  const { articles } = useSelector((state) => state.articles)

  return (
    <>
      <ul className={style.articleList}>
        {articles.map((article) => (
          <li className={style.articlesListItem} key={article['slug']}>
            <ArticleItem article={article} />
          </li>
        ))}
      </ul>
      <Pagination />
    </>
  )
}

export default ArticlesList
