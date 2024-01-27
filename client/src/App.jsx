import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import DevRegister from './components/DevRegister';

function App() {

  return (
    <BrowserRouter>
    <div> 
      <Routes>
        
        <Route path="/DevRegister" element={<DevRegister/>}/>
        
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
