import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import LoginForm from "./LoginForm";
import LogInImage from "./LoginImage"; // Ensure this is the correct import path
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config"; // Import your Firebase auth object from where it is initialized
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/context/AuthContext"; // Ensure this is the correct import path
import { collection, getDocs, query, where } from "firebase/firestore";

const LoginLogic = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { token, updateToken, updateUser } = useAuthContext();

  // Redirect if token exists in localStorage and matches the context
  useEffect(() => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "API_KEY");

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    const storedToken = localStorage.getItem("access_token");
    if (storedToken && storedToken === token) {
      navigate("/events/display"); // Adjust the route as necessary
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)
      ? ""
      : "Email is not valid.";
    tempErrors.password = user.password ? "" : "Password is required.";
    setErrors(tempErrors);

    if (Object.values(tempErrors).every((x) => x === "")) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        updateToken(userCredential.user.accessToken); // Update token context

        // Fetch user details from Firestore using the user's email
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(
          query(usersRef, where("email", "==", user.email))
        );

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log({ userData });
          updateUser(userData); // Update user details context
        }

        navigate("/events/display"); // Navigate to the desired page after login
      } catch (error) {
        const errorMessage = error.message;
        setErrors({ ...errors, auth: errorMessage });
      }
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ marginTop: 8 }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={12} sm={6}>
          <LogInImage />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LoginForm
            user={user}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginLogic;
