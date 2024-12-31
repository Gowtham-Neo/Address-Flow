import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Logout from "../pages/Logout"
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
