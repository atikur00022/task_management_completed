import React, {lazy, Suspense} from 'react';
import LazyLoader from "../layout/LazyLoader.jsx";

const NotFound = lazy(() => import("../components/NotFound/NotFound.jsx"));

const Page404 = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </div>
    );
};

export default Page404;