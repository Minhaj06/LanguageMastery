import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { FaEdit, FaHome, FaList, FaUpload } from "react-icons/fa";
import Title from "../components/title/Title";

const InstructorDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Title title={"Instructor Dashboard"} />
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`sidebar px-2 pb-4 bg-base-200 min-h-screen pt-32 overflow-hidden shrink-0 ${
            sidebarOpen ? "w-72" : "w-0 hidden"
          }`}
        >
          <ul className="menu px-1 s">
            <li>
              <NavLink to={`/`} className="text-xl">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/instructor/`} className="text-xl">
                <FaList />
                All Classes
              </NavLink>
            </li>
            <li>
              <NavLink to={`add-class`} className="text-xl">
                <FaUpload />
                Add Class
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-grow overflow-hidden min-h-screen bg-slate-200 dark:bg-slate-800 pt-32 p-8 relative">
          <button
            className="absolute top-24 left-0 z-10 bg-gray-800 dark:bg-white text-white dark:text-gray-800 p-2 rounded-full shadow-lg"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" y1="3" x2="3" y2="21" />
                <line x1="3" y1="3" x2="21" y2="21" />
              </svg>
            )}
          </button>
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default InstructorDashboardLayout;
