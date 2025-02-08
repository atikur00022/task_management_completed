import React from 'react';
import {Link} from "react-router-dom";
import {getUserDetails, removeSession} from "../utility/SessionHelper.js";
import {LuUserRound} from "react-icons/lu";
import {AiOutlineLogout} from "react-icons/ai";

const TopBar = () => {

    const userDetails = getUserDetails();

    if(userDetails === null){
        return null;
    }

    const logout = () => {
        removeSession()
    }

    return (
        <section className="topbar p-3 bg-light shadow-sm">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 d-flex align-items-center">
                        <Link to='/' className="dropdown-item topbar-title">
                            <span className="mx-2"><i className="bi bi-journal-text"></i></span>
                            <span>Task Management</span>
                        </Link>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                        <div className="profile">
                            <div className="dropdown-toggle" data-bs-toggle="dropdown"
                                 aria-expanded="false">
                                <img
                                    alt="profile-image"
                                    src={userDetails.photo}/>
                            </div>
                            <ul className="dropdown-menu dropdown-menu-dark shadow mt-1 pb-3">
                                <div className="text-center mt-3">
                                    <img
                                        alt="profile-image"
                                        src={userDetails.photo}/>
                                    <h5 className="mt-2">{`${userDetails.firstName} ${userDetails.lastName}`}</h5>
                                </div>
                                <hr/>
                                <div className="d-flex align-items-center mx-3 mt-2">
                                    <LuUserRound/>
                                    <li><Link to='/profile' className="dropdown-item">Profile</Link></li>
                                </div>
                                <div className="d-flex align-items-center mx-3 mt-2">
                                    <AiOutlineLogout/>
                                    <li><Link onClick={logout} to='/' className="dropdown-item">Logout</Link></li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopBar;