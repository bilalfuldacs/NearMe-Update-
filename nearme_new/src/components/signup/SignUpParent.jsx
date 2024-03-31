import React from "react";
import SignUpPage from "./SignUpPage";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme(); // You can customize this theme to change the colors, typography, etc.

function SignUpParent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This provides a consistent baseline style */}
      <SignUpPage />
    </ThemeProvider>
  );
}

export default SignUpParent;
