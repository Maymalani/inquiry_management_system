import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import axios from 'axios';

const Register = ({ setLogin }) => {

    const { storeTokenInLs, api, findAdmin } = useAuth();

    const userObj = {
        admin_name: "",
        admin_email: "",
        password: "",
        contact: "",
        image: null
    };

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(userObj);

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setUser({
            ...user, image: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fData = new FormData();
        fData.append('admin_name', user.admin_name);
        fData.append('admin_email', user.admin_email);
        fData.append('password', user.password);
        fData.append('contact', user.contact);
        fData.append('image', user.image)

        const response = await axios.post(`${api}/auth/register`, fData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (response.data) {
            setLoading(false);
            storeTokenInLs(response.data.token);
            findAdmin();
            window.alert("User Registered Successfully");
        }
    }

    return (
        <>
            <section className='w-screen h-screen grid place-items-center'>
                <form encType='multipart/form-data' className="flex flex-col col-10 col-sm-8 col-md-6 col-lg-4 px-3 sm:px-5 mx-auto shadow-lg lg:px-10 rounded-2xl" onSubmit={handleSubmit}>
                    <h1 className='text-center text-2xl font-bold text-green-600 py-3'>Register</h1>
                    <label htmlFor='admin_name' className='mb-1'>Name</label>
                    <input
                        className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        type="text"
                        id='admin_name'
                        name='admin_name'
                        required
                        value={user.admin_name}
                        onChange={handleChange}
                    />
                    <label htmlFor='admin_email' className='mb-1'>Email</label>
                    <input
                        className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        type="email"
                        id='admin_email'
                        name='admin_email'
                        required
                        value={user.admin_email}
                        onChange={handleChange}
                    />
                    <label htmlFor='password' className='mb-1'>Password</label>
                    <input
                        required
                        className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3'
                        type="password"
                        id='password'
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                    />
                    <label htmlFor='contact' className='mb-1'>Contact</label>
                    <input
                        className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        type="text"
                        inputMode='numeric'
                        id='contact'
                        name='contact'
                        required
                        value={user.contact}
                        onChange={handleChange}
                    />
                    <label htmlFor='image' className='mb-1'>Image</label>
                    <input
                        className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        type="file"
                        id='image'
                        name='image'
                        required
                        onChange={handleFileChange}
                    />
                    {/*<p className="text-blue-500 text-xs text-right mb-3 cursor-pointer" onClick={() => setShow(true)}>Forgot Password ?</p>*/}
                    <button disabled={loading} className={`mx-auto w-1/2 ${loading ? "bg-green-500" : "bg-green-600"} text-white rounded-md py-2 `}>{loading ? "Please Wait" : "Register Now"}</button>
                    <p className='my-3 m-auto'>Existing User ? <span className='text-green-500 cursor-pointer' onClick={() => setLogin(true)}>Login Now</span></p>
                </form>
            </section>
        </>
    )
}

export default Register
