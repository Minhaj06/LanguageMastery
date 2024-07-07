import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [handleLoading, setHandleLoading] = useState(true);

  const [ok, setOk] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const AdminCheck = async () => {
      const { data } = await axios.get("/admin-check");
      // console.log(data);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
      setHandleLoading(false); // Set handleLoading to false when the data is fetched
    };

    if (user) AdminCheck();
  }, [user]);

  if (handleLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col z-[99999] bg-black bg-opacity-20">
        <progress className="progress progress-primary w-full h-1"></progress>
      </div>
    );
  }

  if (ok) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
