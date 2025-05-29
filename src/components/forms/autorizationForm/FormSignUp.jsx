import React from 'react'
import { useForm } from 'react-hook-form'
import { registerNewUser } from '../../../api/api.js'
import style from './Form.module.css'
import FormSubmitButton from '../../ui/FormSubmitButton/FormSubmitButton.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const FormSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const watchPassword = watch('password')
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const result = await dispatch(registerNewUser(data))

    if (registerNewUser.rejected.match(result)) {
      if (result?.payload?.response?.data?.errors['email']) {
        setError('email', {
          type: 'server',
          message: result.payload.response.data.errors['email'],
        })
      }
      if (result?.payload?.response?.data?.errors['username']) {
        setError('username', {
          type: 'server',
          message: result.payload.response.data.errors['username'],
        })
      }
    }
    if (registerNewUser.fulfilled.match(result)) {
      navigate('/articles')
    }
  }

  return (
    <div className={style.formWrapper}>
      <h5 className={style.formTitle}>Create new account</h5>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label htmlFor="username" className={style.formLabel}>
            Username
          </label>
          <input
            autoComplete="username"
            className={`${style.formInput} ${errors.username ? style.formInputError : ''}`}
            id="username"
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
              minLength: { value: 3, message: 'Username должен быть от 3 до 20 символов' },
              maxLength: { value: 20, message: 'Username должен быть от 3 до 20 символов' },
            })}
          />
          {errors.username && <span className={style.formError}>{errors.username.message}</span>}
        </div>

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

        <div className={style.formGroup}>
          <label htmlFor="repeatPassword" className={style.formLabel}>
            Repeat Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            placeholder="Password"
            autoComplete="password"
            className={`${style.formInput} ${errors.repeatPassword ? style.formInputError : ''}`}
            {...register('repeatPassword', {
              required: 'Поле обязательно для заполнения',
              minLength: { value: 6, message: 'Пароль слишком короткий' },
              maxLength: { value: 40, message: 'Пароль слишком длинный' },
              validate: (value) => value === watchPassword || 'Пароли не совпадают',
            })}
          />
          {errors.repeatPassword && <span className={style.formError}>{errors.repeatPassword.message}</span>}
        </div>
        <div className={style.formConfirm}>
          <input
            id="confirm"
            type="checkbox"
            className={style.formCheckbox}
            {...register('confirm', {
              required: 'Вы должны согласиться с условиями',
            })}
          />
          <label htmlFor="confirm" className={style.formLabel}>
            I agree to the processing of my personal information
          </label>
          {errors.confirm && <span className={style.formError}>{errors.confirm.message}</span>}
        </div>
        <FormSubmitButton type="submit">Create</FormSubmitButton>
      </form>
      <div className={style.link}>
        Already have an account?
        {
          <Link style={{ color: 'rgb(24, 144, 255)' }} to="/sign-in" className="signIn">
            Sign In.
          </Link>
        }
      </div>
    </div>
  )
}

export default FormSignUp
