import { createSlice } from '@reduxjs/toolkit'

import { fetchAllArticles } from '../api/api.js'

const articlesSlice = createSlice({
  name: 'articles',

  initialState: {
    articles: [],
    articlesCount: 0,
    status: 'idle',
    offset: 0,
    page: 1,
    error: null,
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.articles = action.payload['articles']
        state.status = 'success'
        state.articlesCount = action.payload['articlesCount']
        state.error = null
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
  },
})

export const { setOffset, setPage } = articlesSlice.actions
export default articlesSlice.reducer
