import React from 'react'
import Markdown from 'markdown-to-jsx'
import style from './ArticleBody.module.css'
const ArticleBody = ({ body }) => {
  return (
    <div className={style.container}>
      <Markdown>{body}</Markdown>
    </div>
  )
}

export default ArticleBody
