import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {LoginRequest} from "../../ApiRequest/ApiRequest.js";
import {ThreeDots} from "react-loader-spinner";

const Login = () => {

    const initialFormValue = { email: "", password: "" };
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

        }else if (ValidationHelper.IsEmpty(formValue.password)) {
            ValidationHelper.WarningToast("Password is required!");

        }else{

            try {
                setLoading(true);

                const res = await LoginRequest(formValue);

                setFormValue(initialFormValue);
                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
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
        <section className="login">
            <div className="container">
                <div className="card p-3 shadow-sm">
                    <div className="card-body">
                        <div className="text mb-5">
                            <h2 className="text-center">Login</h2>
                            <p className="text-center">Share your valuable opinion with us.</p>
                        </div>
                        <div className="contact-box">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail" className="form-label">Email
                                        Address</label>
                                    <input value={formValue.email}
                                           onChange={(e) => InputChange("email", e.target.value)} type="email" className="form-control" id="exampleInputEmail"
                                           placeholder="Enter Email..." aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                    <input value={formValue.password}
                                           onChange={(e) => InputChange("password", e.target.value)} type="password" className="form-control" id="exampleInputPassword"
                                           placeholder="Enter Password..." aria-describedby="emailHelp"/>
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
                                                className="btn btn-success">Login</button>
                                    )
                                }
                            </form>
                            <div className="regis mt-1">
                                <Link to="/registration" className="">Registration.</Link>
                                <Link to="/sendotp" className=""> Forget Password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;