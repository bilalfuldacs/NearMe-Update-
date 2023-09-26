


import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignupForm";
import Layout from "../components/pages/RootNavigation";
import DisplayEvent from "../components/pages/dispplayEvents";
import CreateEvent from "../components/pages/createEvent";
import Logout from "../components/pages/Logout";
import DisplaySingleEvent from "../components/pages/displaySingleEvent";
import { Loader } from "../components/pages/dispplayEvents";
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
        element: < ><Logout/></>,
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
            element: <DisplayEvent loader={Loader} />,
          },
          {
            path: "/events/MyEvents",
            element: <DisplayEvent loader={Loader} />,
          },
      {
        path: "/events/create",
        element: <CreateEvent />,
      },
      {
        path:"/events/:id",
        element:<DisplaySingleEvent />
      },
    ],
    
  },
//   {
//     path: "*",
//     element: <NotFoundView />,
//   },
]);

export default Route;

