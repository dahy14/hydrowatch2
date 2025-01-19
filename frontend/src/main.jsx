//import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import Valve from "./pages/Admin/Valve.jsx";
import Rate from "./pages/Admin/Rate.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Livefeed from "./pages/Tenant/Livefeed.jsx";
import Historicfeed from "./pages/Tenant/Historicfeed.jsx";
import Currentbill from "./pages/Tenant/Currentbill.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/valve-settings",
    element: <Valve />,
  },
  {
    path: "/rate-settings",
    element: <Rate />,
  },
  {
    path: "/live-feed",
    element: <Livefeed />,
  },
  {
    path: "/historic-feed",
    element: <Historicfeed />,
  },
  {
    path: "/current-bill",
    element: <Currentbill />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
