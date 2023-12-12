import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import { LogoutOutlined } from '@ant-design/icons'

import TimeSpanBlock from '../../common/timeSpanBlock/timeSpanBlock'
import CustomButton from '../../common/customButton/customButton'
import { setUser, setEmail, setName, setToken } from '../../../store/reducers/AuthSlice'

const Head = () => {
  const { category } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()
  const handleClickLogout = async () => {
    cookies.remove('token')
    dispatch(setToken(''))
    dispatch(setEmail(null))
    dispatch(setName(null))
    dispatch(setUser(null))
    navigate('/login')
  }
  return (
    <div className="w-full h-[64px] flex items-center justify-center text-white">
      {category ? (
        <>
          <div className="w-1/3 flex justify-start">
            <h1 className="font-extrabold text-xl">
              <Link to="/">To-Do App</Link>
            </h1>
          </div>
          <div className="w-1/3 text-center inline-flex justify-center items-center">
            <h1 className="font-extrabold text-xl mr-4">{category}</h1>
            <TimeSpanBlock />
          </div>
          <div className="w-1/3 flex justify-end items-center mt-6">
            <CustomButton
              className="ml-auto flex justify-center items-center text-white"
              onClick={() => handleClickLogout()}
            >
              <LogoutOutlined style={{ color: 'white' }} />
              Logout
            </CustomButton>
          </div>
        </>
      ) : (
        <div className="w-full text-center inline-flex justify-center items-center">
          <h1 className="font-extrabold text-xl">
            <Link to="/">To-Do App</Link>
          </h1>
        </div>
      )}
    </div>
  )
}

export default Head
