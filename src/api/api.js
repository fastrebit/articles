import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://blog-platform.kata.academy/api'

export const fetchAllArticles = createAsyncThunk('fetchAllArticles', async ({ offset = 0, token }, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/articles?limit=5&offset=${offset}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const fetchArticle = createAsyncThunk('fetchArticle', async ({ slug, token }, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const registerNewUser = createAsyncThunk('registerNewUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/users`, {
      user: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    })
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const userLogin = createAsyncThunk('userLogin', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/users/login`, {
      user: {
        email: userData.email,
        password: userData.password,
      },
    })
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const editUser = createAsyncThunk('editUser', async ({ userData, token }, thunkAPI) => {
  const user = {
    username: userData.username,
    email: userData.email,
  }

  if (userData.password) {
    user.password = userData.password
  }

  if (userData.image) {
    user.image = userData.image
  }

  try {
    const response = await axios.put(
      `${url}/user`,
      { user },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    )
    return response.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const createArticle = async ({ articleData, token }) => {
  const article = {
    title: articleData.title,
    description: articleData.description,
    body: articleData.body,
    tagList: articleData.tagList.map((tag) => tag.tag),
  }

  const response = await axios.post(
    `${url}/articles`,
    { article },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }
  )
  return response.data
}

export const editArticle = async ({ articleData, token, slug }) => {
  const article = {
    title: articleData.title,
    description: articleData.description,
    body: articleData.body,
    tagList: articleData.tagList.map((tag) => tag.tag),
  }

  const response = await axios.put(
    `${url}/articles/${slug}`,
    { article },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }
  )
  return response.data
}

export const deleteArticle = async ({ slug, token }) => {
  const response = await axios.delete(`${url}/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return response.data
}

export const favoriteArticle = async (slug, token) => {
  const response = await axios.post(
    `${url}/articles/${slug}/favorite`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }
  )
  return response.data
}

export const unFavoriteArticle = async (slug, token) => {
  const response = await axios.delete(`${url}/articles/${slug}/favorite`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return response.data
}
