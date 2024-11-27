import { Navigate } from "react-router-dom";
import { lazy } from "react";

const ForgotPwd = lazy(()=>import("./ForgotPwd"))
const Login = lazy(()=>import("./Login"))
const Products = lazy(()=>import("./Products"))
const Registration = lazy(()=>import("./Registration"))

export const publicRoutes = [
    {
        path:"/",
        element:<Products/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Registration/>
    },
    {
        path:"/forgot-pwd",
        element:<ForgotPwd/>
    },
    {
        path:"/products",
        element:<Products/>
    },
    {
        path:"*",
        element:<Navigate to='/'/>
    },
]