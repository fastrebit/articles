import { createSlice } from '@reduxjs/toolkit'

import { fetchArticle } from '../api/api.js'

const articleSlice = createSlice({
  name: 'article',

  initialState: {
    article: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'success'
        state.article = action.payload['article']
        state.error = null
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
  },
})

export default articleSlice.reducer
