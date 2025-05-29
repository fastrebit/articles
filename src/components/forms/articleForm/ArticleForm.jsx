import React from 'react'
import style from './Article.module.css'
import styleForm from '../autorizationForm/Form.module.css'
import { useFieldArray, useForm } from 'react-hook-form'
import FormSubmitButton from '../../ui/FormSubmitButton/FormSubmitButton.jsx'
import TransparentButton from '../../ui/TransparentButton/TransparentButton.jsx'
import { useSelector } from 'react-redux'

const ArticleForm = ({ title, onSubmit, fetchError, isEdit }) => {
  const { article } = useSelector((state) => state.article)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tagList:
        isEdit && article.tagList
          ? article.tagList.map((tag) => {
              return {
                tag: tag,
              }
            })
          : [{ tag: '' }],
      title: isEdit ? article.title : '',
      description: isEdit ? article.description : '',
      body: isEdit ? article.body : '',
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  return (
    <div className={style.formWrapper}>
      <h5 className={styleForm.formTitle}>{title}</h5>
      {fetchError && <span className={styleForm.formError}>{fetchError}</span>}
      <form className={styleForm.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styleForm.formGroup}>
          <label htmlFor="title" className={styleForm.formLabel}>
            Title
          </label>
          <input
            id={'title'}
            placeholder={'title'}
            className={styleForm.formInput}
            {...register('title', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors.title && <span className={styleForm.formError}>{errors.title.message}</span>}
        </div>
        <div className={styleForm.formGroup}>
          <label htmlFor="description" className={styleForm.formLabel}>
            Short description
          </label>
          <input
            id={'description'}
            placeholder={'description'}
            className={styleForm.formInput}
            {...register('description', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors.description && <span className={styleForm.formError}>{errors.description.message}</span>}
        </div>
        <div className={styleForm.formGroup}>
          <label htmlFor="text" className={styleForm.formLabel}>
            Text
          </label>
          <textarea
            id={'text'}
            placeholder={'Text'}
            className={`${style.formTextarea} ${styleForm.formInput}`}
            {...register('body', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors.body && <span className={styleForm.formError}>{errors.body.message}</span>}
        </div>
        <div className={style.tags}>
          <div className={style.tagList}>
            <label className={styleForm.formLabel}>Tags</label>
            {fields.map((tag, index) => (
              <div className={style.inputTagForm} key={tag.id}>
                <input {...register(`tagList.${index}.tag`)} placeholder="Tag" className={styleForm.formInput} />
                <TransparentButton className={style.removeTagButton} type="button" onClick={() => remove(index)}>
                  Delete
                </TransparentButton>
              </div>
            ))}
          </div>
          <TransparentButton className={style.addTagButton} type="button" onClick={() => append({ tag: '' })}>
            Add tag
          </TransparentButton>
        </div>
        <FormSubmitButton>Send</FormSubmitButton>
      </form>
    </div>
  )
}

export default ArticleForm
