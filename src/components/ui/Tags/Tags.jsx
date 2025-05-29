import React from 'react'
import { nanoid } from 'nanoid'
import styles from './Tags.module.css'

const Tags = ({ tags }) => {
  return (
    <>
      {tags.map(
        (tag, index) =>
          !!tag && (
            <span className={`${styles.tag} ${index === 0 ? styles.firstTag : ''}`} key={nanoid()}>
              {tag}
            </span>
          )
      )}
    </>
  )
}

export default Tags
