import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import HomePage from '../../components/home';
import { AuthContext } from '../../context/AuthContext'

const PrivateRoute = () => {
    const { currentUser } = useContext(AuthContext);
    let authenticUser = currentUser;
    return (
        <>
            {
                authenticUser ? <HomePage /> : <Navigate to="/login" />
            }
        </>
    )
}

export default PrivateRoute