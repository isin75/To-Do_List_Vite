import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { Card } from 'antd'

import CustomButton from '../../common/customButton/customButton'
import StatusBlock from '../statusBlock/statusBlock'
import CustomInput from '../../common/customInput/customInput'
import { deleteTask, updateTask } from '../../../store/reducers/To-DoSlice'

const TaskCard = ({ task }) => {
  const { tasks } = useSelector((s) => s.toDoSlice)
  const dispatch = useDispatch()
  const { category } = useParams()
  const [editTasks, setEditTasks] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const handleEditInput = (event, id) => {
    const updatedEditTasks = { ...editTasks }
    updatedEditTasks[id] = event.target.value
    setEditTasks(updatedEditTasks)
  }

  const handleClickEdit = (id) => {
    setIsEdit(!isEdit)
    const taskToEdit = tasks.find((t) => t._id === id)
    if (taskToEdit) {
      const updatedEditTasks = { ...editTasks }
      updatedEditTasks[id] = taskToEdit.title
      setEditTasks(updatedEditTasks)
    }
  }

  const handleClickUpdateTask = ({ categories, id, payload }) => {
    setIsEdit(!isEdit)
    dispatch(updateTask({ categories, id, payload }))
    setEditTasks({})
  }

  const handleClickDelete = async (id) => {
    dispatch(deleteTask({ category, id }))
  }

  return (
    <Card title={task.title} className="w-[16rem] h-[9rem] flex flex-col text-center" size="small">
      {!editTasks[task._id] && !isEdit ? (
        <div className="flex justify-between">
          <StatusBlock task={task} setEditTasks={setEditTasks} className="w-1/2" />
          <div className="flex flex-col justify-center items-center">
            <CustomButton
              className="hover:border-blue-500 w-auto flex items-center"
              type="button"
              onClick={() => handleClickEdit(task._id)}
            >
              <EditOutlined />
            </CustomButton>
            <CustomButton
              className="hover:border-blue-500 flex items-center w-auto"
              type="button"
              onClick={() => handleClickDelete(task._id)}
            >
              <DeleteOutlined />
            </CustomButton>
          </div>
        </div>
      ) : (
        <div className="inline-flex">
          <CustomInput
            type="text"
            value={editTasks[task._id]}
            onChange={(e) => handleEditInput(e, task._id)}
          />
          <CustomButton
            className="hover:border-blue-500 flex items-center ml-1 w-auto"
            type="button"
            onClick={() =>
              handleClickUpdateTask({
                categories: category,
                id: task._id,
                payload: { title: editTasks[task._id] }
              })
            }
          >
            <SaveOutlined />
          </CustomButton>
        </div>
      )}
    </Card>
  )
}

export default TaskCard
