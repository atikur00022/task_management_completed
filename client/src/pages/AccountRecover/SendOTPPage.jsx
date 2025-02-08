import React, {Suspense} from 'react';
import LazyLoader from "../../layout/LazyLoader.jsx";
import SendOTP from "../../components/AccountRecover/SendOTP.jsx"

const SendOtpPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <SendOTP/>
            </Suspense>
        </div>
    );
};

export default SendOtpPage;