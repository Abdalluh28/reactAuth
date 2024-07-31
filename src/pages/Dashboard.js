import React, { useEffect } from 'react'
import { useGetUsersQuery } from '../redux/features/users/usersApiSlice'

export default function Dashboard() {

    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

    useEffect(() => {
        if (users) {
            console.log(users)
        }
        
    }, [users])

    return (
        <>
            <div>Dashboard</div>
            {isLoading && !isError && <div>Loading...</div>}
            {users &&
                <div className='grid grid-cols-4 gap-4'>

                    {
                        users.map(user => {
                            return (
                                <div key={user.id} href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.firstName}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{user.email}</p>
                                </div>
                            )
                        })
                    }

                </div>
            }
        </>
    )
}
