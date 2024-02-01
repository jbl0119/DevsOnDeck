import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import DevRegister from './components/DevRegister';

import DevLogin from './components/DevLogin';
import DevDashboard from './components/DevDashboard';
import DevSkillLanguages from './components/DevSkillLanguages';
import DevSkillFrameworks from './components/DevSkillFrameworks';

import OrgRegister from './components/OrgRegister';
import OrgLogin from './components/OrgLogin';
import OrgPage from './components/OrgPage';
import AddPosition from './components/AddPosition';




function App() {

  return (
    <BrowserRouter>
    <div> 
      <Routes>
        
        <Route index element={<DevLogin/>}/>
        <Route path="/devs/dashboard/:id" element={<DevDashboard/>}/>
        <Route path="/devs/register" element={<DevRegister/>}/>
        <Route path="/orgs/register" element={<OrgRegister/>}/>

        <Route path="/orgs/login" element={<OrgLogin/>}/>
        <Route path="/orgs/dashboard/:id" element={<OrgPage/>}/>
        <Route path="/orgs/jobs/add" element={<AddPosition/>}/>
        <Route path="/devs/skills/languages/:id" element={<DevSkillLanguages/>}/>
        <Route path="/devs/skills/frameworks/:id" element={<DevSkillFrameworks/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
