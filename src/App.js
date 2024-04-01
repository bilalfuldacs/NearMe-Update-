import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/pages/RootNavigation";
import { Provider } from "react-redux";
import store from "./store/Store";
import CreateEvent from "./components/pages/createEvent";
import DisplayEvent from "./components/pages/dispplayEvents";
import DisplaySingleEvent from "./components/pages/displaySingleEvent";
import { AuthContextProvider } from "./store/context/AuthContext";
import LoginForm from "./components/login/LoginForm"; // Import the LoginForm component
import SignupForm from "./components/signup/SignupForm"; // Import the SignupForm component
import AppRoute from "./routes/Routes";
function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <RouterProvider router={AppRoute}></RouterProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
