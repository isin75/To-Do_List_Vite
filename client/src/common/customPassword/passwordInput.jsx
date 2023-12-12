import React from 'react'
import { Form, Input } from 'antd'

const PasswordInput = ({ name, placeholder, dependencies, val, onChange }) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: 'Required field' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve()
            }
            if (name === 'confirmPassword') {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Passwords must match'))
            }
            if (value.length < 6) {
              return Promise.reject(new Error('Password must be longer than 6 characters'))
            }
            return Promise.resolve()
          }
        })
      ]}
    >
      <Input.Password placeholder={placeholder} value={val} onChange={onChange} size="large" />
    </Form.Item>
  )
}

export default PasswordInput
