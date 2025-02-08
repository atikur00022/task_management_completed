import React from 'react';
import {useSelector} from "react-redux";

const FullScreenLoader = () => {

    const loader = useSelector((state) => state.setting.loader);

    return (
        <>
            <div className={loader+" loadingOverlay"}>
                <div className="line-progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </>
    );
};

export default FullScreenLoader;