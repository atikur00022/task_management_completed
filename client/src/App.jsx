import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NewPage from "./pages/NewPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";
import CompletedPage from "./pages/CompletedPage.jsx";
import CanceledPage from "./pages/CanceledPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import Page404 from "./pages/Page404.jsx";
import FullScreenLoader from "./layout/FullScreenLoader.jsx";
import {Bounce, ToastContainer} from "react-toastify";
import {getToken} from "./utility/SessionHelper.js";
import SendOTPPage from "./pages/AccountRecover/SendOTPPage.jsx";
import VerifyOTPPage from "./pages/AccountRecover/VerifyOTPPage.jsx";
import ResetPasswordPage from "./pages/AccountRecover/ResetPasswordPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const App = () => {

    if(getToken()){
        return (
            <>
                <BrowserRouter>
                    <ToastContainer position="bottom-center" theme="dark" transition={Bounce} autoClose={5000} />
                    <Routes>
                        <Route path='/' element={<DashboardPage />} />
                        <Route path='/create' element={<CreatePage />} />
                        <Route path='/all' element={<NewPage />} />
                        <Route path='/progress' element={<ProgressPage />} />
                        <Route path='/completed' element={<CompletedPage />} />
                        <Route path='/canceled' element={<CanceledPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/search/:keyword' element={<SearchPage />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
            </>
        );
    }else{
        return (
            <>
                <BrowserRouter>
                    <ToastContainer position="bottom-center" theme="dark" transition={Bounce} autoClose={5000} />
                    <Routes>
                        <Route path='/' element={<Navigate to='/login' replace/>} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/registration' element={<RegistrationPage />} />
                        <Route path='/sendotp' element={<SendOTPPage  />} />
                        <Route path='/verifyotp' element={<VerifyOTPPage  />} />
                        <Route path='/resetpassword' element={<ResetPasswordPage  />} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
                <FullScreenLoader/>
            </>
        );
    }


};

export default App;