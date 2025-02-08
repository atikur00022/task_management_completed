import React, {lazy, Suspense} from 'react';
import LazyLoader from "../layout/LazyLoader.jsx";

const Registration = lazy(() => import("../components/Registration/Registration.jsx"));

const RegistrationPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <Registration/>
            </Suspense>
        </div>
    );
};

export default RegistrationPage;