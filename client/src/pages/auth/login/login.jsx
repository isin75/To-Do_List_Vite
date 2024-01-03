/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Card, Form, Row, Space, Typography } from 'antd'
import { setEmail, setPassword, loginUser } from '../../../../store/reducers/AuthSlice'
import CustomInput from '../../../common/customInput/customInput'
import PasswordInput from '../../../common/customPassword/passwordInput'
import CustomButton from '../../../common/customButton/customButton'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { email, password, user, status, token } = useSelector((s) => s.authSlice)
  const fromPage = location.state?.from?.pathname || '/'
  const dispatch = useDispatch()

  const emailHandle = (e) => {
    dispatch(setEmail(e.target.value))
  }

  const passwordHandle = (e) => {
    dispatch(setPassword(e.target.value))
  }

  const handleClick = () => {
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user && token) {
      navigate(fromPage, { replace: true })
    }
  }, [status])

  return (
    <Row align="middle" justify="center">
      <Card title="Login" style={{ width: '30rem' }}>
        <Form>
          <CustomInput
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={emailHandle}
          />
          <PasswordInput
            name="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandle}
          />
          <CustomButton
            type="primary"
            htmlType="submit"
            onClick={handleClick}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Login
          </CustomButton>
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            No account? <Link to="/registration">Register</Link>
          </Typography.Text>
          <Typography.Text>
            <Link to="/activate">Activate account</Link>
          </Typography.Text>
        </Space>
      </Card>
    </Row>
  )
}

export default Login
