import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from '../src/components/Layout/Layout'
import Home from '../src/pages/home/home'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  )
)

export default router
