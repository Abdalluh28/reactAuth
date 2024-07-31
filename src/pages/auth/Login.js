import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import Cookies from 'js-cookie';

export default function Login() {


    const [userInputs, setUserInputs] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();
    const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

    let handleSubmit = async (e) => {
        e.preventDefault();

        

        try {
            const { data } = await login({
                email: userInputs.email,
                password: userInputs.password
            })

            const accessToken = data?.accessToken;
            if (accessToken) {
                Cookies.set('accessToken', accessToken, { expires: 7 });
                setUserInputs({
                    email: "", password: "",
                })
                navigate("/Dashboard")
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                    required value={userInputs.email} onChange={(e) => {
                                        setUserInputs({ ...userInputs, email: e.target.value })
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required value={userInputs.password} onChange={(e) => {
                                        setUserInputs({ ...userInputs, password: e.target.value })
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button disabled={isLoading} type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-50 border border-gray-300">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ">Sign up</Link>
                            </p>
                        </form>
                        {isLoading && <p>loading...</p>}
                        {isError && error && <p className="text-red-500">{error.data.message}</p>}
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
