import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const auth = useSelector((state) => state.authSlice)

  const location = useLocation()
  return !!auth.token && !!auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute
