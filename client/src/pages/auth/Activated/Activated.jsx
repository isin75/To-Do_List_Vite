import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activatedUser } from '../../../../store/reducers/AuthSlice'

const Activated = () => {
  const { isTheme } = useSelector((s) => s.toDoSlice)
  const { email } = useSelector((s) => s.authSlice)
  const dispatch = useDispatch()
  const { link } = useParams()
  const textColor = isTheme ? 'text-white' : 'text-black'
  const className = `text-lg font-medium px-2 m-6 ${textColor}`

  useEffect(() => {
    dispatch(activatedUser(link))
  }, [])

  return (
    <div>
      <h1 className={className}>Your account: {email} is activated!</h1>
    </div>
  )
}

export default Activated
