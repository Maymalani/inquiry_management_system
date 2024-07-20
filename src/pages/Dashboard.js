import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

const Dashboard = () => {

  const { allInquiry, getAllInquiry, activeInquiry, getActiveInquiry, pendingInquiry, getPendingInquiry, declinedInquiry, setDeclinedInquiry, closedInquiry, getClosedInquiry } = useAuth();

  const card = [
    {
      id: 1,
      count: activeInquiry?.length,
      bgColor: "success",
      text: "Active Inquiries",
      link: "/inquiry/Active"
    },
    {
      id: 2,
      count: pendingInquiry?.length,
      bgColor: "warning",
      text: "Pending Inquiries",
      link: "/inquiry/Pending"
    },
    {
      id: 3,
      count: declinedInquiry?.length,
      bgColor: "dark",
      text: "Declined Inquiries",
      link: '/inquiry/Declined'
    },
    {
      id: 3,
      count: closedInquiry?.length,
      bgColor: "danger",
      text: "Closed Inquiries",
      link: '/inquiry/Closed'
    },
  ]

  useEffect(() => {
    getAllInquiry();
    getActiveInquiry();
    getPendingInquiry();
    getClosedInquiry();
  }, []);

  return (
    <>
      <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Dashboard</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Dashboard</p>
        </div>
      </div>
      <section className="text-gray-600 body-font w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <NavLink to={"/view-inquiry"} className={`flex items-center justify-between text-white p-3 bg-primary rounded-md`}>
            <p className='text-white text-sm sm:text-base md:text-xl lg:text-2xl'>All Inquiry</p>
            <i className="fa-solid fa-arrow-right"></i>
          </NavLink>
          {
            card.map((val, ind) => {
              return (
                <NavLink to={val.link} className={`flex items-center justify-between text-white p-3 bg-${val.bgColor} rounded-md`} key={val.id}>
                  <p className='text-white text-sm sm:text-base md:text-xl lg:text-xl'>{val.text}</p>
                  <i className="fa-solid fa-arrow-right"></i>
                </NavLink>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Dashboard
