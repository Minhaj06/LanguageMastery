import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import Title from "../../components/title/Title";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { logIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    if (!email) {
      toast.error("Email is required");
      return;
    } else if (!password) {
      toast.error("Password is required");
      return;
    }

    logIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        loading(false);
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        loading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <Title title={`Login`} />
      <section className="mt-44 mb-24">
        <div className="container mx-auto px-3">
          <div className="sm:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto bg-slate-100 dark:bg-slate-800 p-6 border dark:border-slate-800 shadow-xl rounded-xl">
            <form onSubmit={handleLogin}>
              <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>

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
                Don't have an account?{" "}
                <Link to="/register" className="btn btn-link">
                  Register Now
                </Link>
              </p>
              <button type="submit" className="btn btn-primary btn-block mt-6">
                Login Now
              </button>
            </form>
            <SocialLogin />
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
