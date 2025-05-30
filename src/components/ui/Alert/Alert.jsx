import React from 'react'
import TransparentButton from '../TransparentButton/TransparentButton.jsx'
import style from './Alert.module.css'
const Alert = ({ position, setShowAlert, children, onClick }) => {
  return (
    <div className={`${style.alert} ${position}`}>
      <div className={style.container}>
        <div className={style.text}>
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 4C4.13438 4 1 7.13438 1 11C1 14.8656 4.13438 18 8 18C11.8656 18 15 14.8656 15 11C15 7.13438 11.8656 4 8 4ZM7.5 7.625C7.5 7.55625 7.55625 7.5 7.625 7.5H8.375C8.44375 7.5 8.5 7.55625 8.5 7.625V11.875C8.5 11.9437 8.44375 12 8.375 12H7.625C7.55625 12 7.5 11.9437 7.5 11.875V7.625ZM8 14.5C7.80374 14.496 7.61687 14.4152 7.47948 14.275C7.3421 14.1348 7.26515 13.9463 7.26515 13.75C7.26515 13.5537 7.3421 13.3652 7.47948 13.225C7.61687 13.0848 7.80374 13.004 8 13C8.19626 13.004 8.38313 13.0848 8.52052 13.225C8.6579 13.3652 8.73485 13.5537 8.73485 13.75C8.73485 13.9463 8.6579 14.1348 8.52052 14.275C8.38313 14.4152 8.19626 14.496 8 14.5Z"
              fill="#FAAD14"
            />
          </svg>
          <span>{children}</span>
        </div>
        <div className={style.buttonBlock}>
          <TransparentButton className={style.noButton} onClick={() => setShowAlert(false)}>
            No
          </TransparentButton>
          <TransparentButton className={style.yesButton} onClick={onClick}>
            Yes
          </TransparentButton>
        </div>
      </div>
    </div>
  )
}

export default Alert
