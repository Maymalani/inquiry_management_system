import React, { useState } from 'react'
import { json, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';

const AddRoles = () => {

    const { api, authorizationToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role.length > 0) {
            console.log(role);
            setLoading(true);
            const response = await fetch(`${api}/role/role`, {
                method: "POST",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: role })
            });

            if (response.ok) {
                setLoading(false)
                setRole("");
                window.alert("Role added Successfully");
                navigate("/view-role");
            } else {
                setLoading(false);
            }
        } else {
            window.alert("Role Required");
            setLoading(false)
        }
    };

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add Roles</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Add Roles</p>
                </div>
            </div>
            <section className='mt-2'>
                <div className='grid place-items-center'>
                    <form className='flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl' onSubmit={handleSubmit}>
                        <h1 className='text-center text-2xl font-bold text-green-600 py-3'>Add Role</h1>
                        <input
                            autoFocus
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Role'
                            type="text"
                            name='name'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <input type="submit" value={loading ? "Please Wait" : "Add Role"} disabled={loading} className='mb-3 w-full sm:w-1/2 m-auto bg-green-600 text-white capitalize px-2 py-1 rounded-md' />
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddRoles
