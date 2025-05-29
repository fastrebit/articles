import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from '../slices/articlesSlice.jsx'
import articleSlice from '../slices/articleSlice.jsx'
import userSlice from '../slices/userSlice.jsx'
export default configureStore({
  reducer: {
    articles: articlesSlice,
    article: articleSlice,
    user: userSlice,
  },
})
