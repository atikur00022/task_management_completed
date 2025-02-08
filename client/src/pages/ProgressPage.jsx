import React, {lazy, Suspense} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";

const Progress = lazy(() => import("../components/Progress/Progress.jsx"));

const ProgressPage = () => {
    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <Progress/>
            </Suspense>
        </Layout>
    );
};

export default ProgressPage;