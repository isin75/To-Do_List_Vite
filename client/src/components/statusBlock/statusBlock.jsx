import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateTask } from '../../../store/reducers/To-DoSlice'
import CustomButton from '../../common/customButton/customButton'

const StatusBlock = ({ task, setEditTasks }) => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const handleClickUpdateTask = ({ categories, id, payload }) => {
    dispatch(updateTask({ categories, id, payload }))
    setEditTasks({})
  }

  return (
    <div className="flex flex-col">
      <div className="m-2 flex justify-start items-start">
        Status: <span className="font-medium ml-1"> {task.status}</span>
      </div>
      {task.status === 'New' && (
        <CustomButton
          onClick={() =>
            handleClickUpdateTask({
              categories: category,
              id: task._id,
              payload: { status: 'In progress' }
            })
          }
        >
          In progress
        </CustomButton>
      )}
      {task.status === 'In progress' && (
        <div className="flex">
          <CustomButton
            onClick={() =>
              handleClickUpdateTask({
                categories: category,
                id: task._id,
                payload: { status: 'Blocked' }
              })
            }
          >
            Blocked
          </CustomButton>
          <CustomButton
            onClick={() =>
              handleClickUpdateTask({
                categories: category,
                id: task._id,
                payload: { status: 'Done' }
              })
            }
          >
            Done
          </CustomButton>
        </div>
      )}
      {task.status === 'Blocked' && (
        <CustomButton
          onClick={() =>
            handleClickUpdateTask({
              categories: category,
              id: task._id,
              payload: { status: 'In progress' }
            })
          }
        >
          In progress
        </CustomButton>
      )}
    </div>
  )
}

export default StatusBlock
