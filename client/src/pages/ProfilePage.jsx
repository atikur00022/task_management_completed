import React, {lazy, Suspense, useEffect} from 'react';
import LazyLoader from "../layout/LazyLoader.jsx";
import Layout from "../layout/Layout.jsx";
import {ProfileDetailRequest} from "../ApiRequest/ApiRequest.js";

const Profile = lazy(() => import("../components/Profile/Profile.jsx"));

const ProfilePage = () => {

    useEffect(() => {
        (async () => {
            await ProfileDetailRequest();
        })()
    }, []);

    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <Profile/>
            </Suspense>
        </Layout>
    );
};

export default ProfilePage;