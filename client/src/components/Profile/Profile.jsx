import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ThreeDots} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import validationHelper from "../../utility/ValidationHelper.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import {ProfileUpdateRequest} from "../../ApiRequest/ApiRequest.js";

const Profile = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const userImageRef = useRef(null);
    const profileRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const passwordRef = useRef(null);

    const UserDetails = useSelector((state) => state.profile.value);
    // console.log('user profile details for redux', UserDetails)

    const ProfileImagePreview = () => {
        const ImageFile = profileRef.current.files[0];
        validationHelper.getBase64(ImageFile).then((result) => {
            userImageRef.current.src = result;
        });
    }

    const formSubmit = async (e) => {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const mobile = mobileRef.current.value;
        const password = passwordRef.current.value;
        const photo = userImageRef.current.src;

        const postBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            password: password,
            photo: photo,
        }

        // console.log("postbody", postBody);

        if(ValidationHelper.IsEmpty(firstName)){
            ValidationHelper.WarningToast("First name is required!");

        }else if(ValidationHelper.IsEmpty(lastName)){
            ValidationHelper.WarningToast("Last name is required!");

        }else if(!ValidationHelper.IsEmail(email)){
            ValidationHelper.WarningToast("Valid email is required!");

        }else if(ValidationHelper.IsEmpty(mobile)){
            ValidationHelper.WarningToast("Contact number is required!");

        }else if (!ValidationHelper.IsNumber(mobile)) {
            ValidationHelper.WarningToast("Contact number must be a valid number!");

        }else if (ValidationHelper.IsEmpty(password)) {
            ValidationHelper.WarningToast("Password is required!");

        }else{

            try {
                setLoading(true);

                const res = await ProfileUpdateRequest(UserDetails["_id"], postBody);

                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    navigate('/');
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
        <section className="profile">
            <div className="container">
                <div className="card p-3 shadow mt-5">
                    <div className="card-body">
                        <div className="text mb-5">
                            <img ref={userImageRef} src={UserDetails['photo']} alt="image"/>
                            <hr/>
                        </div>
                        <div className="contact-box">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputFirstName" className="form-label">Profile Picture</label>
                                        <input ref={profileRef}
                                               onChange={ProfileImagePreview}
                                               type="file" className="form-control" id="exampleInputFirstName"
                                               placeholder="Enter First Name..." aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputFirstName" className="form-label">First
                                            Name</label>
                                        <input key={Date.now()} defaultValue={UserDetails['firstName']} ref={firstNameRef}
                                               type="text" className="form-control" id="exampleInputFirstName"
                                               placeholder="Enter First Name..." aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputLastName" className="form-label">Last
                                            Name</label>
                                        <input key={Date.now()} defaultValue={UserDetails['lastName']} ref={lastNameRef}
                                               type="text"
                                               className="form-control" id="exampleInputLastName"
                                               placeholder="Enter Last Name..." aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label">Email
                                            Address</label>
                                        <input key={Date.now()} disabled={true} defaultValue={UserDetails['email']}
                                               ref={emailRef} type="text"
                                               className="form-control" id="exampleInputEmail"
                                               placeholder="Enter Email..." aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputContactNumber" className="form-label">Contact
                                            Number</label>
                                        <input key={Date.now()} defaultValue={UserDetails['mobile']}
                                               ref={mobileRef} type="text"
                                               className="form-control" id="exampleInputContactNumber"
                                               placeholder="Enter Number..." aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                    <input key={Date.now()} defaultValue={UserDetails['password']}
                                           ref={passwordRef} type="password"
                                           className="form-control" id="exampleInputPassword"
                                           placeholder="Enter Password..." aria-describedby="emailHelp"/>
                                </div>
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
                                    <div className="d-grid gap-2 col-6 mt-3">
                                        <button onClick={formSubmit} className="btn btn-primary register" type="button">Update</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;