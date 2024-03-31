import React from "react";
import { TextField } from "@mui/material";

const textFieldStyle = { margin: "10px 0" };

const SignUpFormFields = ({ user, onChange, errors }) => (
  <>
    <TextField
      label="First Name"
      placeholder="Enter first name"
      fullWidth
      required
      name="firstName"
      value={user.firstName}
      onChange={onChange}
      style={textFieldStyle}
      error={Boolean(errors.firstName)}
      helperText={errors.firstName}
    />
    <TextField
      label="Last Name"
      placeholder="Enter last name"
      fullWidth
      required
      name="lastName"
      value={user.lastName}
      onChange={onChange}
      style={textFieldStyle}
      error={Boolean(errors.lastName)}
      helperText={errors.lastName}
    />
    <TextField
      label="Email"
      placeholder="Enter email"
      type="email"
      fullWidth
      required
      name="email"
      value={user.email}
      onChange={onChange}
      style={textFieldStyle}
      error={Boolean(errors.email)}
      helperText={errors.email}
    />
    <TextField
      label="Contact"
      placeholder="Enter contact number"
      fullWidth
      required
      name="contact"
      value={user.contact}
      onChange={onChange}
      style={textFieldStyle}
      error={Boolean(errors.contact)}
      helperText={errors.contact}
    />
    <TextField
      label="Password"
      placeholder="Enter password"
      type="password"
      fullWidth
      required
      name="password"
      value={user.password}
      onChange={onChange}
      style={textFieldStyle}
      error={Boolean(errors.password)}
      helperText={errors.password}
    />
    <TextField
      label="Confirm Password"
      placeholder="Confirm password"
      type="password"
      fullWidth
      required
      name="confirmPassword"
      value={user.confirmPassword}
      onChange={onChange}
      style={textFieldStyle}
      error={Boolean(errors.confirmPassword)}
      helperText={errors.confirmPassword}
    />
  </>
);

export default SignUpFormFields;
