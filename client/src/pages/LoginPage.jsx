import React, {lazy, Suspense} from 'react';
import LazyLoader from "../layout/LazyLoader.jsx";

const Login = lazy(() => import("../components/Login/Login.jsx"));

const LoginPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <Login/>
            </Suspense>
        </div>
    );
};

export default LoginPage;