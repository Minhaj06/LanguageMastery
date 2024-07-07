import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const { data } = await axios.get("/users");
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const makeInstructor = async (id) => {
    const { data } = await axios.patch(`/users/role/${id}`, {
      role: "instructor",
    });
    if (data.modifiedCount > 0) {
      loadUsers();
      Swal.fire("Done!", "Instructor access given!", "success");
    }
  };
  const makeAdmin = async (id) => {
    const { data } = await axios.patch(`/users/role/${id}`, {
      role: "admin",
    });
    if (data.modifiedCount > 0) {
      loadUsers();
      Swal.fire("Done!", "Admin access given!", "success");
    }
  };

  return (
    <>
      <section>
        <SectionTitle heading={`Manage Users`} />
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make instructor/admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userData, index) => (
                <tr key={userData?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={userData?.photoURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </td>
                  <td>{userData?.name}</td>
                  <td>{userData?.email}</td>
                  <td>
                    <div className="badge badge-primary">{userData?.role}</div>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        onClick={() => makeInstructor(userData?._id)}
                        className={`btn btn-warning btn-sm ${
                          userData?.role !== "student" && "pointer-events-none opacity-50"
                        }`}
                      >
                        Instructor
                      </button>
                      <button
                        onClick={() => makeAdmin(userData?._id)}
                        className={`btn btn-error btn-sm ${
                          userData?.role === "admin" && "pointer-events-none opacity-50"
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageUsers;
