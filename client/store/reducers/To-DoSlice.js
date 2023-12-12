import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk('To-Do/getCategories', async () => {
  const { data } = await axios('/api/v1/categories')
  return data
})

export const getTasks = createAsyncThunk('To-Do/getTasks', async ({ category, timespan }) => {
  const urlGetTasks = timespan
    ? `/api/v1/tasks/${category}/${timespan}`
    : `/api/v1/tasks/${category}`
  const { data } = await axios(urlGetTasks)
  return data
})

export const addTask = createAsyncThunk('To-Do/addTask', async ({ category, task }) => {
  const addTaskUrl = `/api/v1/tasks/${category}`
  const { data } = axios.post(
    addTaskUrl,
    { title: task },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return data.task
})

export const updateTask = createAsyncThunk(
  'To-Do/changeStatus',
  async ({ categories, id, payload }) => {
    console.log(payload)
    const urlUpdateTask = `/api/v1/tasks/${categories}/${id}`
    const { data } = await axios.patch(
      urlUpdateTask,
      {
        payload
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

export const deleteTask = createAsyncThunk('To-Do/deleteTask', async ({ category, id }) => {
  const urlDeleteTask = `/api/v1/tasks/${category}/${id}`
  await axios.delete(urlDeleteTask)
})

const initialState = {
  status: null,
  error: null,
  userCategories: [],
  tasks: [],
  taskAddInSession: 0,
  isTheme: false,
  isModalOpen: false
}

const toDoSlice = createSlice({
  name: 'To-Do',
  initialState,
  reducers: {
    addCount: (state) => {
      state.taskAddInSession += 1
    },
    deleteCount: (state) => {
      state.taskAddInSession -= 1
    },
    setTheme: (state) => {
      state.isTheme = !state.isTheme
    },
    setTrueModal: (state) => {
      state.isModalOpen = true
    },
    setFalseModal: (state) => {
      state.isModalOpen = false
    }
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getCategories.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.userCategories = actions.payload
    },
    [getTasks.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getTasks.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.tasks = actions.payload
    },
    [updateTask.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [updateTask.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.tasks = actions.payload
    },
    [addTask.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [addTask.fulfilled]: (state, actions) => {
      state.status = 'resolve'
      state.tasks = actions.payload
    },
    [deleteTask.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [deleteTask.fulfilled]: (state) => {
      state.status = 'resolve'
      state.taskAddInSession -= 1
    }
  }
})

export default toDoSlice.reducer

export const { addCount, deleteCount, setTheme, setFalseModal, setTrueModal } = toDoSlice.actions
