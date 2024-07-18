import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { Modal } from 'react-bootstrap';

const ViewBranch = () => {

    const { api, authorizationToken, getAllBranch, Branch } = useAuth();
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [branchName, setBranchName] = useState("");
    const [updateId, setUpdateId] = useState("");

    const update = async (id) => {
        setUpdateModalShow(true);
        setUpdateId(id);
        const response = await fetch(`${api}/branch/branch_update/${id}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setBranchName(data.data.name);
        }
    }

    const deleteBranch = async (id) => {
        if (window.confirm(`Are you sure to delete branch ?`)) {
            const response = await fetch(`${api}/branch/branch_delete/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                window.alert("Branch Deleted Successfully");
                getAllBranch();
            }
        }
    }

    const updateBranch = async () => {
        const response = await fetch(`${api}/branch/branch_update/${updateId}`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: branchName })
        });

        if (response.ok) {
            setUpdateId("");
            setUpdateModalShow(false);
            window.alert("Branch Updated Successfully");
            getAllBranch();
        }
    }

    useEffect(() => {
        getAllBranch();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Branch</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / View Branch</p>
                </div>
            </div>
            <section className='py-3'>
                <div className='grid place-items-center'>
                    <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-2xl p-2'>
                        <h1 className='text-2xl text-center mb-4 text-green-600 font-bold'>All Branch</h1>
                        {
                            Branch?.length > 0 ?
                                <div className='table-responsive'>
                                    <table className="table">
                                        <caption>List of Branches</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Branch Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Branch?.map((val, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td>{ind + 1}</td>
                                                            <td>{val.name}</td>
                                                            <td>
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <i className="fa-regular fa-pen-to-square pr-3 text-green-600 cursor-pointer" title='Update Branch' onClick={() => update(val._id)}></i>
                                                                    <i className="fa-solid fa-trash-can hover:text-red-600 cursor-pointer" title='Delete Branch' onClick={() => deleteBranch(val._id)}></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div> :
                                <p className='text-center'>* No Branch to show.</p>
                        }
                    </div>
                </div>
            </section>
            <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name</label>
                    <input
                        className='w-full border-[1px] border-black p-1 rounded-md my-2'
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={updateBranch} className='bg-green-600 text-white px-3 py-1 rounded-md'>Update Branch</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewBranch
