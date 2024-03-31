import React from "react";
import { TextField } from "@mui/material";

const textFieldStyle = { margin: "10px 0" };

const LoginFormFields = ({ user, onChange, errors }) => (
  <>
    <TextField
      label="Email"
      placeholder="Enter email"
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
  </>
);

export default LoginFormFields;
