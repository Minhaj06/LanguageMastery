import React from "react";

const LoadingBtn = ({ type, text }) => {
  return (
    <>
      <button className={`btn ${type} tracking-widest px-8 mt-6 pointer-events-none`}>
        <div className="mr-2 animate-spin rounded-full w-4 h-4 border-[3px] border-r-0"></div>
        {text}
      </button>
    </>
  );
};

export default LoadingBtn;
