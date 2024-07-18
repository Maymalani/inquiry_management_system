import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import Topnav from "./components/Topnav";
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login";
import { useAuth } from "./store/auth";
import Profile from "./pages/Profile";
import AddBranch from "./pages/AddBranch";
import ViewBranch from "./pages/ViewBranch";
import AddCourse from "./pages/AddCourse";
import ViewCourse from "./pages/ViewCourse";
import AddFollowUps from "./pages/AddFollowUps";
import ViewFollowUps from "./pages/ViewFollowUps";
import AddInquiry from "./pages/AddInquiry";
import ViewInquiry from "./pages/ViewInquiry";
import AddReferences from "./pages/AddReferences";
import ViewReferences from "./pages/ViewReferences";
import AddRoles from "./pages/AddRoles";
import ViewRoles from "./pages/ViewRoles";
import ViewStatus from "./pages/ViewStatus";
import AddStatus from "./pages/AddStatus";

function App() {

  const [expanded, setExpanded] = useState(false);

  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ?
        <>
          <div className="flex">
            <Sidenav expanded={expanded} setExpanded={setExpanded} />
            <div className="h-screen overflow-y-auto overflow-x-hidden" style={{ width: expanded ? `calc(100% - 15rem)` : `calc(100% - 3rem)` }}>
              <Topnav expanded={expanded} setExpanded={setExpanded} />
              <div className="px-3">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add-branch" element={<AddBranch />} />
                  <Route path="/view-branch" element={<ViewBranch />} />
                  <Route path="/add-course" element={<AddCourse />} />
                  <Route path="/view-course" element={<ViewCourse />} />
                  <Route path="/add-follow-ups" element={<AddFollowUps />} />
                  <Route path="/view-follow-ups" element={<ViewFollowUps />} />
                  <Route path="/add-inquiry" element={<AddInquiry />} />
                  <Route path="/view-inquiry" element={<ViewInquiry />} />
                  <Route path="/add-references" element={<AddReferences />} />
                  <Route path="/view-references" element={<ViewReferences />} />
                  <Route path="/add-role" element={<AddRoles />} />
                  <Route path="/view-role" element={<ViewRoles />} />
                  <Route path="/add-status" element={<AddStatus />} />
                  <Route path="/view-status" element={<ViewStatus />} />
                </Routes>
              </div>
            </div>
          </div>
        </> : <Login />}
    </>
  );
}

export default App;
