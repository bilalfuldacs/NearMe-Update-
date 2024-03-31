import React from "react";
import LoginImage from "../../assets/login.gif";

const LogInImage = () => (
  <img
    src={LoginImage}
    alt="Sign Up"
    style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
  />
);

export default LogInImage;
