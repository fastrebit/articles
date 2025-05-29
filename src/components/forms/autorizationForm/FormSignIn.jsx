import React from 'react'
import { useForm } from 'react-hook-form'
import { userLogin } from '../../../api/api.js'
import style from './Form.module.css'
import FormSubmitButton from '../../ui/FormSubmitButton/FormSubmitButton.jsx'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const FormSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const result = await dispatch(userLogin(data))
    if (userLogin.rejected.match(result)) {
      if (result?.payload?.status === 422) {
        setError('email', {
          type: 'server',
          message: 'email or password is invalid',
        })
        setError('password', {
          type: 'server',
          message: 'email or password is invalid',
        })
      }
    }
    if (userLogin.fulfilled.match(result)) {
      navigate('/articles')
    }
  }

  return (
    <div className={style.formWrapper}>
      <h5 className={style.formTitle}>Sign In</h5>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label htmlFor="email" className={style.formLabel}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`${style.formInput} ${errors.email ? style.formInputError : ''}`}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email должен быть корректным почтовым адресом',
              },
            })}
          />
          {errors.email && <span className={style.formError}>{errors.email.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="password" className={style.formLabel}>
            Password
          </label>
          <input
            placeholder="Password"
            id="password"
            type="password"
            autoComplete="password"
            className={`${style.formInput} ${errors.password ? style.formInputError : ''}`}
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: { value: 6, message: 'Password должен быть от 6 до 40 символов' },
              maxLength: { value: 40, message: 'Password должен быть от 6 до 40 символов' },
            })}
          />
          {errors.password && <span className={style.formError}>{errors.password.message}</span>}
        </div>
        <FormSubmitButton type="submit">Login</FormSubmitButton>
      </form>
      <div className={style.link}>
        Don’t have an account?
        {
          <Link style={{ color: 'rgb(24, 144, 255)' }} to="/sign-up" className="signup">
            Sign Up.
          </Link>
        }
      </div>
    </div>
  )
}

export default FormSignIn
