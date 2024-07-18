import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

const Topnav = ({ expanded }) => {

    const { Logout, user } = useAuth();

    return (
        <>
            <header className={`h-16 px-3 pt-[19px] fixed top-0 right-0 bg-white border-b-[1px]`} style={{ width: expanded ? `calc(100% - 15rem)` : `calc(100% - 3rem)` }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='text-xl text-green-600 font-semibold'>Hello , {user.admin_name}</h1>
                    </div>
                    <div>
                        <NavLink to={"/"} className="hover:text-green-600">Dashboard</NavLink>
                    </div>
                </div>
            </header>
            <hr />
        </>
    )
}

export default Topnav
