import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import Title from "../../components/title/Title";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (!name) {
      toast.error("Name is required");
      return;
    } else if (!email) {
      toast.error("Email is required");
      return;
    } else if (!photoURL) {
      toast.error("Photo URL is required");
      return;
    } else if (!password) {
      toast.error("Password is required");
      return;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password should contain at least one capital letter");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password should contain at least one special character");
      return;
    }

    createUser(email, password)
      .then(async (result) => {
        const createdUser = result.user;
        console.log("Created User ====>", createdUser);

        const { data } = await axios.post("/users", {
          name,
          email,
          photoURL,
        });

        console.log(data);
        await updateUser(name, photoURL);

        form.reset();
        loading(false);
        toast.success("Registration successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        loading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <Title title={`Register`} />
      <section className="mt-44 mb-24">
        <div className="container mx-auto px-3">
          <div className="sm:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto bg-slate-100 dark:bg-slate-800 border dark:border-slate-800 p-6 shadow-xl rounded-xl">
            <form onSubmit={handleRegister}>
              <h2 className="text-3xl font-semibold text-center mb-4">Register</h2>

              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-lg">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered text-lg"
                />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-lg">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered text-lg"
                />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-lg">Photo URL</span>
                </label>
                <input
                  name="photoURL"
                  type="url"
                  placeholder="Type here"
                  className="input input-bordered text-lg"
                />
              </div>
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text text-lg">Password</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type here"
                    className="input input-bordered text-lg w-full pr-9"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 flex items-center h-full px-2 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={24} />
                    ) : (
                      <AiOutlineEye size={24} />
                    )}
                  </span>
                </div>
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="btn btn-link">
                  Login
                </Link>
              </p>
              <button type="submit" className="btn btn-primary btn-block mt-6">
                Register Now
              </button>
            </form>
            <SocialLogin />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
