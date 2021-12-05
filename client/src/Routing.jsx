import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Signup} from './views/Signup.page'
import {Login} from './views/Login.page'
import { Sidebar } from './components/jsx components/sidebar';
export const Routing = () => {
    return (
        <BrowserRouter>
    <Routes> 
    <Route path='Signup' element={<Signup/>}/>
    <Route path='Login' element={<Login/>}/>
    <Route path='sidebar' element={<Sidebar/>}/>
    </Routes>

    </BrowserRouter>
    )
}
