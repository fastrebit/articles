import React from 'react'
import style from './TransparentButton.module.css'
const TransparentButton = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${style.transparentButton} ${className}`} type="button">
      {children}
    </button>
  )
}

export default TransparentButton
