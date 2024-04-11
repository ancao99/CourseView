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
import { Profile } from "./pages/profile";

//ADMIN
import { AdminDashboard } from './admin/adminDashboard';
import { AdminCourses } from './admin/adminCourses/';
import { AdminUpdateCourses } from './admin/adminCourses/adminUpdateCourses';
import { AdminUser } from './admin/adminUser/';
import { AdminUpdateUser } from './admin/adminUser/adminUpdateUser';
import { AdminDepartment } from './admin/adminDepartment/';
import { AdminUpdateDepartment } from './admin/adminDepartment/adminUpdateDepartment';

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
    path: "adminUser",
    element: <AdminUser />,
  },
  {
    path: "adminUpdateUser/:userID",
    element: <AdminUpdateUser />,
  },
  {
    path: "adminDepartment",
    element: <AdminDepartment />,
  },
  {
    path: "adminUpdateDepartment/:departmentID",
    element: <AdminUpdateDepartment />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;