import {
  FaEye,
  FaUser,
  FaStar,
  FaBookOpen,
  FaUserGraduate,
  FaEnvelope,
  FaCheckDouble,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const InstructorCardAlt = ({ instructor }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-5 lg:col-span-4 relative">
          <Link to={``}>
            <img
              className="w-full h-full object-cover rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              src={instructor?.image}
              alt={instructor?.name}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
              <FaEye className="text-white text-3xl" />
            </div>
          </Link>
        </div>
        <div className="col-span-12 sm:col-span-7 lg:col-span-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {instructor?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
              <FaUser className="mr-2 text-lg shrink-0" />
              <span>{instructor?.expertise}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex">
              <FaBookOpen className="mr-2 text-lg shrink-0 mt-1" />
              <span>{instructor?.bio.substring(0, 180)}...</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
              <FaUserGraduate className="mr-2 text-lg shrink-0" />
              <span>{instructor?.students} students</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
              <FaEnvelope className="mr-2 text-lg shrink-0" />
              <span>{instructor?.email}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2 flex items-center">
              <FaCheckDouble className="mr-2 text-lg shrink-0" />
              <span>{instructor?.classesTaken} Classes Taken</span>
            </p>
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
            <Link
              to={`/instructors/classes/${instructor?.email}`}
              className="btn btn-error mt-4"
            >
              See Classes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCardAlt;
