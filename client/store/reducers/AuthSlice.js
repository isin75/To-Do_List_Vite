import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '../../config'

const cookies = new Cookies()
const baseUrl = config.api

export const trySigIn = createAsyncThunk('auth/trySigIn', async () => {
  const { data } = await axios(`${baseUrl}auth`, { withCredentials: true })
  return data
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  const { data } = await axios.post(
    `${baseUrl}login`,
    {
      email,
      password
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return data
})

export const activatedUser = createAsyncThunk('auth/activatedUser', async (link) => {
  await axios(`${baseUrl}activate/${link}`)
})

export const registerUser = createAsyncThunk(
  'auth/RegisterUser',
  async ({ name, email, password }) => {
    const { data } = await axios.post(
      `${baseUrl}registration`,
      {
        name,
        email,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return data
  }
)

const initialState = {
  email: '',
  password: '',
  name: '',
  token: cookies.get('token'),
  user: {},
  status: null,
  error: null,
  from: null
}

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setEmail: (state, { payload: email }) => {
      state.email = email
    },
    setPassword: (state, { payload: password }) => {
      state.password = password
    },
    setName: (state, { payload: name }) => {
      state.name = name
    },
    setFrom: (state, { payload: from }) => {
      state.from = from
    },
    setUser: (state) => {
      state.user = null
    },
    setToken: (state) => {
      state.token = null
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [loginUser.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.user = actions.payload.user
      state.token = actions.payload.token
      state.password = ''
    },
    [trySigIn.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [trySigIn.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.user = actions.payload.user
      state.token = actions.payload.token
    },
    [registerUser.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [registerUser.fulfilled]: (state) => {
      state.status = 'resolve'
    },
    [activatedUser.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [activatedUser.fulfilled]: (state) => {
      state.status = 'resolve'
    }
  }
})

export default authSlice.reducer

export const { setEmail, setPassword, login, setName, setFrom, setUser, setToken } =
  authSlice.actions
