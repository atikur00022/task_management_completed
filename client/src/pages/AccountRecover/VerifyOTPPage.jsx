import React, {Suspense} from 'react';
import LazyLoader from "../../layout/LazyLoader.jsx";
import VerifyOTP from "../../components/AccountRecover/VerifyOTP.jsx";

const VerifyOtpPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <VerifyOTP/>
            </Suspense>
        </div>
    );
};

export default VerifyOtpPage;