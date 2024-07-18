import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { Modal } from 'react-bootstrap';

const ViewInquiry = () => {

    const { api, authorizationToken, Branch, getAllBranch, allReferences, getAllReferences, allStatus, getAllStatus, allUser, getAllUser, allInquiry, getAllInquiry } = useAuth();

    const [show, setShow] = useState(false);
    const [inquiryData, setInquiryData] = useState();
    const [updateId, setUpdateId] = useState("");
    const [updateInquiry, setUpdateInquiry] = useState();
    const [updateModelShow, setUpdateModelShow] = useState(false);

    const update = async (id) => {
        setUpdateModelShow(true);
        setUpdateId(id);
        const response = await fetch(`${api}/inquiry/inquiry_update/${id}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setUpdateInquiry(data.data);
        }
    };

    console.log(updateInquiry);

    const handleChange = (e) => {
        setUpdateInquiry({
            ...updateInquiry, [e.target.name]: e.target.value
        })
    };

    const deleteInquiry = async (id) => {
        if (window.confirm("Are you sure to delete inquiry ?")) {
            const response = await fetch(`${api}/inquiry/inquiry_delete/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if (response.ok) {
                window.alert("Inquiry Deleted Successfully");
                getAllInquiry();
            }
        }
    };

    const viewInquiry = async (name) => {
        setShow(true)
        const response = await fetch(`${api}/inquiry/find_inquiry?name=${name}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            setInquiryData(data.data[0]);
        }
    }

    const updateInquiries = async () => {
        const response = await fetch(`${api}/inquiry/inquiry_update/${updateId}`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateInquiry)
        });

        if (response.ok) {
            window.alert("Inquiry Updated Successfully");
            setUpdateId("");
            getAllInquiry();
            setUpdateModelShow(false);
        }
    }

    useEffect(() => {
        getAllInquiry();
        getAllBranch();
        getAllReferences();
        getAllStatus();
        getAllUser();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>View Inquiry</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / View Inquiry</p>
                </div>
            </div>
            <section className='py-3'>
                <div className='grid place-items-center'>
                    <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-2xl p-2'>
                        <h1 className='text-2xl text-center mb-4 text-green-600 font-bold'>All Inquiry</h1>
                        {
                            allInquiry?.length > 0 ?
                                <div className='table-responsive'>
                                    <table className="table">
                                        <caption>List of Inquiries</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Inquiry</th>
                                                <th scope="col">status</th>
                                                <th scope='col'>Branch</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allInquiry?.map((val, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td>{ind + 1}</td>
                                                            <td>{val.name}</td>
                                                            <td>
                                                                <div className='flex items-center gap-2'>
                                                                    <p className={`w-2 h-2 ${val.status.name === "Active" ? "bg-green-600" : val.status.name === "Pending" ? "bg-yellow-600" : val.status.name === "Declined" ? "bg-pink-500" : "bg-red-600"} rounded-full`}></p>{val.status.name}
                                                                </div>
                                                            </td>
                                                            <td>{val.branch.name}</td>
                                                            <td>
                                                                <div className='flex gap-x-3 items-center'>
                                                                    <i className="fa-solid fa-pen-to-square text-green-600 cursor-pointer" title='Update Inquiry' onClick={() => update(val._id)}></i>
                                                                    <i className="fa-solid fa-trash-can text-red-600 cursor-pointer" title='Delete Inquiry' onClick={() => deleteInquiry(val._id)}></i>
                                                                    <i className="fa-solid fa-ellipsis-vertical cursor-pointer" title='More Details' onClick={() => viewInquiry(val.name)}></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div> :
                                <p className='text-center'>* No Inquiries To Show.</p>
                        }
                    </div>
                </div>
            </section>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Inquiry Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex flex-wrap justify-start gap-3'>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Inquiry</span>
                            <p className='text-text-dark'>{inquiryData?.name ? inquiryData?.name : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Branch</span>
                            <p className='text-text-dark'>{inquiryData?.branch.name ? inquiryData?.branch.name : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Contact</span>
                            <p className='text-text-dark'>{inquiryData?.contact ? inquiryData?.contact : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Email</span>
                            <p className='text-text-dark'>{inquiryData?.email ? inquiryData?.email : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Join Date</span>
                            <p className='text-text-dark'>{inquiryData?.joindate ? inquiryData?.joindate : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Reference</span>
                            <p className='text-text-dark'>{inquiryData?.reference.name ? inquiryData?.reference.name : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Ref By</span>
                            <p className='text-text-dark'>{inquiryData?.ref_by ? inquiryData?.ref_by : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Inquiry By</span>
                            <p className='text-text-dark'>{inquiryData?.inquiry_by.admin_name ? inquiryData?.inquiry_by.admin_name : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Status</span>
                            <p className='text-text-dark'>{inquiryData?.status.name ? inquiryData?.status.name : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Status Date</span>
                            <p className='text-text-dark'>{inquiryData?.status_date ? inquiryData?.status_date : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs sm:text-sm lg:text-md text-muted'>Inquiry Date</span>
                            <p className='text-text-dark'>{inquiryData?.inquiry_date ? inquiryData?.inquiry_date : "-"}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-green-600 text-white px-2 py-1 rounded-md' onClick={() => setShow(false)}>Close</button>
                </Modal.Footer>
            </Modal>
            <Modal show={updateModelShow} onHide={() => setUpdateModelShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-xl text-green-600 font-semibold'>Update Inquiry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select required className='w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3' name='branch' onChange={handleChange} value={updateInquiry?.branch}>
                        <option>Select Branch</option>
                        {
                            Branch?.map((val, ind) => {
                                return (
                                    <option value={val._id} key={ind}>{val.name}</option>
                                )
                            })
                        }
                    </select>
                    <input
                        required
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='Name'
                        type="text"
                        name='name'
                        value={updateInquiry?.name}
                        onChange={handleChange}
                    />
                    <input
                        required
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='Contact'
                        type="text"
                        inputMode='numeric'
                        name='contact'
                        value={updateInquiry?.contact}
                        onChange={handleChange}
                    />
                    <label className='w-full mb-2'>Join Date</label>
                    <input
                        required
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='Join Date'
                        type="date"
                        name='joindate'
                        value={updateInquiry?.joindate}
                        onChange={handleChange}
                    />
                    <select required className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" name='reference' onChange={handleChange} value={updateInquiry?.reference}>
                        <option>Select Reference</option>
                        {
                            allReferences?.map((val, ind) => {
                                return (
                                    <option value={val._id} key={ind}>{val.name}</option>
                                )
                            })
                        }
                    </select>
                    <input
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='Reference By'
                        type="text"
                        name='ref_by'
                        value={updateInquiry?.ref_by}
                        onChange={handleChange}
                    />
                    <select required className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" name='inquiry_by' onChange={handleChange} value={updateInquiry?.inquiry_by}>
                        <option>Select Inquiry By</option>
                        {
                            allUser?.map((val, ind) => {
                                return (
                                    <option value={val._id} key={ind}>{val.admin_name}</option>
                                )
                            })
                        }
                    </select>
                    <select required className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" name='status' onChange={handleChange} value={updateInquiry?.status}>
                        <option>Select Status</option>
                        {
                            allStatus?.map((val, ind) => {
                                return (
                                    <option value={val._id} key={ind}>{val.name}</option>
                                )
                            })
                        }
                    </select>
                    <label className='w-full mb-2'>Status Date</label>
                    <input
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='Status Date'
                        type="date"
                        name='status_date'
                        value={updateInquiry?.status_date}
                        onChange={handleChange}
                    />
                    <label className='mb-2'>Inquiry Date</label>
                    <input
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='Inquiry Date'
                        type="date"
                        name='inquiry_date'
                        value={updateInquiry?.inquiry_date}
                        onChange={handleChange}
                    />
                    <input
                        required
                        className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                        placeholder='email'
                        type="text"
                        name='email'
                        inputMode='email'
                        value={updateInquiry?.email}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-green-600 text-white px-2 py-1 rounded-md' onClick={updateInquiries}>Update Inquiry</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewInquiry
