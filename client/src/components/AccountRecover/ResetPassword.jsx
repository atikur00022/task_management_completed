import React, {useState} from 'react';
import {ThreeDots} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {ResetPasswordRequest} from "../../ApiRequest/ApiRequest.js";

const ResetPassword = () => {

    const navigate = useNavigate();

    const initialFormValue = { email: "", newPassword: "", otp: "" };
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

        }else if(ValidationHelper.IsEmpty(formValue.otp)){
            ValidationHelper.WarningToast("Otp code is required!");

        }else if(!ValidationHelper.IsNumber(formValue.otp)){
            ValidationHelper.WarningToast("Valid otp code is required!");

        }else if (ValidationHelper.IsEmpty(formValue.newPassword)) {
            ValidationHelper.WarningToast("New Password is required!");

        }else{

            try {
                setLoading(true);

                const res = await ResetPasswordRequest(formValue);

                setFormValue(initialFormValue);
                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    setTimeout(() => {
                        navigate('/login');
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
        <section className="resetpassword">
            <div className="container">
                <div className="card p-3 shadow-sm">
                    <div className="card-body">
                        <div className="text mb-5">
                            <h2 className="text-center">Set New Password</h2>
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
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword" className="form-label">New Password</label>
                                    <input value={formValue.newPassword}
                                           onChange={(e) => InputChange("newPassword", e.target.value)} type="password"
                                           className="form-control" id="exampleInputPassword"
                                           placeholder="Enter New Password..." aria-describedby="emailHelp"/>
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
                                                className="btn btn-success">Reset</button>
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

export default ResetPassword;