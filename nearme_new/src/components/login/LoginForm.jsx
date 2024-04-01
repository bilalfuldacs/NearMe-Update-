import React from "react";
import { Paper, Button, Typography, Avatar, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginFormFields from "./LoginFormFields";

const paperStyle = {
  padding: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "80px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnStyle = { margin: "20px 0 20px" };

const LoginForm = ({ user, onChange, onSubmit, errors }) => (
  <Paper elevation={10} style={paperStyle}>
    <Avatar style={avatarStyle}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5" style={{ margin: "20px 0" }}>
      Login
    </Typography>
    <LoginFormFields user={user} onChange={onChange} errors={errors} />
    <Button
      type="submit"
      color="primary"
      variant="contained"
      style={btnStyle}
      fullWidth
      onClick={onSubmit}
    >
      Login
    </Button>
    <Typography>
      {" "}
      Don't have an account?
      <Link href="/signup" variant="body2" style={{ margin: "20px 0" }}>
        Sign up
      </Link>
    </Typography>
  </Paper>
);

export default LoginForm;
