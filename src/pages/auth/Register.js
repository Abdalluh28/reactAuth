
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import Cookies from 'js-cookie';


const Register = () => {


    let [userInputs, setUserInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const [register, { isLoading, isError, error, isSuccess }] = useRegisterMutation()


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await register({
                firstName: userInputs.firstName,
                lastName: userInputs.lastName,
                email: userInputs.email,
                password: userInputs.password
            })
    
            const accessToken = data?.accessToken
            if (accessToken) {
                Cookies.set('accessToken', accessToken, { expires: 7 })
                setUserInputs({
                    firstName: "", lastName: "", email: "", password: "",
                })
                navigate("/Dashboard")
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required
                                value={userInputs.firstName} onChange={(e) => {
                                    setUserInputs({ ...userInputs, firstName: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" name="lastName" id="lastName" placeholder="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                                value={userInputs.lastName} onChange={(e) => {
                                    setUserInputs({ ...userInputs, lastName: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                                value={userInputs.email} onChange={(e) => {
                                    setUserInputs({ ...userInputs, email: e.target.value })
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                                value={userInputs.password} onChange={(e) => {
                                    setUserInputs({ ...userInputs, password: e.target.value })
                                }}
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button disabled={isLoading} type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-50 border border-gray-300">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?
                            <Link to="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>

            {isLoading && <p>loading...</p>}
            {isError && error && <p className="text-red-500">{error.data.message}</p>}
        </div>
    )
}


export default Register