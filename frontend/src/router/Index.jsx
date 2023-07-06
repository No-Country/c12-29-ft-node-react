import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/NotFound";
import Layout from "../pages/Layout/Layout";
import  SignUp  from "../pages/SignUp/SignUp";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path:'/signup',
                element:<SignUp/>
            },
        ]
    },
])