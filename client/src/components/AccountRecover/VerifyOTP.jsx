import React, {useState} from 'react';
import {ThreeDots} from "react-loader-spinner";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {LoginRequest, VerifyOtpRequest} from "../../ApiRequest/ApiRequest.js";
import {useNavigate} from "react-router-dom";

const VerifyOTP = () => {

    const navigate = useNavigate();

    const initialFormValue = {email: "", otp: "" };
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

        } else if(ValidationHelper.IsEmpty(formValue.otp)){
            ValidationHelper.WarningToast("Otp code is required!");

        }else if(!ValidationHelper.IsNumber(formValue.otp)){
            ValidationHelper.WarningToast("Valid otp code is required!");
        }
        else{

            try {
                setLoading(true);

                const res = await VerifyOtpRequest(formValue);

                setFormValue(initialFormValue);
                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    setTimeout(() => {
                        navigate('/resetpassword');
                    }, 2000);
                } else {
                    ValidationHelper.ErrorToast("Unexpected response from server!");
                }
            } catch (e) {
                setLoading(false);
                ValidationHelper.ErrorToast("Something went wrong!");
            }
        }
    }

    return (
        <section className="verifyOtp">
            <div className="container">
                <div className="card p-3 shadow-sm">
                    <div className="card-body">
                        <div className="text mb-5">
                            <h2 className="text-center">Verify Your OTP Code</h2>
                            <p className="text-center">An OTP code is send to your email. Please check your email. </p>
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
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail" className="form-label">OTP Verification</label>
                                    <input value={formValue.otp}
                                           onChange={(e) => InputChange("otp", e.target.value)} type="text"
                                           className="form-control" id="exampleInputEmail"
                                           placeholder="Enter Otp code..." aria-describedby="emailHelp"/>
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

export default VerifyOTP;