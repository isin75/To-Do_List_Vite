import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import CustomInput from '../../../common/customInput/customInput'
import PasswordInput from '../../../common/customPassword/passwordInput'
import CustomButton from '../../../common/customButton/customButton'
import { setName, setEmail, setPassword, registerUser } from '../../../../store/reducers/AuthSlice'

const Register = () => {
  const { name, email, password } = useSelector((s) => s.authSlice)
  const [isClick, setIsClick] = useState(false)
  const dispatch = useDispatch()

  const nameHandle = (e) => {
    dispatch(setName(e.target.value))
  }

  const emailHandle = (e) => {
    dispatch(setEmail(e.target.value))
  }

  const passwordHandle = (e) => {
    dispatch(setPassword(e.target.value))
  }

  const handleClick = () => {
    dispatch(registerUser({ email, password }))
    setIsClick(!isClick)
  }

  return (
    <Row align="middle" justify="center">
      {isClick ? (
        <div>
          <h1 className="text-lg font-medium px-2 m-6">
            To activate your account, follow the link sent to your email.
          </h1>
        </div>
      ) : (
        <Card title="Registration" style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="Name" onChange={nameHandle} value={name} />
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              onChange={emailHandle}
              value={email}
            />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Repeat password"
              onChange={passwordHandle}
              value={password}
            />
            <CustomButton
              type="primary"
              htmlType="submit"
              onClick={() => handleClick()}
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have an account? <Link to="/login">Login</Link>
            </Typography.Text>
            <Typography.Text>
              <Link to="/activate">Activate account</Link>
            </Typography.Text>
          </Space>
        </Card>
      )}
    </Row>
  )
}

export default Register
