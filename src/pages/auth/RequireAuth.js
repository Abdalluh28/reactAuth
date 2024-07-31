import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {

    const accessToken = Cookies.get('accessToken')
    

    return (
        <>
            {accessToken ? children : <Navigate to={'/auth/login'} replace/>}
        </>
    )
}
