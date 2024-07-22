import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { Modal } from 'react-bootstrap';

const ViewStatus = () => {

    const { api, authorizationToken, getAllStatus, allStatus } = useAuth();
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [status, setStatus] = useState("");
    const [updateId, setUpdateId] = useState("");

    const update = async (id) => {
        setUpdateModalShow(true);
        setUpdateId(id);
        const response = await fetch(`${api}/status/status_update/${id}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setStatus(data.data.name)
        }

    };

    const updateStatus = async () => {
        const response = await fetch(`${api}/status/status_update/${updateId}`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: status })
        });

        if (response.ok) {
            window.alert("Status Updated Successfully");
            setUpdateId("");
            setUpdateModalShow(false);
            getAllStatus();
        }
    };

    const deleteStatus = async (id) => {
        if (window.confirm("Are you sure to delete status")) {
            const response = await fetch(`${api}/status/status_delete/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                window.alert("Status Deleted Successfully");
                getAllStatus();
            }
        }
    };

    useEffect(() => {
        getAllStatus();
    }, [])

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Status</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / View Status</p>
                </div>
            </div>
            <section className='py-3'>
                <div className='grid place-items-center'>
                    <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-2xl p-2'>
                        <h1 className='text-2xl text-center mb-4 text-green-600 font-bold'>All Status</h1>
                        {
                            allStatus?.length > 0 ?
                                <div className='table-responsive'>
                                    <table className="table">
                                        <caption>List of Status</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allStatus?.map((val, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td>{ind + 1}</td>
                                                            <td>{val.name}</td>
                                                            <td>
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <i className="fa-regular fa-pen-to-square pr-3 text-green-600 cursor-pointer" title='Update Status' onClick={() => update(val._id)}></i>
                                                                    <i className="fa-solid fa-trash-can hover:text-red-600 cursor-pointer" title='Delete Status' onClick={() => deleteStatus(val._id)}></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div> :
                                <p className='text-center'>* No Status To Show.</p>
                        }
                    </div>
                </div>
            </section>
            <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name</label>
                    <input
                        autoFocus
                        className='w-full border-[1px] border-black p-1 rounded-md my-2'
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={updateStatus} className='bg-green-600 text-white px-3 py-1 rounded-md'>Update Status</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewStatus
