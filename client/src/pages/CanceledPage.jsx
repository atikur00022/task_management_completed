import React, {lazy, Suspense} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";

const Canceled = lazy(() => import("../components/Canceled/Canceled.jsx"));

const CanceledPage = () => {
    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <Canceled/>
            </Suspense>
        </Layout>
    );
};

export default CanceledPage;