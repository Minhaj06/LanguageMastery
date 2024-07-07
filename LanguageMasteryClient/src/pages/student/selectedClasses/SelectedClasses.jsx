import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Swal from "sweetalert2";
// import useClasses from "../../../hooks/useClasses";

import { HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/auth";

const SelectedClasses = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  const loadSelectedClasses = async () => {
    const { data } = await axios.get("selected-classes");
    setSelectedClasses(data);
    console.log(data);
  };

  useEffect(() => {
    loadSelectedClasses();
  }, []);

  const removeSelectedClass = async (id) => {
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
          const { data } = await axios.delete(`selected-classes/${id}`);
          console.log(data);
          if (data.deletedCount > 0) {
            loadSelectedClasses();
            swalWithBootstrapButtons.fire(
              "Removed!",
              "Class removed successfully.",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire(
              "Error",
              "Something went wrong! Class not removed.",
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

  return (
    <>
      <SectionTitle heading="Selected Classes" />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Instructorm Name</th>
              <th>Instructorm Email</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses.map((selectedClass, index) => (
              <tr key={selectedClass?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={selectedClass?.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </td>
                <td>{selectedClass?.name}</td>
                <td>{selectedClass?.instructorName}</td>
                <td>{selectedClass?.instructorEmail}</td>
                <td>{selectedClass?.price}</td>
                <td>
                  <div className="btn-group">
                    <button
                      onClick={() => removeSelectedClass(selectedClass?._id)}
                      className="btn btn-warning"
                    >
                      Remove
                    </button>
                    <button className="btn btn-primary">Payment</button>
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

export default SelectedClasses;
