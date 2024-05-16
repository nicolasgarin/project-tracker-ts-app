import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
//import "bootstrap/dist/js/bootstrap.bundle.min";
import Instructions from "./pages/Instructions.tsx";
import { UserOptionsProvider } from "./context/UserOptionsContext.tsx";
import { DataProvider } from "./context/DataContext.tsx";
import { DatesProvider } from "./context/DatesContext.tsx";
import Project from "./pages/Project.tsx";

const router = createBrowserRouter([
  {
    path: "/project-tracker-ts-app/",
    element: <App />,
    children: [
      {
        path: "/project-tracker-ts-app/",
        element: <Home />,
      },
      {
        path: "/project-tracker-ts-app/projects/:projectId",
        element: <Project />,
      },
      {
        path: "/project-tracker-ts-app/instructions",
        element: <Instructions />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserOptionsProvider>
      <DatesProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </DatesProvider>
    </UserOptionsProvider>
  </React.StrictMode>
);
