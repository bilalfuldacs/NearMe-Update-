import React from "react";
import { Paper, Button, Typography, Avatar, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignUpFormFields from "./SignUpFormFields";

const paperStyle = {
  padding: 20,
  margin: "80px auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnStyle = { margin: "20px 0 20px" };

const SignUpForm = ({ user, onChange, onSubmit, errors }) => (
  <Paper elevation={10} style={paperStyle}>
    <Avatar style={avatarStyle}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5" style={{ margin: "20px 0" }}>
      Sign Up
    </Typography>
    <SignUpFormFields user={user} onChange={onChange} errors={errors} />
    <Button
      type="submit"
      color="primary"
      variant="contained"
      style={btnStyle}
      fullWidth
      onClick={onSubmit}
    >
      Sign Up
    </Button>
    <Link href="#" variant="body2" style={{ margin: "20px 0" }}>
      Already have an account? Sign in
    </Link>
  </Paper>
);

export default SignUpForm;
