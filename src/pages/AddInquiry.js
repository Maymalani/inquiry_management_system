import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';

const AddInquiry = () => {

    const { api, authorizationToken, allUser, getAllUser, Branch, getAllBranch, allReferences, getAllReferences, getAllStatus, allStatus } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const inquiryObj = {
        branch: "",
        name: "",
        contact: "",
        joindate: "",
        reference: "",
        ref_by: "",
        inquiry_by: "",
        status: "",
        status_date: "",
        inquiry_date: "",
        email: ""

    }

    const [inquiryData, setInquiryData] = useState(inquiryObj)

    const handleChange = (e) => {
        setInquiryData({
            ...inquiryData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`${api}/inquiry/inquiry`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inquiryData)
        });

        if (response.ok) {
            setLoading(false);
            window.alert("Inquiry Added Successfully");
            setInquiryData(inquiryObj);
            navigate("/view-inquiry");
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllUser();
        getAllBranch();
        getAllStatus();
        getAllReferences();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add Inquiry</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Add Inquiry</p>
                </div>
            </div>
            <section className='mt-2'>
                <div className='grid place-items-center'>
                    <form className='flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl' onSubmit={handleSubmit}>
                        <h1 className='text-center text-2xl font-bold text-green-600 py-3'>Add Inquiry</h1>
                        <select required className='border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3' name='branch' onChange={handleChange}>
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
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Inquiry'
                            type="text"
                            name='name'
                            value={inquiryData.name}
                            onChange={handleChange}
                        />
                        <input
                            required
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Contact'
                            type="text"
                            inputMode='numeric'
                            name='contact'
                            value={inquiryData.contact}
                            onChange={handleChange}
                        />
                        <label className='mb-2'>Join Date</label>
                        <input
                            required
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Join Date'
                            type="date"
                            name='joindate'
                            value={inquiryData.joindate}
                            onChange={handleChange}
                        />
                        <select required className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" name='reference' onChange={handleChange}>
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
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Reference By'
                            type="text"
                            name='ref_by'
                            value={inquiryData.ref_by}
                            onChange={handleChange}
                        />
                        <select required className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" name='inquiry_by' onChange={handleChange}>
                            <option>Select Inquiry By</option>
                            {
                                allUser?.map((val, ind) => {
                                    return (
                                        <option value={val._id} key={ind}>{val.admin_name}</option>
                                    )
                                })
                            }
                        </select>
                        <select required className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" name='status' onChange={handleChange}>
                            <option>Select Status</option>
                            {
                                allStatus?.map((val, ind) => {
                                    return (
                                        <option value={val._id} key={ind}>{val.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label className='mb-2'>Status Date</label>
                        <input
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Status Date'
                            type="date"
                            name='status_date'
                            value={inquiryData.status_date}
                            onChange={handleChange}
                        />
                        <label className='mb-2'>Inquiry Date</label>
                        <input
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Inquiry Date'
                            type="date"
                            name='inquiry_date'
                            value={inquiryData.inquiry_date}
                            onChange={handleChange}
                        />
                        <input
                            required
                            className="border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='email'
                            type="text"
                            name='email'
                            inputMode='email'
                            value={inquiryData.email}
                            onChange={handleChange}
                        />
                        <input type="submit" value={loading ? "Please Wait" : "Add Inquiry"} disabled={loading} className='mb-3 w-full sm:w-1/2 m-auto bg-green-600 text-white capitalize px-2 py-1 rounded-md' />
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddInquiry
