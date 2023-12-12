import React from 'react'
import { Form, Input } from 'antd'

const CustomInput = ({ name, placeholder, value, onChange, type = 'text' }) => {
  return (
    <Form.Item name={name} rules={[{ required: true, message: 'Required field' }]} shouldUpdate>
      <Input placeholder={placeholder} type={type} value={value} onChange={onChange} size="large" />
    </Form.Item>
  )
}

export default CustomInput
