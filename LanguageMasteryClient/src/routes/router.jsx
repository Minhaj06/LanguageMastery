import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import ProfileUpdatePage from "../pages/profileUpdatePage/ProfileUpdatePage";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import InstructorsPage from "../pages/instructorsPage/InstructorPage";
import ClassByInstructorPage from "../pages/classesByInstructorPage/ClassesByInstructorPage";
import MainLayout from "../layout/MainLayout";
import InstructorDashboardLayout from "../layout/InstructorDashboardLayout";
import InstructorRoute from "./InstructorRoute";
import StudentRoute from "./StudentRoute";
import StudentDashboardLayout from "../layout/StudentDashboardLayout";
import AdminRoute from "./AdminRoute";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import AddClass from "../pages/instructor/addClass/AddClass";
import AllClasses from "../pages/instructor/allClasses/AllClasses";
import UpdateClass from "../pages/instructor/updateClass/UpdateClass";
import MangeClasses from "../pages/admin/manageClasses/ManageClasses";
import ManageUsers from "../pages/admin/manageUsers/ManageUsers";
import SelectedClasses from "../pages/student/selectedClasses/SelectedClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileUpdatePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/instructors",
        element: <InstructorsPage />,
      },
      {
        path: "/instructors/classes/:email",
        element: <ClassByInstructorPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },

  // Admin Routes
  {
    path: "dashboard/admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashboardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <MangeClasses />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },

  // Instructor Routes
  {
    path: "dashboard/instructor",
    element: (
      <PrivateRoute>
        <InstructorRoute>
          <InstructorDashboardLayout />
        </InstructorRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <AllClasses />,
      },
      {
        path: "add-class",
        element: <AddClass />,
      },
      {
        path: "update-class/:id",
        element: <UpdateClass />,
      },
    ],
    errorElement: <NotFoundPage />,
  },

  // Student Routes
  {
    path: "dashboard/student",
    element: (
      <PrivateRoute>
        <StudentRoute>
          <StudentDashboardLayout />
        </StudentRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <SelectedClasses />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
