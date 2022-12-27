import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Auth/login'
import Rigestration from '../components/Auth/register'
import HomePage from '../components/home'
import PrivateRoute from './private'

const Pages = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    } >
                    </Route>
                    <Route path="/registration" element={<Rigestration />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Pages
