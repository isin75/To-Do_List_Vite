import { createReducer } from '@reduxjs/toolkit'
import { increment } from '../actions/counterActions'

const initialState = {
  count: 0
}

export default createReducer(initialState, {
  [increment]: (state) => {
    state.count += 1
  }
})
