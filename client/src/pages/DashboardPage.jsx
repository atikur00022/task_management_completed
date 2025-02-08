import React, {Suspense, lazy} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";

const Dashboard = lazy(() => import("../components/Dashboard/Dashboard.jsx"));

const DashboardPage = () => {
    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <Dashboard />
            </Suspense>
        </Layout>
    );
};

export default DashboardPage;