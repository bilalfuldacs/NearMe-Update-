import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import SignUpForm from "./SignUpForm";
import SignUpImage from "./SignUpImage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { getDoc } from "firebase/firestore";
import { useAuthContext } from "../store/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpLogic = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { token, updateToken } = useAuthContext();
  useEffect(() => {
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
  const checkUserDocumentExists = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document exists!");
      return true;
    } else {
      console.log("No such document!");
      return false;
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = user.firstName ? "" : "First name is required.";
    tempErrors.lastName = user.lastName ? "" : "Last name is required.";
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)
      ? ""
      : "Email is not valid.";
    tempErrors.contact = user.contact ? "" : "Contact is required.";
    tempErrors.password = user.password ? "" : "Password is required.";
    tempErrors.confirmPassword =
      user.confirmPassword === user.password ? "" : "Passwords do not match.";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", user);
    if (validate()) {
      let firebaseUser = null; // Declare firebaseUser here

      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          firebaseUser = userCredential.user; // Assign firebaseUser here
          const userDataForFirestore = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contact: user.contact,
          };
          const docRef = doc(db, "users", firebaseUser.uid);
          console.log("Attempting to create document at:", docRef.path); // Log the document path
          return setDoc(docRef, userDataForFirestore);
        })
        .then(() => {
          console.log("User data stored in Firestore");
          return checkUserDocumentExists(firebaseUser.uid);
        })
        .catch((error) => {
          console.error("Error in user creation or document storage:", error);
        });
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
          <SignUpImage />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SignUpForm
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

export default SignUpLogic;
