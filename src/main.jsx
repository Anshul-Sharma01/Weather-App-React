import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HourlyCard from './Components/HourlyCard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/hourly-forecast/:city/:day' element={<HourlyCard/>}/>
    </Routes>
  </Router>
)
