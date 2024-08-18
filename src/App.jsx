import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register/Register'
import CreateCard from './Pages/CreateCard/CreateCard'
import MyCard from './Pages/myCard/myCard'
import Login from './Pages/Login/Login';
import AllCards from './Pages/AllCards/AllCrads'
const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/createcard' element={<CreateCard/>}/>
        <Route path='/mycard/:id' element={<MyCard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/allcards' element={<AllCards/>}/>
    </Routes>
  )
}

export default App