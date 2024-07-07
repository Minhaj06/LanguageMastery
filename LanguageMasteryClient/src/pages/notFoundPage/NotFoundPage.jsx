import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/title/Title";

const NotFoundPage = () => {
  return (
    <>
      <Title title={`Not Found`} />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center relative">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-english-book-background_23-2149483336.jpg?w=1380&t=st=1686564700~exp=1686565300~hmac=04125d2af1d49696df5222ed3eb966b0292af98f4abdafa3e8b5d4c82f49bda1" // Replace with the URL of your image
            alt="404 Not Found"
            className="w-screen h-screen"
          />
          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8 font-medium">Page Not Found</p>
            <Link to={`/`} className="btn btn-primary">
              back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
