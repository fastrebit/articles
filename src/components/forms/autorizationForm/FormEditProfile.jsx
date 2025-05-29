import React from 'react'
import { useForm } from 'react-hook-form'
import { editUser } from '../../../api/api.js'
import style from './Form.module.css'
import FormSubmitButton from '../../ui/FormSubmitButton/FormSubmitButton.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const FormEditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const { username, token, email } = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const response = await dispatch(editUser({ userData: data, token }))

    if (editUser.rejected.match(response)) {
      if (response.payload.response.data.errors['email']) {
        setError('email', {
          type: 'server',
          message: response?.payload?.response?.data?.errors['email'],
        })
        setError('username', {
          type: 'server',
          message: response?.payload?.response?.data?.errors['username'],
        })
      }
    }
    if (editUser.fulfilled.match(response)) {
      navigate('/articles')
    }
  }

  return (
    <div className={style.formWrapper}>
      <h5 className={style.formTitle}>Edit Profile</h5>
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
            defaultValue={username}
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
            defaultValue={email}
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
            New password
          </label>
          <input
            placeholder="New password"
            id="password"
            type="password"
            autoComplete="password"
            className={`${style.formInput} ${errors.password ? style.formInputError : ''}`}
            {...register('password', {
              minLength: { value: 6, message: 'Password должен быть от 6 до 40 символов' },
              maxLength: { value: 40, message: 'Password должен быть от 6 до 40 символов' },
            })}
          />
          {errors.password && <span className={style.formError}>{errors.password.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="image" className={style.formLabel}>
            Avatar image (url)
          </label>
          <input
            id="image"
            type="text"
            className={`${style.formInput} ${errors.image ? style.formInputError : ''}`}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                message: 'должен быть корректным url',
              },
            })}
          />
          {errors.image && <span className={style.formError}>{errors.image.message}</span>}
        </div>

        <FormSubmitButton type="submit">Save</FormSubmitButton>
      </form>
    </div>
  )
}

export default FormEditProfile
