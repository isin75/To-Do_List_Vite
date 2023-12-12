import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { trySigIn } from '../store/reducers/AuthSlice'

const AuthProvider = () => {
  const auth = useSelector((state) => state.authSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth.token) {
      dispatch(trySigIn())
    }
  }, [])

  return <Outlet />
}

export default AuthProvider
