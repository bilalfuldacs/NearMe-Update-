import React from "react";
import signupImage from "../../assets/istockphoto-1305268276-612x612.jpg";

const SignUpImage = () => (
  <img
    src={signupImage}
    alt="Sign Up"
    style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
  />
);

export default SignUpImage;
