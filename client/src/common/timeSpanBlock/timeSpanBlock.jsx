import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import {
  CalendarOutlined,
  ContainerOutlined,
  FileDoneOutlined,
  FilterOutlined
} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

const TimeSpanBlock = () => {
  const { category } = useParams()
  const navigate = useNavigate()

  const items = [
    {
      label: 'Day',
      key: '/day',
      icon: <CalendarOutlined />
    },
    {
      label: 'Week',
      key: '/week',
      icon: <CalendarOutlined />
    },
    {
      label: 'Month',
      key: '/month',
      icon: <CalendarOutlined />
    },
    {
      label: 'Done',
      key: '/done',
      icon: <FileDoneOutlined />
    },
    {
      label: 'All',
      key: '/',
      icon: <ContainerOutlined />
    }
  ]

  const handleClick = (e) => {
    navigate(`/${category}${e.key}`)
  }

  const menu = (
    <Menu onClick={handleClick}>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button className="flex items-center">
          <FilterOutlined style={{ color: 'white' }} />
        </Button>
      </Dropdown>
    </div>
  )
}

export default TimeSpanBlock
