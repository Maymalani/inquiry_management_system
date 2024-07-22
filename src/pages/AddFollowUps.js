import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';

const AddFollowUps = () => {

    const { api, authorizationToken, allInquiry, getAllInquiry } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const followUpObj = {
        reason: "",
        date: "",
        by: "",
        inquiry: ""
    }

    const [followUps, setFollowUps] = useState(followUpObj);

    const handleChange = (e) => {
        setFollowUps({
            ...followUps, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (followUps.reason.length > 0 && followUps.date.length > 0 && followUps.by.length > 0) {
            setLoading(true);
            const response = await fetch(`${api}/follow/followup`, {
                method: "POST",
                headers: {
                    AUthorization: authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(followUps)
            });

            if (response.ok) {
                setLoading(false);
                setFollowUps(followUpObj);
                window.alert("Follow Up Added Successfully");
                navigate("/view-follow-ups");
            } else {
                setLoading(false)
            }
        } else {
            window.alert("All Fields Required");
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllInquiry();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Add Follow Ups</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Add Follow Ups</p>
                </div>
            </div>
            <section className='mt-2'>
                <div className='grid place-items-center'>
                    <form className='flex flex-col w-full px-2 xs:px-0 sm:w-1/2 lg:w-1/3 mx-auto shadow-lg lg:px-10 rounded-2xl' onSubmit={handleSubmit}>
                        <h1 className='text-center text-2xl font-bold text-green-600 py-3'>Add Follow Ups</h1>
                        <input
                            autoFocus
                            className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Reason'
                            type="text"
                            name='reason'
                            value={followUps.reason}
                            onChange={handleChange}
                        />
                        <input
                            className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Date'
                            type="date"
                            name='date'
                            value={followUps.date}
                            onChange={handleChange}
                        />
                        <input
                            className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3"
                            placeholder='Follow Ups By'
                            type="text"
                            name='by'
                            value={followUps.by}
                            onChange={handleChange}
                        />
                        <label className='mb-2'>Select Inquiry</label>
                        <select className="w-full border-[1px] p-2 rounded-md border-gray-300 outline-none mb-3" onChange={handleChange} name='inquiry' value={followUps.inquiry}>
                            <option>Select Inquiry</option>
                            {
                                allInquiry?.map((val, ind) => {
                                    return (
                                        <option value={val._id} key={ind}>{val.name}</option>
                                    )
                                })
                            }
                        </select>
                        <input type="submit" value={loading ? "Please Wait" : "Add Follow Ups"} disabled={loading} className='mb-3 w-full sm:w-1/2 m-auto bg-green-600 text-white capitalize px-2 py-1 rounded-md' />
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddFollowUps
