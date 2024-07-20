import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { Modal } from 'react-bootstrap';

const InquiryStatus = () => {

    const { api, authorizationToken, allInquiry, getAllInquiry, getAllBranch, Branch, getAllReferences, allReferences, getAllStatus, allStatus, getAllUser, allUser, activeInquiry, getActiveInquiry, pendingInquiry, getPendingInquiry, declinedInquiry, getDeclinedInquiry, closedInquiry, getClosedInquiry } = useAuth();
    const { status } = useParams();
    const inquiry = status === "Active" ? activeInquiry : status === "Pending" ? pendingInquiry : status === "Declined" ? declinedInquiry : closedInquiry;
    const [inquiryData, setInquiryData] = useState();
    const [show, setShow] = useState(false);

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
    };

    useEffect(() => {
        getActiveInquiry();
        getPendingInquiry();
        getDeclinedInquiry();
        getClosedInquiry();
        //for update 
        getAllInquiry();
        getAllBranch();
        getAllReferences();
        getAllStatus();
        getAllUser();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
                <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>{status} Inquiry</h1>
                <div>
                    <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / {status} Inquiry</p>
                </div>
            </div>
            <section className='py-3'>
                <div className='grid place-items-center'>
                    <div className='flex flex-col col-12 col-sm-12 col-md-10 shadow-lg rounded-2xl p-2'>
                        <h1 className='text-2xl text-center mb-4 text-green-600 font-bold'>{status} Inquiry</h1>
                        {
                            inquiry?.length > 0 ?
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
                                                inquiry?.map((val, ind) => {
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
                                                                <button className="bg-green-600 text-white px-2 py-1 rounded-md" title='More Details' onClick={() => viewInquiry(val.name)}>View</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div> :
                                <p className='text-center'>* No {status} Inquiries To Show.</p>
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
        </>
    )
}

export default InquiryStatus
