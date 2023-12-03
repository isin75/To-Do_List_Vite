import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactLogo from '../../assets/react.svg'
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
import viteLogo from '/vite.svg'
import './Home.css'
import { increment } from '../../../store/reducers/slice'

const Home = () => {
  const { count } = useSelector((s) => s.slice)
  const dispatch = useDispatch()

  const handleClickPlus = () => {
    return dispatch(increment())
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => handleClickPlus()}>
          count is {count}
        </button>
        <p>
          Edit <code>client/src/pages/home/home.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default Home
