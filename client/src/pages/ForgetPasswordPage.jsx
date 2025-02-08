import React, {lazy, Suspense} from 'react';
import LazyLoader from "../layout/LazyLoader.jsx";

const ForgetPassword = lazy(() => import("../components/ForgetPassword/ForgetPassword.jsx"));

const ForgetPasswordPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <ForgetPassword/>
            </Suspense>
        </div>
    );
};

export default ForgetPasswordPage;