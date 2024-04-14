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
<<<<<<< HEAD
import { Courses } from "./pages/courses";
import { Profile } from "./pages/profile";

//ADMIN
import { AdminDashboard } from './admin/adminDashboard';
import { AdminCourses } from './admin/adminCourses/';
import { AdminUpdateCourses } from './admin/adminCourses/adminUpdateCourses';
import { AdminTerms } from './admin/adminTerms/';
import { AdminUpdateTerms } from './admin/adminTerms/adminUpdateTerms';
import { AdminDepartment } from './admin/adminDepartment/';
import { AdminUpdateDepartment } from './admin/adminDepartment/adminUpdateDepartment';
=======
>>>>>>> Pal_xps_v1

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
<<<<<<< HEAD
            path: "courses",
            element: <Courses/>
          },
          {
=======
>>>>>>> Pal_xps_v1
            path: "about-us",
            element: <AboutUs />,
          },

          {
            path: "login",
            element: <Login />,
          },
<<<<<<< HEAD
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },

    ]
  },
  {
    path: "adminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "adminCourses",
    element: <AdminCourses />,
  },
  {
    path: "adminUpdateCourses/:coursesID",
    element: <AdminUpdateCourses />,
  },
  {
    path: "adminTerms",
    element: <AdminTerms />,
  },
  {
    path: "adminUpdateTerms/:termsID",
    element: <AdminUpdateTerms />,
  },
  {
    path: "adminDepartment",
    element: <AdminDepartment />,
  },
  {
    path: "adminUpdateDepartment/:departmentID",
    element: <AdminUpdateDepartment />,
  },
=======
        ],
      },
    ]
  },
>>>>>>> Pal_xps_v1
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;