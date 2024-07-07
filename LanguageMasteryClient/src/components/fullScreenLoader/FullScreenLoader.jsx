import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";

const FullScreenLoader = () => {
  const { isLoading } = useContext(AuthContext);

  return (
    isLoading && (
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col z-[99999] bg-black bg-opacity-20">
        <progress className="progress progress-primary w-full h-1"></progress>
      </div>
    )
  );
};

export default FullScreenLoader;
