import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/Authentication/Login/Login";
import Categories from "../pages/categories/Categories";
import Colors from "../pages/colors/Colors";
import Dashboard from "../pages/dashboard/Dashboard";
import Trending from "../pages/trending/Trending";
import Wallpapers from "../pages/wallpapers/Wallpapers";
import PrivateRouter from "./PrivateRouter";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Layout></Layout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/wallpapers",
        element: <Wallpapers></Wallpapers>,
      },
      {
        path: "/trending",
        element: <Trending></Trending>,
      },
      {
        path: "/colors",
        element: <Colors></Colors>,
      },
    ],
  },
  // {
  //   path: "/register",
  //   element: <Register></Register>,
  // },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: (
      <h2 className="font-black py-6 text-3xl text-red-600 text-center">
        Page Not Found!
      </h2>
    ),
  },
]);
