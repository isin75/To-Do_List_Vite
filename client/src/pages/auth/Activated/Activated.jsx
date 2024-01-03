/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Row, Space, Typography } from 'antd'
import { setCode, activatedUser } from '../../../../store/reducers/AuthSlice'
import CustomInput from '../../../common/customInput/customInput'
import CustomButton from '../../../common/customButton/customButton'

const Activated = () => {
  const navigate = useNavigate()
  const { code, activatedStatus } = useSelector((s) => s.authSlice)
  const dispatch = useDispatch()

  const codeHandle = (e) => {
    dispatch(setCode(e.target.value))
  }

  const handleClick = () => {
    dispatch(activatedUser({ code }))
  }

  useEffect(() => {
    if (activatedStatus === 'activated') {
      navigate('/login')
    }
  }, [activatedStatus])

  return (
    <Row align="middle" justify="center">
      <Card title="Login" style={{ width: '30rem' }}>
        <Form>
          <CustomInput
            type="code"
            name="code"
            placeholder="Enter activation code"
            value={code}
            onChange={codeHandle}
          />
          <CustomButton
            type="primary"
            htmlType="submit"
            onClick={handleClick}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Activate
          </CustomButton>
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            Already activated? <Link to="/login">Login</Link>
          </Typography.Text>
        </Space>
      </Card>
    </Row>
  )
}

export default Activated
