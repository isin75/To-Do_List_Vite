import React from 'react'
import { FloatButton } from 'antd'
import { FileAddOutlined, FireOutlined, FrownOutlined, UpOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, setTrueModal } from '../../../store/reducers/To-DoSlice'

const FloatsButton = () => {
  const { isTheme } = useSelector((s) => s.toDoSlice)
  const dispatch = useDispatch()

  const handleClickTheme = () => {
    dispatch(setTheme())
  }
  const handleClickAddTask = () => {
    dispatch(setTrueModal())
  }
  return (
    <FloatButton.Group
      trigger="hover"
      style={{
        right: 24,
        bottom: 60
      }}
      icon={<UpOutlined />}
    >
      <FloatButton
        onClick={() => handleClickTheme()}
        icon={isTheme ? <FireOutlined /> : <FrownOutlined />}
      />
      <FloatButton icon={<FileAddOutlined />} onClick={() => handleClickAddTask()} />
    </FloatButton.Group>
  )
}

export default FloatsButton
