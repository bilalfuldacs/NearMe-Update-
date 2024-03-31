import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import LoginForm from "./LoginForm";
import LogInImage from "./LoginImage"; // Formerly SignUpImage

const LoginLogic = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation check
    let tempErrors = {};
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)
      ? ""
      : "Email is not valid.";
    tempErrors.password = user.password ? "" : "Password is required.";
    setErrors(tempErrors);

    if (Object.values(tempErrors).every((x) => x === "")) {
      console.log(user);
      // Handle login logic here
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
