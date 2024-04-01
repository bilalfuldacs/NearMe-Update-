import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginLogic from "./components/login/LoginLogic";
import reportWebVitals from "./reportWebVitals";
import SignUpParent from "./components/signup/SignUpParent";
import "./firebase-config";
import Header from "./components/header/Header";
import EventCreationWizard from "./components/eventsCreation/EventCreationWizard";
import EventListPage from "./components/eventsDisplay/EventListPage";
import { BrowserRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import AppRoute from "./components/routes/Routes";
import { AuthContextProvider } from "./components/store/context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={AppRoute}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
