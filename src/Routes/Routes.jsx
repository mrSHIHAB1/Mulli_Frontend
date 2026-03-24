import { createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "../layouts/PublicLayout";
import Waitlist from "../pages/Public/Waitlist";


export const    router = createBrowserRouter([
   {
    path: "/",
    element: <Navigate to="/waitlist" replace />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      
      {
        path: "login",
        element: <Login />,
      },

    
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
    
        ],
      },
    ],
  },
    {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "waitlist",
        element: <Waitlist />,
      },

    
    ],
  },

  {
    path: "*",
    element: <Navigate to="/waitlist" replace />
  }
]);


