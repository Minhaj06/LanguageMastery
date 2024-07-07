import React from "react";
import { FaEye, FaUser, FaStar, FaBookOpen, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";

const InstructorCard = ({ instructor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center justify-center">
        <div className="relative">
          <Link className="inline-block" to={``}>
            <img
              className="w-32 h-32 rounded-full object-cover transition duration-300 ease-in-out transform hover:scale-105"
              src={instructor?.image}
              alt={instructor?.name}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
              <FaEye className="text-white text-3xl" />
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{instructor?.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center">
          <FaUser className="mr-2 text-lg shrink-0" />
          <span>{instructor?.expertise}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2 flex">
          <FaBookOpen className="mr-2 text-lg shrink-0 mt-1" />
          <span>{instructor?.bio.substring(0, 70)}...</span>
        </p>
        {/* <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center">
          <FaUserGraduate className="mr-2 text-lg shrink-0" />
          <span>{instructor?.students} students</span>
        </p> */}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <FaStar className="text-yellow-500 text-lg mr-1" />
          <FaStar className="text-yellow-500 text-lg mr-1" />
          <FaStar className="text-yellow-500 text-lg mr-1" />
          <FaStar className="text-yellow-500 text-lg mr-1" />
          <FaStar className="text-gray-400 text-lg" />
        </div>
      </div>
      <div className="text-end">
        <Link to={`instructors/classes/${instructor?.email}`} className="btn btn-error mt-4">
          See Classes
        </Link>
      </div>
    </div>
  );
};

export default InstructorCard;
