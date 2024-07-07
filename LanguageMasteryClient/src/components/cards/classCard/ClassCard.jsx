import axios from "axios";
import React, { useContext } from "react";
import { FaUsers, FaChalkboardTeacher, FaEye, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { toast } from "react-hot-toast";

const ClassCard = ({ classItem }) => {
  const { user, loading } = useContext(AuthContext);

  const handleSelectedClass = async () => {
    if (user) {
      loading(true);
      try {
        const { data } = await axios.post(`selected-classes`, {
          name: classItem.name,
          image: classItem.image,
          studentEmail: user.email,
          instructorName: classItem.instructorName,
          instructorEmail: classItem.instructorEmail,
          price: classItem.price,
          classId: classItem._id,
        });

        if (data.insertedId) {
          loading(false);
          toast.success("Class selected");
        }
      } catch (error) {
        loading(false);
        console.log(error);
      }
    } else {
      toast.error("Login first to select class");
      return;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Link to={`/classes/${classItem?._id}`} className="block">
        <div className="relative">
          <div className="group">
            <img
              src={classItem?.image}
              alt={classItem?.title}
              className="h-48 w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-50 rounded-lg p-4">
                <FaEye className="text-white text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link
          to={`/classes/${classItem?._id}`}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-2 block hover:text-blue-500 transition-colors duration-300"
        >
          {classItem?.name}
        </Link>
        <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <FaUsers className="mr-1" /> Available Seats: {classItem?.availableSeats}
        </p>
        <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <FaChalkboardTeacher className="mr-1" /> Instructor: {classItem?.instructor}
        </p>
        <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <FaBook className="mr-1" /> Price: {classItem?.price}
        </p>
        <div className="text-end">
          <button onClick={handleSelectedClass} className="btn">
            <FaBook className="mr-1" /> Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
