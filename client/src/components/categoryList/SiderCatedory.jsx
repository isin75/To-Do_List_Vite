import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Menu } from 'antd'
import { getCategories } from '../../../store/reducers/To-DoSlice'

const SiderCatedory = () => {
  const { userCategories, taskAddInSession } = useSelector((s) => s.toDoSlice)
  const { category } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items = userCategories.map((c) => ({
    label: c,
    key: c
  }))

  useEffect(() => {
    dispatch(getCategories())
    return () => {}
  }, [taskAddInSession])
  return (
    <Menu
      mode="inline"
      items={items}
      onClick={(item) => {
        navigate(item.key)
      }}
      selectedKeys={category}
      className="w-[200px] text-base font-semibold h-full"
    />
  )
}

export default SiderCatedory
