import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTasks } from '../../../store/reducers/To-DoSlice'
import TaskCard from '../../components/taskCard/taskCard'
import StatusCounter from '../../components/statusCounter/StatusCounter'
import FloatsButton from '../../common/floatButton/floatButton'
import CustomModal from '../../components/modal/Modal'
import Welcome from '../../components/welcom/Welcome'
// import Modal from '../../components/modal/Modal'

const Tasks = () => {
  const { tasks, taskAddInSession, isModalOpen } = useSelector((s) => s.toDoSlice)
  const dispatch = useDispatch()
  const { category, timespan } = useParams()
  const [currentPage, setCurrentPage] = useState(1)

  const tasksPerPage = 9
  const isPage = Math.ceil(tasks.length / tasksPerPage) === 1

  const indexLastTaskOnPage = currentPage * tasksPerPage
  const indexFirstTaskOnPage = indexLastTaskOnPage - tasksPerPage
  const currentTasks = tasks.slice(indexFirstTaskOnPage, indexLastTaskOnPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getTasks({ category, timespan }))
    setCurrentPage(1)
    return () => {}
  }, [taskAddInSession, category, timespan, isModalOpen])

  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      <div className="inline-flex flex-row-reverse h-full w-full">
        {!category ? (
          <Welcome />
        ) : (
          <>
            <div className="m-6 w-[350px]">{category && <StatusCounter tasks={tasks} />}</div>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3 gap-4 mt-6">
                {currentTasks.map((task) => (
                  <TaskCard task={task} key={task._id} className="" />
                ))}
              </div>
              {!isPage && (
                <div className="fixed bottom-[50px]">
                  <ul className="flex justify-center items-end m-1">
                    {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map(
                      (_, index) => (
                        <li key={index} className="mx-1">
                          <button
                            className={`bg-blue-500 text-white text-xs py-1 px-2 rounded-full hover:bg-blue-600 ${
                              currentPage === index + 1 ? 'bg-blue-600' : ''
                            }`}
                            onClick={() => paginate(index + 1)}
                            type="button"
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
        <FloatsButton />
        <CustomModal category={category} />
      </div>
    </div>
  )
}

export default Tasks
