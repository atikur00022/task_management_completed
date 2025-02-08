import React from 'react';

const LazyLoader = () => {
    return (
        <>
            <div className={"loadingOverlay d-none"}>
                <div className="line-progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </>
    );
};

export default LazyLoader;