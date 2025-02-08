import React, {useEffect} from 'react';
import {MdOutlineCalendarMonth} from "react-icons/md";
import {CiEdit} from "react-icons/ci";
import {RiDeleteBin6Line} from "react-icons/ri";
import {TaskListByStatusRequest} from "../../ApiRequest/ApiRequest.js";
import {useSelector} from "react-redux";
import {DeleteAlert} from "../../utility/DeleteAlert.js";
import {UpdateAlert} from "../../utility/UpdateAlert.js";
import SearchByKeyword from "../SearchByKeyword/SearchByKeyword.jsx";

const Progress = () => {

    useEffect(() => {
        (async () => {
            await TaskListByStatusRequest("progress");
        })()
    },[]);

    const ProgressList = useSelector((state) => state.task.progress);

    const deleteItem = async (id) => {
        await DeleteAlert(id);
        await TaskListByStatusRequest("progress");
    }

    const updateItem = async (id, status) => {
        await UpdateAlert(id, status);
        await TaskListByStatusRequest("progress");
    }

    return (
        <section className="completed">
            <SearchByKeyword/>
            <div className="container-fluid">
                {/* ✅ Check if NewList is empty */}
                {ProgressList.length === 0 ? (
                    <div className="d-flex justify-content-center mt-5">
                        <div className="w-50 alert alert-warning fs-5 d-flex justify-content-center" role="alert">
                            No data is available!
                        </div>
                    </div>

                ) : (
                    <div className="row">
                        {ProgressList.map((item, index) => (
                            <div key={index.toString()} className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                                <div className="card h-100 shadow">
                                    <div className="card-body">
                                        <h6 className="fw-bold">{item["title"]}</h6>
                                        <p>{item["description"]}</p>
                                        <div className="m-0 p-0">
                                            <MdOutlineCalendarMonth /> {item["createdAt"]}
                                            <a
                                                onClick={() => updateItem(item["_id"], item["status"])}
                                                className="icon-nav text-primary mx-1"
                                            >
                                                <CiEdit />
                                            </a>
                                            <a
                                                onClick={() => deleteItem(item["_id"])}
                                                className="icon-nav text-primary mx-1"
                                            >
                                                <RiDeleteBin6Line />
                                            </a>
                                            <span className="badge float-end bg-info">{item["status"]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Progress;