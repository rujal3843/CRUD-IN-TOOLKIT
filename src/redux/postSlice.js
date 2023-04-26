
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload)
    },
    deletePost: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updatePost: (state, action) => {
      state.items.map(item => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
        }
        return item;
      })
    }
  },
})

export const { addPost, deletePost, updatePost } = postSlice.actions

export default postSlice.reducer
