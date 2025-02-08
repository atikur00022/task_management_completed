import React, {useState} from 'react';
import ValidationHelper from "../../utility/ValidationHelper.js";
import {NewTaskRequest} from "../../ApiRequest/ApiRequest.js";
import {ThreeDots} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";

const Create = () => {

    const navigate = useNavigate();

    const initialFormValue = { title: "", description: "" };
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

        if(ValidationHelper.IsEmpty(formValue.title)){
            ValidationHelper.WarningToast("Task field is required!");

        }else if (ValidationHelper.IsEmpty(formValue.description)) {
            ValidationHelper.WarningToast("Description field is required!");

        }else{

            try {
                setLoading(true);

                const res = await NewTaskRequest(formValue);

                setFormValue(initialFormValue);
                setLoading(false);

                if (res.status === 'fail') {
                    ValidationHelper.ErrorToast(res.message);
                } else if (res.status === 'success') {
                    ValidationHelper.SuccessToast(res.message);
                    navigate('/all');
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
        <div className="create">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-8 col-sm-12 col-md-8 p-2">
                    <div className="card p-2 shadow-sm">
                        <div className="card-body">
                            <h4>Create New</h4>
                            <br/>
                            <form onSubmit={formSubmit}>
                                <input value={formValue.title}
                                       onChange={(e) => InputChange("title", e.target.value)} type="text" className="form-control mb-3" placeholder="Task Name.."/>
                                <textarea value={formValue.description}
                                          onChange={(e) => InputChange("description", e.target.value)} rows={5} className="form-control mb-3" placeholder="Task Description.."/>
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
                                        <button className="btn btn-primary">Create</button>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;