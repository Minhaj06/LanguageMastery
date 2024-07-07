import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useParams } from "react-router-dom";
import LoadingBtn from "../../../components/loadingBtn/LoadingBtn";

const imgbb_token = import.meta.env.VITE_IMGBB_TOKEN;

const UpdateClass = () => {
  const { user, loading } = useContext(AuthContext);
  const imgbbUploadURL = `https://api.imgbb.com/1/upload?key=${imgbb_token}`;
  const [classItem, setClassItem] = useState({});

  const [requesting, setRequesting] = useState(false);

  const { id } = useParams();

  const loadClass = async () => {
    const { data } = await axios.get(`/classes/${id}`);
    setClassItem(data);
    reset({
      ...data,
      image: null,
    });
  };

  useEffect(() => {
    loadClass();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setRequesting(true);

    try {
      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const response = await fetch(imgbbUploadURL, {
          method: "POST",
          body: formData,
        });
        const imageResponse = await response.json();
        if (imageResponse.success) {
          const imageURL = imageResponse.data.display_url;
          const UpdateClassResponse = await axios.put(`/classes/${id}`, {
            name: data.name,
            image: imageURL,
            instructorName: data.instructorName,
            instructorEmail: data.instructorEmail,
            availableSeats: data.availableSeats,
            price: data.price,
            status: "pending",
          });
          if (UpdateClassResponse.data.modifiedCount > 0) {
            reset();
            setRequesting(false);
            Swal.fire("Awesome!", "Class updated successfully!", "success");
          }
        }
      } else {
        const UpdateClassResponse = await axios.put(`/classes/${id}`, {
          name: data.name,
          instructorName: data.instructorName,
          instructorEmail: data.instructorEmail,
          availableSeats: data.availableSeats,
          price: data.price,
          status: "pending",
        });
        if (UpdateClassResponse.data.modifiedCount > 0) {
          reset();
          setRequesting(false);
          Swal.fire("Awesome!", "Class updated successfully!", "success");
        }
      }
    } catch (error) {
      setRequesting(false);
      console.error(error);
    }
  };

  return (
    <>
      <SectionTitle heading={`Update Class`} />
      <section>
        <div className="px-3">
          <div className="2xl:w-4/5 mx-auto bg-slate-100 dark:bg-slate-700 border dark:border-slate-800 p-6 shadow-xl rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Class Name</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter class name"
                    className="input input-bordered text-lg"
                    // defaultValue={classItem?.name}
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span className="text-red-500">Class name is required</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Class Image</span>
                  </label>
                  <input
                    accept="image/jpeg,image/jpg,image/png"
                    name="image"
                    type="file"
                    className="input input-bordered text-lg"
                    {...register("image")}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Instructor Name</span>
                  </label>
                  <input
                    name="instructorName"
                    type="text"
                    placeholder="Enter instructor name"
                    className="input input-bordered text-lg"
                    readOnly
                    // value={user?.displayName}
                    {...register("instructorName", { required: true })}
                  />
                  {errors.instructorName && (
                    <span className="text-red-500">Instructor name is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Instructor Email</span>
                  </label>
                  <input
                    name="instructorEmail"
                    type="text"
                    placeholder="Enter instructor email"
                    className="input input-bordered text-lg"
                    readOnly
                    // value={user?.email}
                    {...register("instructorEmail", { required: true })}
                  />
                  {errors.instructorEmail && (
                    <span className="text-red-500">Instructor email is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Available Seats</span>
                  </label>
                  <input
                    name="availableSeats"
                    type="number"
                    placeholder="Enter available seats"
                    className="input input-bordered text-lg"
                    {...register("availableSeats", { required: true })}
                    min={0}
                    // defaultValue={classItem?.availableSeats}
                  />
                  {errors.availableSeats && (
                    <span className="text-red-500">Available seats is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Price</span>
                  </label>
                  <input
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    className="input input-bordered text-lg"
                    {...register("price", { required: true })}
                    // defaultValue={classItem?.price}
                  />
                  {errors.price && <span className="text-red-500">Price is required</span>}
                </div>
              </div>
              <div className="text-right">
                {requesting ? (
                  <LoadingBtn type="btn-primary" text="Updating..." />
                ) : (
                  <button type="submit" className="btn btn-primary tracking-widest px-8 mt-6">
                    Update Class
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateClass;
