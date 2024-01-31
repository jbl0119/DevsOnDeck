import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import DevRegister from './components/DevRegister';
import OrgRegister from './components/OrgRegister';
import OrgPage from './components/OrgPage.jsx';
import DevSkillLanguages from './components/DevSkillLanguages';
import DevSkillFrameworks from './components/DevSkillFrameworks';

function App() {

  return (
    <BrowserRouter>
    <div> 
      <Routes>
        
        <Route path="/DevRegister" element={<DevRegister/>}/>
        <Route path="/orgs/register" element={<OrgRegister/>}/>
        <Route path="/orgs/dashboard" element={<OrgPage/>}/>
        <Route path="/Devs/Skills/Languages" element={<DevSkillLanguages/>}/>
        <Route path="/Devs/Skills/Frameworks" element={<DevSkillFrameworks/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
