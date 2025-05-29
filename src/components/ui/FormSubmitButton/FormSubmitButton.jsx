import React from 'react'
import style from './FormSubmitButton.module.css'

const FormSubmitButton = ({ children }) => {
  return (
    <button className={style.MyButton} onClick={() => {}} type="submit">
      {children}
    </button>
  )
}

export default FormSubmitButton
