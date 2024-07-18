import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';
import profile from '../assets/profile.jpg'

const Sidenav = ({ expanded, setExpanded }) => {

  const navigate = useNavigate();

  const [firstTab, setFirstTab] = useState(false);
  const [secondTab, setSecondTab] = useState(false);
  const [thirdTab, setThirdTab] = useState(false);
  const [fourthTab, setFourthTab] = useState(false);
  const [fifthTab, setFifthTab] = useState(false);
  const [sixthTab, setSixthTab] = useState(false);
  const [seventhTab, setSeventhTab] = useState(false);

  const { user, api, Logout } = useAuth();

  const liHandle = () => {
    if (!expanded) {
      setExpanded(true);
    }
  }

  const firstTabHandle = () => {
    setFirstTab(!firstTab);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(false);
    setFifthTab(false);
    setSixthTab(false);
    setSeventhTab(false);
  }

  const secondTabHandle = () => {
    setFirstTab(false);
    setSecondTab(!secondTab);
    setThirdTab(false);
    setFourthTab(false);
    setFifthTab(false);
    setSixthTab(false);
    setSeventhTab(false);
  }

  const thirdTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(!thirdTab);
    setFourthTab(false);
    setFifthTab(false);
    setSixthTab(false);
    setSeventhTab(false);
  }

  const fourthTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(!fourthTab);
    setFifthTab(false);
    setSixthTab(false);
    setSeventhTab(false);
  }

  const fifthTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(false);
    setFifthTab(!fifthTab);
    setSixthTab(false);
    setSeventhTab(false);
  }

  const sixthTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(false);
    setFifthTab(false);
    setSixthTab(!sixthTab);
    setSeventhTab(false);
  }

  const seventhTabHandle = () => {
    setFirstTab(false);
    setSecondTab(false);
    setThirdTab(false);
    setFourthTab(false);
    setFifthTab(false);
    setSixthTab(false);
    setSeventhTab(!seventhTab);
  }

  const sideMenuArr = [
    {
      title: "Branch",
      clickFun: firstTabHandle,
      tab: firstTab,
      icon: "fa-solid pr-2 fa-code-branch fa-xl",
      name: "Branch",
      sub1Link: "/add-branch",
      sub2Link: "/view-branch",
      sub1Name: "Add Branch",
      sub2Name: "View Branch"
    },
    {
      title: "Courses",
      clickFun: secondTabHandle,
      tab: secondTab,
      icon: "fa-solid pr-2 fa-microchip fa-xl",
      name: "Courses",
      sub1Link: "/add-course",
      sub2Link: "/view-course",
      sub1Name: "Add Course",
      sub2Name: "View Course"
    },
    {
      title: "Follow Ups",
      clickFun: thirdTabHandle,
      tab: thirdTab,
      icon: "fa-solid fa-user-plus fa-xl",
      name: "Follow Ups",
      sub1Link: "/add-follow-ups",
      sub2Link: "/view-follow-ups",
      sub1Name: "Add FollowUps",
      sub2Name: "View FollowUps"
    },
    {
      title: "Inquiry",
      clickFun: fourthTabHandle,
      tab: fourthTab,
      icon: "fa-regular fa-circle-question fa-xl",
      name: "Inquiry",
      sub1Link: "/add-inquiry",
      sub2Link: "/view-inquiry",
      sub1Name: "Add Inquiry",
      sub2Name: "View Inquiry"
    },
    {
      title: "References",
      clickFun: fifthTabHandle,
      tab: fifthTab,
      icon: "fa-solid fa-asterisk fa-xl",
      name: "References",
      sub1Link: "/add-references",
      sub2Link: "/view-references",
      sub1Name: "Add References",
      sub2Name: "View References"
    },
    {
      title: "Role",
      clickFun: sixthTabHandle,
      tab: sixthTab,
      icon: "fa-solid fa-dice-d6 fa-xl",
      name: "Role",
      sub1Link: "/add-role",
      sub2Link: "/view-role",
      sub1Name: "Add Role",
      sub2Name: "View Role"
    },
    {
      title: "Status",
      clickFun: seventhTabHandle,
      tab: seventhTab,
      icon: "fa-solid fa-chart-simple fa-xl",
      name: "Status",
      sub1Link: "/add-status",
      sub2Link: "/view-status",
      sub1Name: "Add Status",
      sub2Name: "View Status"
    },
  ]

  return (
    <>
      <aside className={`h-screen ${expanded ? "w-60" : "w-12"} sticky top-0 left-0`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="h-16 py-4 px-3 flex justify-between items-center border-b-[1px]">
            <NavLink to={"/"} className={`text-2xl text-green-600 font-semibold ${expanded ? "block" : "hidden"}`}>Enquiry System</NavLink>
            <i className="fa-solid fa-bars cursor-pointer text-green-600" onClick={() => setExpanded(!expanded)}></i>
          </div>
          <NavLink to={"/profile"} title="Profile" className={`h-16 flex ${expanded ? "justify-start px-3" : "justify-center"} items-center gap-x-3 border-b-[1px]`}>
            <img src={user.image ? `${api}/images/${user.image}` : profile} className={`w-8 h-8 rounded-full`} alt="" />
            <p className={`text-xl capitalize tracking-wide font-semibold pr-0 ${expanded ? "block" : "hidden"}`}>{`${user.admin_name}`}</p>
          </NavLink>

          <ul className={`flex-1 ${expanded ? "px-3" : "px-1"} overflow-x-hidden overflow-y-auto mb-16`} onClick={() => liHandle()}>
            <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-green-600 hover:text-white`} title="Dashboard" onClick={() => {
              setFirstTab(false); setSecondTab(false); setThirdTab(false); setFourthTab(false); setFifthTab(false); setSixthTab(false); setExpanded(!expanded);
            }}>
              <NavLink to={"/"} className="w-52 sideLink"><i className="fa-solid pr-2 fa-gauge-high fa-xl"></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>Dashboard</span></NavLink>
            </li>
            {
              sideMenuArr.map((val, ind) => {
                return (
                  <div key={ind} title={val.title}>
                    <li className={`font-bold flex items-center p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-green-600 hover:text-white`} onClick={val.clickFun}>
                      <NavLink className="relative w-52 sideLink">
                        <i className={val.icon}></i> <span className={`overflow-hidden transition-all ${expanded ? "w-52" : "hidden"}`}>&nbsp;{val.name} <i className={`fa-solid fa-angle-${val.tab ? "up" : "down"} absolute left-44 top-1`}></i></span>
                      </NavLink>
                    </li>
                    <ul className={`submenu text-gray-500 font-normal my-1 mt-2 ${val.tab ? "" : "hidden"}`}>
                      <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={val.sub1Link}><i className="fa-solid fa-plus pr-2"></i> {val.sub1Name}</NavLink></li>
                      <li className={`ps-4 py-2 ${expanded ? "" : "hidden"}`} onClick={() => setExpanded(!expanded)}><NavLink to={val.sub2Link}><i className="fa-regular fa-eye pr-2"></i> {val.sub2Name}</NavLink></li>
                    </ul>
                  </div>
                )
              })
            }
          </ul>
          <div onClick={() => { Logout(); navigate("/") }} title="logout" className={`cursor-pointer bg-white fixed h-16 bottom-0 left-0 flex justify-center items-center shadow-md border-t-[1px] ${expanded ? "w-60" : "w-12"}`}>
            <button className={`flex items-center gap-x-2 px-3 py-1 rounded-md ${expanded ? "bg-red-600 text-white" : ""}`}>
              <i className={`fa-solid fa-power-off ${expanded ? " " : "hover:text-red-600 hover:scale-125"}`}></i>
              <span className={`${expanded ? "block" : "hidden"}`}>Log Out</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidenav;