import React from 'react'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {

  const card = [
    {
      id: 1,
      bgColor: "primary",
      text: "All Inquiries"
    },
    {
      id: 2,
      bgColor: "success",
      text: "Pending Inquiries"
    },
    {
      id: 3,
      bgColor: "warning",
      text: "Resolved Inquiries"
    },
    {
      id: 4,
      bgColor: "danger",
      text: "Closed Inquiries"
    },
  ]
  return (
    <>
      <div className='flex justify-between items-center py-3 flex-wrap w-full mt-16'>
        <h1 className='text-sm md:text-lg lg:text-xl font-semibold'>Dashboard</h1>
        <div>
          <p className="text-sm"><NavLink to={"/"} className='text-green-600'>Home</NavLink> / Dashboard</p>
        </div>
      </div>
      <section className="text-gray-600 body-font w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {
            card.map((val, ind) => {
              return (
                <div className="text-white p-1" key={val.id}>
                  <div>
                    <div className={`bg-${val.bgColor} px-2 py-4 rounded-md`}>
                      <h2 className='text-4xl text-white'>150</h2>
                      <p className='text-white'>{val.text}</p>
                    </div>
                    <hr className='text-gray-500' />
                    <div className={`bg-${val.bgColor} text-center p-2 rounded-md`}>More Info</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Dashboard
