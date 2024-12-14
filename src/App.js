import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Create from './components/Create.js'
import Read from './components/Read.js'
import Update from './components/Update.js'
export default function App() {
  return (
    <>  
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Create/>}/>
        <Route path="/all" element={<Read/>}/>
        <Route path="/:id" element={<Update/>}/>  
      </Routes>
      </BrowserRouter>

    </>
  )
}
