import React, {Suspense, useEffect} from 'react';
import Layout from "../layout/Layout.jsx";
import LazyLoader from "../layout/LazyLoader.jsx";
import SearchByKeyword from "../components/SearchByKeyword/SearchByKeyword.jsx";
import {useParams} from "react-router-dom";
import {SearchKeyWordRequest} from "../ApiRequest/ApiRequest.js";

const SearchPage = () => {

    const {keyword} = useParams();
    console.log(keyword);

    useEffect(() => {
        (async () => {
            await SearchKeyWordRequest(keyword);
        })()
    },[keyword]);

    return (
        <Layout>
            <Suspense fallback={<LazyLoader/>}>
                <SearchByKeyword/>
            </Suspense>
        </Layout>
    );
};

export default SearchPage;