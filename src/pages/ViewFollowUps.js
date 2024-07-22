import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { Modal } from 'react-bootstrap';

const ViewFollowUps = () => {

    const { api, allFollowUps, authorizationToken, getAllFollowUps } = useAuth();

    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [followData, setFollowData] = useState({});

    const update = async (id) => {
        setUpdateId(id);
        setUpdateModalShow(true);
        const response = await fetch(`${api}/follow/followup_update/${id}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setFollowData(data.data);
        }
    };

    const handleUpdateFollowData = (e) => {
        setFollowData({
            ...followData, [e.target.name]: e.target.value
        })
    }

    const updateFollowUps = async () => {
        const response = await fetch(`${api}/follow/followup_update/${updateId}`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followData)
        });

        if (response.ok) {
            setUpdateId("");
            window.alert("Follow Ups Updated Successfully");
            setUpdateModalShow(false);
            getAllFollowUps();
        }
    };

    const deleteFollowUps = async (id) => {
        if (window.confirm("Are you sure to delete Follow Ups ?")) {
            const response = await fetch(`${api}/follow/followup_delete/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                alert("Follow Ups Deleted Successfully");
                getAllFollowUps();
            }
        }
    };

    useEffect(() => {
        getAllFollowUps();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Follow Ups</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / View Follow Ups</p>
                </div>
            </div>
            <section className='py-3'>
                <div className='grid place-items-center'>
                    <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-2xl p-2'>
                        <h1 className='text-2xl text-center mb-4 text-green-600 font-bold'>All Follow Ups</h1>
                        <div className='table-responsive'>
                            {
                                allFollowUps?.length > 0 ?
                                    <div className='table-responsive'>
                                        <table className="table">
                                            <caption>List of Follow Ups</caption>
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Reason</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">By</th>
                                                    <th scope="col">Inquiry</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allFollowUps?.map((val, ind) => {
                                                        return (
                                                            <tr key={ind}>
                                                                <td>{ind + 1}</td>
                                                                <td>{val.reason}</td>
                                                                <td>{val.date}</td>
                                                                <td>{val.by}</td>
                                                                <td>{val.inquiry.name ? val.inquiry.name : "-"}</td>
                                                                <td>
                                                                    <div className='flex gap-x-2 items-center'>
                                                                        <i className="fa-regular fa-pen-to-square pr-3 text-green-600 cursor-pointer" title='Update FollowUps' onClick={() => update(val._id)}></i>
                                                                        <i className="fa-solid fa-trash-can hover:text-red-600 cursor-pointer" title='Delete FollowUps' onClick={() => deleteFollowUps(val._id)}></i>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div> : <p className='text-center'>* No Follw Ups to show.</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={updateModalShow} onHide={() => setUpdateModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Follow Ups</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Reason</label>
                    <input
                        className='w-full border-[1px] border-black p-1 rounded-md my-2'
                        type="text"
                        name='reason'
                        value={followData.reason}
                        onChange={handleUpdateFollowData}
                    />
                    <label>Date</label>
                    <input
                        className='w-full border-[1px] border-black p-1 rounded-md my-2'
                        type="date"
                        name='date'
                        value={followData.date}
                        onChange={handleUpdateFollowData}
                    />
                    <label>By</label>
                    <input
                        className='w-full border-[1px] border-black p-1 rounded-md my-2'
                        type="text"
                        name='by'
                        value={followData.by}
                        onChange={handleUpdateFollowData}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={updateFollowUps} className='bg-green-600 text-white px-3 py-1 rounded-md'>Update Follow Ups</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewFollowUps
