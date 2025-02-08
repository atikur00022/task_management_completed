import axios from "axios";
import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/stateSlice/SettingSlice.js";
import {getToken, setToken, setUserDetails} from "../utility/SessionHelper.js";
import {setCanceledTask, setCompletedTask, setNewTask, setProgressTask} from "../redux/stateSlice/TaskSlice.js";
import {setSummary} from "../redux/stateSlice/SummarySlice.js";
import validationHelper from "../utility/ValidationHelper.js";
import {setProfile} from "../redux/stateSlice/ProfileSlice.js";
import {clearSearchResult, setSearchResult} from "../redux/stateSlice/SearchResultSlice.js";

const BASE_URL = 'http://localhost:8000/api/v1';

// Registration
export const RegistrationRequest = async (postBody) => {
    store.dispatch(showLoader());
    const url = BASE_URL + '/Registration';
    try {
        let res = await axios.post(url, postBody);
        store.dispatch(hideLoader());


        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                return { status: 'success', message: res.data['message'] };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
};

// Login
export const LoginRequest = async (postBody) => {
    store.dispatch(showLoader());
    const url = BASE_URL + '/Login';
    try {
        let res = await axios.post(url, postBody);
        store.dispatch(hideLoader());


        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                setToken(res.data['data']['token']);
                setUserDetails(res.data['data']['userDetails']);
                return { status: 'success', message: res.data['message'] };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
}

// Create Task
export const NewTaskRequest = async (postBody) => {
    store.dispatch(showLoader());
    const url = BASE_URL + "/CreateTask";

    try {

        let res = await axios.post(url, postBody, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {
            if (res.data["status"] === "fail") {
                return { status: "fail", message: res.data["message"] };
            } else {
                return { status: "success", message: res.data["message"] };
            }
        } else {
            return { status: "fail", message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());

        // Check if the error is specifically a 401 error
        if (e.response && e.response.status === 401) {
            return { status: "fail", message: "User Unauthorized" };
        }

        return { status: "error", message: e.toString() };
    }
};

// Task List By Status
export const TaskListByStatusRequest = async (status) => {
    // store.dispatch(clearSearchResult())
    store.dispatch(showLoader());
    const url = `${BASE_URL}/ViewTask/${status}`;

    try {
        let res = await axios.get(url, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {
            if (status === "new") {
                store.dispatch(setNewTask(res.data['data']));
            } else if (status === "completed") {
                store.dispatch(setCompletedTask(res.data['data']));
            } else if (status === "progress") {
                store.dispatch(setProgressTask(res.data['data']));
            } else if (status === "canceled") {
                store.dispatch(setCanceledTask(res.data['data']));
            }
        } else {
            return { status: "fail", message: "Something went wrong!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());

        if (e.response && e.response.status === 401) {
            return { status: "fail", message: "User Unauthorized" };
        }

        return { status: "error", message: e.toString() };
    }
};

// Dashboard Summary
export const SummaryRequest = async () => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/CountTask`;

    try {
        let res = await axios.get(url, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {
            store.dispatch(setSummary(res.data['data']));
        } else {
            return { status: "fail", message: "Something went wrong!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());

        if (e.response && e.response.status === 401) {
            return { status: "fail", message: "User Unauthorized" };
        }

        return { status: "error", message: e.toString() };
    }
};

// Delete Task
export const DeleteTaskRequest = async (id) => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/DeleteTask/${id}`;

    try {
        let res = await axios.get(url, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {
            validationHelper.SuccessToast(res.data['message']);
        } else {
            validationHelper.ErrorToast(res.data['message']);
        }
    } catch (e) {
        store.dispatch(hideLoader());

        if (e.response && e.response.status === 401) {
            validationHelper.ErrorToast("User Unauthorized");
        }

        return { status: "error", message: e.toString() };
    }
};

// Update Task
export const UpdateTaskRequest = async (id, status) => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/UpdateTaskStatus/${id}/${status}`;

    try {
        let res = await axios.get(url, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {
            validationHelper.SuccessToast(res.data['message']);
        } else {
            validationHelper.ErrorToast(res.data['message']);
        }
    } catch (e) {
        store.dispatch(hideLoader());

        if (e.response && e.response.status === 401) {
            validationHelper.ErrorToast("User Unauthorized");
        }

        return { status: "error", message: e.toString() };
    }
};

// Profile Details
export const ProfileDetailRequest = async () => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/ProfileDetails`;

    try {
        let res = await axios.get(url, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {
            store.dispatch(setProfile(res.data['data'][0]));
        } else {
            validationHelper.ErrorToast(res.data['message']);
        }
    } catch (e) {
        store.dispatch(hideLoader());

        if (e.response && e.response.status === 401) {
            validationHelper.ErrorToast("User Unauthorized");
        }

        return { status: "error", message: e.toString() };
    }
};

// Profile Update
export const ProfileUpdateRequest = async (id, postBody) => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/ProfileUpdate/${id}`;

    const { firstName, lastName, email, mobile, photo } = postBody;
    const userDetails = { "email": email, "firstName": firstName, "lastName": lastName, "mobile": mobile, "photo": photo };

    try {
        let res = await axios.post(url, postBody, {
            headers: { "token": getToken() },
            responseType: "json"
        });
        store.dispatch(hideLoader());


        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                setUserDetails(userDetails);
                return { status: 'success', message: res.data['message'] };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
};

// Send Otp
export const SendOtpRequest = async (email) => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/SendOtp/${email}`;

    try {
        let res = await axios.post(url, {}, {
            headers: { "token": getToken() },
            responseType: "json"
        });
        store.dispatch(hideLoader());


        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                return { status: 'success', message: res.data['message'] };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
};

// Verify Otp
export const VerifyOtpRequest = async (postBody) => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/VerifyOtp`;

    try {
        let res = await axios.post(url, postBody, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                return { status: 'success', message: res.data['message'] };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
};

// Reset Password
export const ResetPasswordRequest = async (postBody) => {
    store.dispatch(showLoader());
    const url = `${BASE_URL}/ResetPassword`;

    try {
        let res = await axios.post(url, postBody, {
            headers: { "token": getToken() },
            responseType: "json"
        });

        store.dispatch(hideLoader());

        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                return { status: 'success', message: res.data['message'] };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
};

// Search Keyword
export const SearchKeyWordRequest = async (keyword) => {
    console.log('api request', keyword)
    store.dispatch(showLoader());
    const url = `${BASE_URL}/SearchTask/${keyword}`;

    try {
        let res = await axios.get(url,  {
            headers: { "token": getToken() },
            responseType: "json"
        });

        console.log('api request', res.data)

        store.dispatch(hideLoader());

        if (res.status === 200) {

            if (res.data['status'] === 'fail') {
                return { status: 'fail', message: res.data['message'] };
            } else {
                store.dispatch(setSearchResult(res.data['data']));
                return {
                    status: 'success',
                    message: res.data['message'],
                    data: res.data['data']  // ✅ Ensure data is included here
                };
            }

        } else {

            return { status: 'fail', message: "Unexpected HTTP response!" };
        }
    } catch (e) {
        store.dispatch(hideLoader());
        return { status: 'error', message: e.toString() };
    }
};



















