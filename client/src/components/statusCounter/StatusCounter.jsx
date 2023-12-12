import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const StatusCounter = ({ tasks }) => {
  const { isTheme } = useSelector((s) => s.toDoSlice)
  const calculateTaskCounts = () => {
    const count = {
      Total: 0,
      New: 0,
      'In progress': 0,
      Blocked: 0,
      Done: 0
    }

    tasks.forEach((task) => {
      count[task.status] += 1
      count.Total += 1
    })

    return count
  }

  const statusCounts = useMemo(() => calculateTaskCounts(), [tasks])

  const textColor = isTheme ? 'text-white' : 'text-black'
  const className = `text-xs flex flex-col justify-center items-end px-2 m-auto ${textColor}`
  return (
    <div className={className}>
      <h1 className="text-base font-semibold">Tasks status:</h1>
      <p className="text-sm">
        New: <span className="font-semibold">{statusCounts.New}</span>
      </p>
      <p className="text-sm">
        In progress: <span className="font-semibold">{statusCounts['In progress']}</span>
      </p>
      <p className="text-sm">
        Blocked: <span className="font-semibold">{statusCounts.Blocked}</span>
      </p>
      <p className="text-sm">
        Done: <span className="font-semibold">{statusCounts.Done}</span>
      </p>
      <p className="text-sm">
        Total task: <span className="font-semibold">{statusCounts.Total}</span>
      </p>
    </div>
  )
}

export default StatusCounter
