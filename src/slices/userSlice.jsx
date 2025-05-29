import { createSlice } from '@reduxjs/toolkit'
import { editUser, registerNewUser, userLogin } from '../api/api.js'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || {
      email: '',
      token: '',
      username: '',
    },
    error: null,
    status: 'idle',
  },
  reducers: {
    removeUser: (state) => {
      state.user = {
        email: '',
        token: '',
        username: '',
        image: '',
      }
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload.user
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        state.status = 'succeeded'
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'error'
      })

      .addCase(userLogin.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload.user
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        state.status = 'succeeded'
      })

      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'error'
      })

      .addCase(editUser.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.error = null
        state.user = action.payload.user
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        state.status = 'succeeded'
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'error'
      })
  },
})

export const { removeUser } = userSlice.actions

export default userSlice.reducer
