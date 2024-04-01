import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginLogic from "../login/LoginLogic";
import Header from "../header/Header";
import SignUpParent from "../signup/SignUpParent";
import FormManager from "../eventsCreation/EventCreationWizard";
import EventListPage from "../eventsDisplay/EventListPage";
//import { Loader } from "../components/pages/dispplayEvents";
import ProtectedRoute from "../header/ProtectedRoute";
const Route = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LoginLogic />,
      },
      {
        path: "/signup", // Full path including parent route
        element: <SignUpParent />,
      },
      {
        path: "/login", // Full path including parent route
        element: <LoginLogic />,
      },
      //   {
      //     path: "/logout", // Full path including parent route
      //     element: (
      //       <>
      //         <Logout />
      //       </>
      //     ),
      //   },
    ],
  },
  {
    path: "/events",
    element: <Header />,
    children: [
      {
        // path: "/", //index:true
        index: true,
        element: <Navigate to="/events/display" />,
      },
      {
        path: "/events/display",
        element: (
          <ProtectedRoute>
            <EventListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events/MyEvents",
        element: (
          <ProtectedRoute>
            <EventListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events/create",
        element: (
          <ProtectedRoute>
            <FormManager />
          </ProtectedRoute>
        ),
      },
      //   {
      //     path: "/events/:id",
      //     element: <DisplaySingleEvent />,
      //   },
    ],
  },
]);

export default Route;
