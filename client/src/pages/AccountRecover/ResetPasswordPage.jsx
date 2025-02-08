import React, {Suspense} from 'react';
import LazyLoader from "../../layout/LazyLoader.jsx";
import ResetPassword from "../../components/AccountRecover/ResetPassword.jsx";

const ResetPasswordPage = () => {
    return (
        <div>
            <Suspense  fallback={<LazyLoader/>}>
                <ResetPassword/>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;