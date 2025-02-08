import React, {useState} from 'react';
import {ThreeDots} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {SendOtpRequest} from "../../ApiRequest/ApiRequest.js";

const SendOtp = () => {

    const navigate = useNavigate();

    const initialFormValue = { email: "" };
    const [formValue, setFormValue] = useState(initialFormValue);
    const [loading, setLoading] = useState(false);

    const InputChange = (InputName, InputValue) => {
        setFormValue((FormValues) => ({
            ...FormValues,
            [InputName]: InputValue,
        }));
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        if(!ValidationHelper.IsEmail(formValue.email)){
            ValidationHelper.WarningToast("Valid email is required!");

        }else{

            try {
                setLoading(true);

                const res = await SendOtpRequest(formValue.email);

                setFormValue(initialFormValue);
                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    setTimeout(() => {
                        navigate('/verifyotp')
                    }, 1000);
                } else {
                    ValidationHelper.ErrorToast("Unexpected response!");
                }
            } catch (e) {
                setLoading(false);
                ValidationHelper.ErrorToast("Something went wrong!");
            }
        }
    }

    return (
        <section className="sendOtp">
            <div className="container">
                <div className="card p-3 shadow-sm">
                    <div className="card-body">
                        <div className="text mb-5">
                            <h2 className="text-center">Email Address</h2>
                        </div>
                        <div className="contact-box">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail" className="form-label">Email
                                        Address</label>
                                    <input value={formValue.email}
                                           onChange={(e) => InputChange("email", e.target.value)} type="email"
                                           className="form-control" id="exampleInputEmail"
                                           placeholder="Enter Email..." aria-describedby="emailHelp"/>
                                </div>
                                {
                                    loading ? (
                                        <ThreeDots
                                            visible={true}
                                            height="50"
                                            width="50"
                                            color="#cb0c9f"
                                            radius="9"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    ) : (
                                        <button aria-label="login button" type="submit"
                                                className="btn btn-success">Next</button>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SendOtp;