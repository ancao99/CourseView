import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//COMPONENTS


//LAYOUTS
import { MainLayout } from "./layouts/mainLayout";
import { CommonLayout } from "./layouts/CommonLayout";


//PAGES
import { Home } from "./pages/home/";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Courses } from "./pages/courses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <CommonLayout />,
        children: [
          {
            index: true,
            path: "",
            element: <Home />,
          },
          {
            path: "courses",
            element: <Courses/>
          },
          {
            path: "about-us",
            element: <AboutUs />,
          },

          {
            path: "login",
            element: <Login />,
          },
          

        
        ],
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;