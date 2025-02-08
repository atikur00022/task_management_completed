import React, {lazy, Suspense} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";

const Completed = lazy(() => import("../components/Completed/Completed.jsx"));

const CompletedPage = () => {
    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <Completed/>
            </Suspense>
        </Layout>
    );
};

export default CompletedPage;