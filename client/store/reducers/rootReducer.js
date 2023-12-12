import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './AuthSlice'
import toDoSlice from './To-DoSlice'

const rootReducer = combineReducers({
  authSlice,
  toDoSlice
})

export default rootReducer
