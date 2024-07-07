import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (token) {
      setAccessToken(token);
    }
  }, []);

  // axios config
  axios.defaults.baseURL = import.meta.env.VITE_API;
  axios.defaults.headers.common["authorization"] = accessToken;

  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photoURL) => {
    setIsLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };

  const logIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setIsLoading(false);

      // Get and set token
      if (loggedUser) {
        axios.post("/jwt", { email: loggedUser.email }).then((data) => {
          // console.log(data.data.token)
          localStorage.setItem("access-token", data?.data?.token);
          setIsLoading(false);
        });
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loading = (value) => {
    setIsLoading(value);
  };

  const authInfo = {
    user,
    isLoading,
    loading,
    createUser,
    updateUser,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
