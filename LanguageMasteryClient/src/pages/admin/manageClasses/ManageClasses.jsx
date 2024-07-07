import React, { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import { toast } from "react-hot-toast";
// import useClasses from "../../../hooks/useClasses";

const MangeClasses = () => {
  const { user } = useContext(AuthContext);
  //   const [classes, refetch] = useClasses();
  const [classes, setClasses] = useState([]);

  const loadClasses = async () => {
    const { data } = await axios.get(`classes`);
    setClasses(data);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const approveClass = async (id) => {
    const { data } = await axios.patch(`/classes/status/${id}`, {
      status: "approved",
    });
    if (data.modifiedCount > 0) {
      loadClasses();
      Swal.fire("Approved!", "Class approved!", "success");
    }
  };

  const denyClass = async (id) => {
    const { data } = await axios.patch(`/classes/status/${id}`, {
      status: "denied",
    });
    if (data.modifiedCount > 0) {
      loadClasses();
      Swal.fire("Denied!", "Class denied!", "success");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [classFeedbackId, setClassFeedbackId] = useState("");
  const openFeedBackModal = (id) => {
    openModal();
    setClassFeedbackId(id);
  };

  const sendFeedback = async (event) => {
    event.preventDefault();
    const form = event.target;

    const id = classFeedbackId;
    const feedback = form.feedback.value;

    if (!feedback) {
      toast.error("Write Feedback");
      return;
    }

    const { data } = await axios.post(`/classes/feedback/${id}`, {
      feedback,
    });

    if (data.modifiedCount > 0) {
      form.reset();
      closeModal();
      Swal.fire("Done!", "Feedback sent to instructor!", "success");
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal opacity-100 visible pointer-events-auto">
            <div className="modal-box">
              <h2 className="modal-title text-lg font-bold mb-4">Write Feedback</h2>
              <form onSubmit={sendFeedback}>
                <div className="modal-body">
                  <textarea
                    name="feedback"
                    rows={4}
                    className="textarea textarea-primary w-full text-lg font-semibold mb-4"
                    placeholder="Bio"
                  ></textarea>
                </div>
                <div className="modal-footer text-end">
                  <button type="button" className="btn btn-sm" onClick={closeModal}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm ml-3">
                    Send Feedback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <SectionTitle heading="All Classes" />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
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
                <td>{classItem?.instructorName}</td>
                <td>{classItem?.instructorEmail}</td>
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
                <td>
                  <div className="btn-group">
                    <button
                      onClick={() => approveClass(classItem?._id)}
                      className={`btn btn-success ${
                        classItem?.status !== "pending" && "pointer-events-none opacity-60"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => denyClass(classItem?._id)}
                      className={`btn btn-error ${
                        classItem?.status !== "pending" && "pointer-events-none opacity-60"
                      }`}
                    >
                      Deny
                    </button>
                    <button
                      onClick={() => openFeedBackModal(classItem?._id)}
                      className={`btn btn-primary ${
                        classItem?.status !== "denied" && "pointer-events-none opacity-60"
                      }`}
                    >
                      Send Feedback
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

export default MangeClasses;
