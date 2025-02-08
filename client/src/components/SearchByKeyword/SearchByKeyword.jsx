import React, {useState} from 'react';
import ValidationHelper from "../../utility/ValidationHelper.js";
import {SearchKeyWordRequest, TaskListByStatusRequest} from "../../ApiRequest/ApiRequest.js";
import {Link, useLocation} from "react-router-dom";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {CiEdit} from "react-icons/ci";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useSelector} from "react-redux";
import {DeleteAlert} from "../../utility/DeleteAlert.js";
import {UpdateAlert} from "../../utility/UpdateAlert.js";

const SearchByKeyword = () => {

    const location = useLocation();
    const pathStatus = location.pathname.replace("/", "");

    const [keyword, setKeyword] = useState('');

    const submitSearchKeyword = async () => {

        if(ValidationHelper.IsEmpty(keyword)){
            ValidationHelper.WarningToast("Input is required!");
        }else {
            try {
                ValidationHelper.SuccessToast("Task found successfully!");
            } catch (e) {
                ValidationHelper.ErrorToast("Something went wrong!");
            }
        }
    }

    const SearchResults = useSelector((state) => state.searchResult.results);
    console.log('serach result', SearchResults);

    const deleteItem = async (id) => {
        console.log("delete", id);
        await DeleteAlert(id);
        await TaskListByStatusRequest(SearchResults[0]["status"]);
    };

    const updateItem = async (id, status) => {
        console.log("update", id);
        console.log("update status", status);
        await UpdateAlert(id, status);
        await TaskListByStatusRequest(SearchResults[0]["status"]);
    };

    return (

        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-12 col-lg-9">
                    <h4>
                        Task{" "}
                        {SearchResults.length > 0
                            ? SearchResults[0]["status"].charAt(0).toUpperCase() + SearchResults[0]["status"].slice(1)
                            : pathStatus
                                ? pathStatus.charAt(0).toUpperCase() + pathStatus.slice(1)
                                : "New"}
                    </h4>

                </div>
                <div className="col-12 col-lg-3">
                    <div className="input-group mb-3">
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Search.."
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                        />
                        <Link to={keyword.length > 0 ? `/search/${keyword}` : `/`}>
                            <button onClick={submitSearchKeyword} className="btn btn-outline-secondary" type="button"
                                    id="button-addon1">
                                Search
                            </button>
                        </Link>
                    </div>
                </div>
                {SearchResults.map((item, index) => (
                    <div key={index.toString()} className="col-12 col-lg-4 col-sm-6 col-md-4 p-2">
                        <div className="card h-100 shadow">
                            <div className="card-body">
                                <h6 className="fw-bold">{item["title"]}</h6>
                                <p>{item["description"]}</p>
                                <div className="m-0 p-0">
                                    <MdOutlineCalendarMonth/> {item["createdAt"]}
                                    <a
                                        onClick={() => updateItem(item["_id"], item["status"])}
                                        className="icon-nav text-primary mx-1"
                                    >
                                        <CiEdit/>
                                    </a>
                                    <a
                                        onClick={() => deleteItem(item["_id"])}
                                        className="icon-nav text-primary mx-1"
                                    >
                                        <RiDeleteBin6Line/>
                                    </a>
                                    <span
                                        className={`badge float-end ${
                                            item["status"] === "completed"
                                                ? "bg-success"
                                                : item["status"] === "progress"
                                                    ? "bg-info"
                                                    : item["status"] === "canceled"
                                                        ? "bg-danger"
                                                        : "bg-primary"
                                        }`}
                                    >
                                      {item["status"].charAt(0).toUpperCase() + item["status"].slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchByKeyword;