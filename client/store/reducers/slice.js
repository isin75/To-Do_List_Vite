import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'slice',
  initialState: {
    count: 0
  },
  reducers: {
    increment(state) {
      state.count += 1
    }
  }
})

export default slice.reducer

export const { increment } = slice.actions
