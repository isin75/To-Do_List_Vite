import { Button, Form } from 'antd'

const CustomButton = ({
  children,
  htmlType = 'button',
  onClick,
  type,
  danger,
  loading,
  shape,
  icon,
  ghost,
  className
}) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        onClick={onClick}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        ghost={ghost}
        className={className}
      >
        {children}
      </Button>
    </Form.Item>
  )
}

export default CustomButton
