import React, {lazy, Suspense} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";

const Create = lazy(() => import("../components/Create/Create.jsx"));

const CreatePage = () => {
    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <Create/>
            </Suspense>
        </Layout>
    );
};

export default CreatePage;