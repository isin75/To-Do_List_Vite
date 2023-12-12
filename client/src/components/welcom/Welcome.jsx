import React from 'react'
import { useSelector } from 'react-redux'
import { ArrowRightOutlined } from '@ant-design/icons'

const Welcome = () => {
  const { isTheme } = useSelector((s) => s.toDoSlice)
  const textColor = isTheme ? 'text-white' : 'text-black'
  const className1 = `text-lg font-medium px-2 m-6 ${textColor}`
  const className2 = `text-lg font-medium px-2 m-auto ${textColor} fixed bottom-[65px]`
  return (
    <div>
      <h1 className={className1}>
        Welcome to the To-Do App! Here you can organize your tasks, monitor deadlines and structure
        your productivity. Create, delete and edit tasks, add categories, set deadlines and control
        your workflow. Enjoy using it!
      </h1>
      <h1 className={className2}>
        To get started, hover over the button on the bottom right <ArrowRightOutlined />
      </h1>
    </div>
  )
}

export default Welcome
