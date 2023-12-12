import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { addCount, addTask, setFalseModal } from '../../../store/reducers/To-DoSlice'
import CustomInput from '../../common/customInput/customInput'

const CustomModal = ({ category }) => {
  const { isModalOpen } = useSelector((s) => s.toDoSlice)
  const dispatch = useDispatch()
  const [form] = useForm()
  const [input, setInput] = useState('')
  const [inputCategory, setInputCategory] = useState('')

  const handleCategory = (event) => {
    setInputCategory(event.target.value)
  }
  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleClickOk = () => {
    const categories = inputCategory || category
    dispatch(addTask({ category: categories, task: input }))
    dispatch(addCount())
    dispatch(setFalseModal())
    setInput('')
    setInputCategory('')
    form.resetFields()
  }
  const handleClickCancel = () => {
    dispatch(setFalseModal())
    setInput('')
    setInputCategory('')
    form.resetFields()
  }
  return (
    <Modal
      title="Create a new Task"
      open={isModalOpen}
      okText="Add"
      okType="default"
      onOk={() => handleClickOk()}
      onCancel={() => handleClickCancel()}
    >
      <Form form={form}>
        <CustomInput
          name="Category"
          type="text"
          value={inputCategory}
          placeholder="Enter category"
          onChange={handleCategory}
          className=""
        />
        <CustomInput
          type="text"
          name="Task"
          value={input}
          placeholder="Enter task"
          onChange={handleInput}
          className="px-3 py-1 rounded-full focus:outline-none"
        />
      </Form>
    </Modal>
  )
}

export default CustomModal
