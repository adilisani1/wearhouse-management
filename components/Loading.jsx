import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
