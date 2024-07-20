import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import profile from '../assets/profile.jpg'
import axios from 'axios';

const Profile = () => {

    const navigate = useNavigate();
    const { api, user, authorizationToken, findAdmin, Logout } = useAuth();
    const [show, setShow] = useState(false);
    const [updateData, setUpdateData] = useState(user);
    const [updateImageShow, setUpdateImageShow] = useState(false);
    const [updateImg, setUpdateImg] = useState();
    const [pswUpdateShow, setPswUpdateShow] = useState(false)
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");

    const handleUpdateChange = (e) => {
        setUpdateData({
            ...updateData, [e.target.name]: e.target.value
        })
    }

    const submitUpdate = async () => {
        const response = await fetch(`${api}/auth/admin_update/${user._id}`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Updated Successfully");
            setShow(false);
            findAdmin();
        }
    }

    const submitUpdateImg = async () => {
        const formData = new FormData();
        formData.append('image', updateImg)
        const response = await axios.post(`${api}/auth/admin_update/img/${user._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authorizationToken
            }
        })

        if (response.data) {
            setUpdateImageShow(false);
            alert("Image Updated Successfully")
            findAdmin();
        }
    }

    const deleteImg = async () => {
        if (window.confirm("Are You Sure To Delete Profile Image")) {
            const response = await fetch(`${api}/auth/admin_delete/img/${user._id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })

            if (response.ok) {
                alert("Image Deleted Successfully");
                findAdmin();
            }
        }
    }

    const updatePassword = async () => {
        if (password !== "" && cnfPassword !== "" && password === cnfPassword) {
            const response = await fetch(`${api}/auth/admin_psw_change/${user._id}`, {
                method: "POST",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: password })
            });

            if (response.ok) {
                window.alert("Password Changed Successfully");
                setPswUpdateShow(false)
            }
        } else {
            window.alert("Both Password Should be same.")
        }
    }

    useEffect(() => {
        findAdmin();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Profile</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Profile</p>
                </div>
            </div>
            <section className='flex items-start gap-x-5 my-4'>
                <div className='flex flex-col'>
                    <img src={user.image ? `${api}/images/${user.image}` : profile} className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full' alt="" />
                    <div className='mt-4 flex gap-x-5 justify-center items-center'>
                        <i className="fa-solid fa-pen fa-lg cursor-pointer hover:text-green-600" title='Update Image' onClick={() => setUpdateImageShow(true)}></i>
                        <i className={`fa-solid fa-trash-can fa-lg cursor-pointer hover:text-red-600 ${user.image ? "block" : "hidden"}`} title='Delete Image' onClick={deleteImg}></i>
                    </div>
                </div>
                <div>
                    <p><span className='font-medium text-lg'>Name</span> : {user.admin_name}</p>
                    <p className='my-2'><span className='font-medium text-lg'>Email</span> : {user.admin_email}</p>
                    <p><span className='font-medium text-lg'>Password</span> : <span>.......</span></p>
                    <p className='my-2'><span className='font-medium text-lg'>Mobile</span> : {user.contact}</p>
                    <p><span className='font-medium text-lg'>Role</span> : {user.role ? user.role : "Not Assigned"}</p>
                    <p className='my-2'><span className='font-medium text-lg'>Branch</span> : {user.branch ? user.branch : "Not Assigned"}</p>
                </div>
            </section>
            <section className='flex gap-3 flex-wrap mb-3'>
                <button className='bg-green-600 text-white px-3 py-1 rounded-md' onClick={() => { setShow(true); setUpdateData(user) }}><i className="fa-regular fa-pen-to-square"></i> Edit Profile</button>
                <button className='bg-red-600 text-white px-3 py-1 rounded-md' onClick={() => { navigate("/"); Logout() }}><i className="fa-solid fa-power-off"></i> Logout </button>
                <button className='bg-purple-600 text-white px-3 py-1 rounded-md' onClick={() => setPswUpdateShow(true)}><i className="fa-solid fa-key"></i> Change Password</button>
            </section>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor='admin_name'>Name</label>
                    <input
                        className='w-full border border-black rounded-md p-1 outline-none my-1'
                        type='text'
                        id='admin_name'
                        name='admin_name'
                        value={updateData.admin_name}
                        onChange={handleUpdateChange}
                    />
                    <label htmlFor='admin_email'>Email</label>
                    <input
                        inputMode='email'
                        className='w-full border border-black rounded-md p-1 outline-none my-1'
                        type='text'
                        id='admin_email'
                        name='admin_email'
                        value={updateData.admin_email}
                        onChange={handleUpdateChange}
                    />
                    <label htmlFor='contact'>Contact</label>
                    <input
                        inputMode='numeric'
                        className='w-full border border-black rounded-md p-1 outline-none my-1'
                        type='text'
                        id='contact'
                        name='contact'
                        value={updateData.contact}
                        onChange={handleUpdateChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => { setUpdateData(user); setShow(false) }} className='bg-red-600 text-white px-3 py-1 rounded-md'>Cancel</button>
                    <button onClick={submitUpdate} className='bg-green-600 text-white px-3 py-1 rounded-md'>Update Profile</button>
                </Modal.Footer>
            </Modal>
            <Modal show={updateImageShow} onHide={() => setUpdateImageShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor='image'>Select Image</label>
                    <input type="file" name='image' id='image' className='w-full my-3' onChange={(e) => setUpdateImg(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={submitUpdateImg} className='bg-green-600 text-white px-3 py-1 rounded-md'>Update Image</button>
                </Modal.Footer>
            </Modal>
            <Modal show={pswUpdateShow} onHide={() => setPswUpdateShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        className='w-full border-[1px] border-black rounded-md p-1 mb-3'
                        placeholder='Enter New Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className='w-full border-[1px] border-black rounded-md p-1'
                        placeholder='Enter Confirm Password'
                        type="password"
                        value={cnfPassword}
                        onChange={(e) => setCnfPassword(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-red-600 text-white py-1 px-2 rounded-md' onClick={() => setPswUpdateShow(false)}>Cancel</button>
                    <button className='bg-green-600 text-white py-1 px-2 rounded-md' onClick={updatePassword}>Update Password</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile
