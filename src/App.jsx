import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return(
    <>
      <h1 className='text-white text-center bg-slate-700 p-4 m-2 text-4xl'>Weather-App</h1>
    </>
  )
}

export default App
