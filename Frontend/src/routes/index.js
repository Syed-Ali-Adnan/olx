import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWrapper from "../components/Layout";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Login from "./Login";
import Signup from "./Signup";
import CreateAdd from "./CreateAdd";
import MyAdd from "./MyAdd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUserLoggedIn } from "../store/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/my-add",
        element: <MyAdd />,
      },
    {
      path: "/create-add",
      element: <CreateAdd />,
    },
    ],
  },
]);

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const paresUser = JSON.parse(user);
    dispatch(isUserLoggedIn(paresUser));
  }, []);

  return <RouterProvider router={router} />;
};

export default Routes;
