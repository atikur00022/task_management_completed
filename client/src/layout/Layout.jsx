import React from 'react';
import TopBar from "./TopBar.jsx";
import Sidebar from "./Sidebar.jsx";
import {AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";
import logo from "../assets/images/logo.png";
import {NavLink} from "react-router-dom";

const Layout = (props) => {
    return (
        <>
            <TopBar/>
            <div className="adminSidebar">
                <div className="row">
                    <div className="box1 col-lg-2">
                        <Sidebar/>
                    </div>
                    <div className="box2 col-lg-10">
                        {props.children}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Layout;