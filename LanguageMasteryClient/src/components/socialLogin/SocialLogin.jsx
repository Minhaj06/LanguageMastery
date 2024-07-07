import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import app from "../../firebase/firebase.config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import axios from "axios";

const SocialLogin = () => {
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Social Login
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleLoginWithGoogle = () => {
    loading(true);

    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        const saveUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };

        const { data } = await axios.post("/users", saveUser);
        // console.log(data);

        loading(false);
        navigate(from, { replace: true });
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
        loading(false);
        toast.error(error.message);
      });
  };

  const handleLoginWithFacebook = () => {
    loading(true);

    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        loading(false);
        navigate(from, { replace: true });
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
        loading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="divider">OR</div>
      <div className="text-center">
        <button
          onClick={handleLoginWithGoogle}
          className="btn btn-outline btn-success btn-block mb-4"
        >
          <FcGoogle className="me-2" size={20} />
          Login With Google
        </button>
        <button
          onClick={handleLoginWithFacebook}
          className="btn btn-outline btn-info btn-block"
        >
          <BsFacebook className="me-2" size={20} />
          Login With Facebook
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
