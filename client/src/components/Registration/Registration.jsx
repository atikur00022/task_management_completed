import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {RegistrationRequest} from "../../ApiRequest/ApiRequest.js";
import { ThreeDots } from 'react-loader-spinner';

const Registration = () => {

    const navigate = useNavigate();

    const initialFormValue = { firstName: "", lastName: "", email: "", mobile: "", password: "" };
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

        if(ValidationHelper.IsEmpty(formValue.firstName)){
            ValidationHelper.WarningToast("First name is required!");

        }else if(ValidationHelper.IsEmpty(formValue.lastName)){
            ValidationHelper.WarningToast("Last name is required!");

        }else if(!ValidationHelper.IsEmail(formValue.email)){
            ValidationHelper.WarningToast("Valid email is required!");

        }else if(ValidationHelper.IsEmpty(formValue.mobile)){
            ValidationHelper.WarningToast("Contact number is required!");

        }else if (!ValidationHelper.IsNumber(formValue.mobile)) {
            ValidationHelper.WarningToast("Contact number must be a valid number!");

        }else if (ValidationHelper.IsEmpty(formValue.password)) {
            ValidationHelper.WarningToast("Password is required!");

        }else{

            try {
                setLoading(true);

                const res = await RegistrationRequest(formValue);

                setFormValue(initialFormValue);
                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    navigate('/login');
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
        <section className="registration">
            <div className="container">
                <div className="card p-3 shadow-sm">
                    <div className="card-body">
                        <div className="text mb-5">
                            <h2 className="text-center">Registration</h2>
                            <p className="text-center">Share your valuable opinion with us.</p>
                        </div>
                        <div className="contact-box">
                            <form onSubmit={formSubmit}>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputFirstName" className="form-label">First
                                                Name</label>
                                            <input value={formValue.firstName}
                                                   onChange={(e) => InputChange("firstName", e.target.value)} type="text" className="form-control" id="exampleInputFirstName"
                                                   placeholder="Enter First Name..." aria-describedby="emailHelp"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputLastName" className="form-label">Last
                                                Name</label>
                                            <input value={formValue.lastName}
                                                   onChange={(e) => InputChange("lastName", e.target.value)} type="text" className="form-control" id="exampleInputLastName"
                                                   placeholder="Enter Last Name..." aria-describedby="emailHelp"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail" className="form-label">Email
                                                Address</label>
                                            <input value={formValue.email}
                                                   onChange={(e) => InputChange("email", e.target.value)} type="text" className="form-control" id="exampleInputEmail"
                                                   placeholder="Enter Email..." aria-describedby="emailHelp"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputContactNumber" className="form-label">Contact
                                                Number</label>
                                            <input value={formValue.mobile}
                                                   onChange={(e) => InputChange("mobile", e.target.value)} type="text" className="form-control" id="exampleInputContactNumber"
                                                   placeholder="Enter Number..." aria-describedby="emailHelp"/>
                                        </div>
                                    </div>
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
                                        <button aria-label="register button" type="submit"
                                                className="btn btn-success">Register
                                        </button>
                                    )
                                }

                            </form>
                            <div className="regis mt-1">
                            <Link to="/login" className="">Already have account?</Link>
                                <Link to="/login" className=""> Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;