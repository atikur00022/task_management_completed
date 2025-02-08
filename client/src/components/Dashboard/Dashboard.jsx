import React, { useEffect } from 'react';
import { SummaryRequest } from "../../ApiRequest/ApiRequest.js";
import { useSelector } from "react-redux";

const Dashboard = () => {
    useEffect(() => {
        (async () => {
            await SummaryRequest();
        })();
    }, []);

    const summaryList = useSelector((state) => state.summary.value);

    return (
        <section className="dashboard">
            <div className="container">
                <div className="row mt-2">
                    {summaryList.length === 0 ? (
                        <div className="d-flex justify-content-center mt-5">
                            <div className="w-50 alert alert-warning fs-5 d-flex justify-content-center" role="alert">
                                No data is available!
                            </div>
                        </div>
                    ) : (
                        summaryList.map((item, index) => (
                            <div key={index.toString()} className="col-12 col-lg-3 col-sm-6 col-md-3 p-2">
                                <div className="card mt-4 shadow px-2">
                                    <div className="card-body">
                                        <h5>Total {item['_id']}</h5>
                                        <p className='mt-3'>{item['total']}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
