import { Navigate } from "react-router-dom";
import { lazy } from "react";

const Cart = lazy(()=>import("./Cart"))
const Orders = lazy(()=>import("./Orders"))
const Address = lazy(()=>import("./Address"))
const Products = lazy(()=>import("../public/Products"))
const Profile = lazy(()=>import("./Profile"))


export const privateRoutes = [
    {
        path:"/",
        element:<Products/>
    },
    {
        path:"/cart",
        element:<Cart/>
    },
    {
        path:"/orders",
        element:<Orders/>
    },
    {
        path:"/address",
        element:<Address/>
    },
    {
        path:"/products",
        element:<Products/>
    },
    {
        path:"/profile",
        element:<Profile/>
    },
    {
        path:"*",
        element:<Navigate to='/'/>
    },
]