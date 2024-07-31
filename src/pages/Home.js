import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useLogoutMutation } from '../redux/features/auth/authApiSlice'

export default function Home() {

    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        Cookies.remove('accessToken')
        navigate('/auth/login')
    }


    return (
        <>
            <div className='bg-red-500 mb-5'>Authentication App</div>
            <Link to={'/auth/login'} type="submit" class="w-[200px] m-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-50 border border-gray-300">Login</Link >
            <Link to={'/auth/register'} type="submit" class="w-[200px] m-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-50 border border-gray-300">Register</Link >
            <button onClick={handleLogout} class="w-[200px] m-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-50 border border-gray-300">Logout</button >
        </>
    )
}
