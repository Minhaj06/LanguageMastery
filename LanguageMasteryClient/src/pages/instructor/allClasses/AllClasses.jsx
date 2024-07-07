import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Swal from "sweetalert2";
// import useClasses from "../../../hooks/useClasses";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/auth";

const AllClasses = () => {
  const { user } = useContext(AuthContext);
  // const [classes, refetch] = useClasses();
  const [classes, setClasses] = useState([]);

  const handleDeleteClass = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-3",
        cancelButton: "btn btn-error",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(`/classes/${id}`);
          console.log(data);
          if (data.deletedCount > 0) {
            loadClassesByInstructor();
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Class deleted successfully.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Error",
              "Something went wrong! Class not deleted.",
              "error"
            );
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Cancelled", "Your class is safe :)", "error");
        }
      });
  };

  const loadClassesByInstructor = async () => {
    const { data } = await axios.get(`/instructors/classes/${user?.email}`);
    console.log(data);
    setClasses(data);
  };

  useEffect(() => {
    loadClassesByInstructor();
  }, []);

  return (
    <>
      <SectionTitle heading="All Classes" />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Students</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem, index) => (
              <tr key={classItem?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={classItem?.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </td>
                <td>{classItem?.name}</td>
                <td>{classItem?.availableSeats}</td>
                <td>{classItem?.price}</td>
                <td>
                  <div
                    className={`badge ${
                      classItem?.status == "pending" && "text-primary badge-primary"
                    } ${classItem?.status == "approved" && "text-success badge-success"} ${
                      classItem?.status == "denied" && "text-error badge-error"
                    } capitalize bg-opacity-20 border-opacity-20`}
                  >
                    {classItem?.status}
                  </div>
                </td>
                <td>24</td>
                <td>{classItem?.feedback || "....."}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`./update-class/${classItem?._id}`} className="btn btn-error">
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteClass(classItem?._id)}
                      className="btn btn-warning"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllClasses;
