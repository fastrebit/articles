import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from './Pagination.module.css'
import { setOffset, setPage } from '../../../slices/articlesSlice'

const Pagination = () => {
  const dispatch = useDispatch()
  const { articlesCount, page: currentPage } = useSelector((state) => state.articles)
  const totalPages = Math.ceil(articlesCount / 5)

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      dispatch(setPage(page))
      dispatch(setOffset((page - 1) * 5))
    }
  }

  const visiblePages = () => {
    const pages = []
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages, currentPage + 4)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className={style.pagination}>
      <span onClick={() => handlePageClick(currentPage - 1)}>{'<'}</span>
      {visiblePages().map((page) => (
        <span key={page} className={page === currentPage ? style.active : ''} onClick={() => handlePageClick(page)}>
          {page}
        </span>
      ))}
      <span onClick={() => handlePageClick(currentPage + 1)}>{'>'}</span>
    </div>
  )
}

export default Pagination
