import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layouts from '../src/components/Layout/Layout'
import Home from '../src/pages/home/home'
import PrivateRouter from './privateRouter'
import Login from '../src/pages/auth/login/login'
import AuthProvider from './authProvider'
import Register from '../src/pages/auth/registration/registration'
import Activated from '../src/pages/auth/Activated/Activated'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path="/" element={<Layouts />}>
        <Route element={<PrivateRouter />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<Home />} />
          <Route path=":category/:timespan" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Register />} />
        <Route path="activate" element={<Activated />} />
      </Route>
    </Route>
  )
)

export default router
