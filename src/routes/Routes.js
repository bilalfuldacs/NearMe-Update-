import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignupForm";
import Layout from "../components/pages/RootNavigation";
import DisplayEvent from "../components/pages/dispplayEvents";
import CreateEvent from "../components/pages/createEvent";
const Route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
           
            index:true,
            element: <Login />,
          },
      {
        path: "/signup", // Full path including parent route
        element: <SignupForm />,
      },
      {
        path: "/login", // Full path including parent route
        element: <Login />,
      },
      {
        path: "/logout", // Full path including parent route
        element: < >i will logout</>,
      },
    ],
  },
  {
    path: "/events",
    element: <Layout />,
    children: [
        {
           // path: "/", //index:true
            index:true,
            element: <Navigate to="/events/display" />,
          },
      {
        path: "/events/display",
        element: <DisplayEvent />,
      },
      {
        path: "/events/create",
        element: <CreateEvent />,
      },
    ],
    
  },
//   {
//     path: "*",
//     element: <NotFoundView />,
//   },
]);

export default Route;
