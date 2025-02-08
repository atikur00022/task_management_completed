import React, {lazy, Suspense} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";

const New = lazy(() => import("../components/New/New.jsx"));

const NewPage = () => {
    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <New/>
            </Suspense>
        </Layout>
    );
};

export default NewPage;