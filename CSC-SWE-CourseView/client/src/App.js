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
import { CoursesDetails } from "./pages/courses-details/index";
import { Profile } from "./pages/profile";
import { EditComment } from "./pages/courses-details/edit-comment";

//ADMIN
import { AdminDashboard } from './admin/adminDashboard';
import { AdminCourses } from './admin/adminCourses/';
import { AdminUpdateCourses } from './admin/adminCourses/adminUpdateCourses';
import { AdminUser } from './admin/adminUser/';
import { AdminUpdateUser } from './admin/adminUser/adminUpdateUser';
import { AdminFeedback } from "./admin/adminFeedback";
<<<<<<< HEAD
=======
import { AdminUpdateFeedback } from './admin/adminFeedback/adminUpdateFeedback';

>>>>>>> Pal_gpc_v1

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
            element: <Courses />
          },
          
            {
              path: "courses-details/:courseId",
              element: <CoursesDetails />,
            },
            {
              path: "edit-comment/:reviewID",
              element: <EditComment />,
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
    path: "adminUpdateCourses/:courseID",
    element: <AdminUpdateCourses />,
  },
  {
    path: "adminUser",
    element: <AdminUser />,
  },
  {
    path: "adminFeedback",
    element: <AdminFeedback />,
  },
  {
<<<<<<< HEAD
=======
    path: "adminUpdateFeedback/:feedbackID",
    element: <AdminUpdateFeedback />,
  },
  {
>>>>>>> Pal_gpc_v1
    path: "adminUpdateUser/:userID",
    element: <AdminUpdateUser />,
  },
  

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;