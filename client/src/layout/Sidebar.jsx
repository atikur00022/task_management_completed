import React from 'react';
import {NavLink} from "react-router-dom";
import {MdDashboard, MdOutlineCancelPresentation} from "react-icons/md";
import {AiOutlineEdit} from "react-icons/ai";
import {FaTasks} from "react-icons/fa";
import {GrInProgress} from "react-icons/gr";
import {FaRegCircleCheck} from "react-icons/fa6";

const Sidebar = () => {
    return (
        <section className="sidebar bg-light vh-100 p-3">
            <div className="container-fluid">
                <div className="menu">
                    <NavLink to="/" className={(navData) => navData.isActive ? "active-color" : "not-active-color"}>
                        <MdDashboard />
                        <span className="mx-4">Dashboard</span>
                    </NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/create" className={(navData) => navData.isActive ? "active-color" : "not-active-color"}>
                        <AiOutlineEdit />
                        <span className="mx-4">Create New</span>
                    </NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/all" className={(navData) => navData.isActive ? "active-color" : "not-active-color"}>
                        <FaTasks />
                        <span className="mx-4">New Task</span>
                    </NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/progress" className={(navData) => navData.isActive ? "active-color" : "not-active-color"}>
                        <GrInProgress />
                        <span className="mx-4">Progress</span>
                    </NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/completed" className={(navData) => navData.isActive ? "active-color" : "not-active-color"}>
                        <FaRegCircleCheck />
                        <span className="mx-4">Completed</span>
                    </NavLink>
                </div>
                <div className="menu">
                    <NavLink to="/canceled" className={(navData) => navData.isActive ? "active-color" : "not-active-color"}>
                        <MdOutlineCancelPresentation />
                        <span className="mx-4">Canceled</span>
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;