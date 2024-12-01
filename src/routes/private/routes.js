import { Navigate } from "react-router-dom";
import { lazy } from "react";

const Cart = lazy(()=>import("./Cart"))
const Orders = lazy(()=>import("./Orders"))
const Address = lazy(()=>import("./Address"))
const Products = lazy(()=>import("../public/Products"))
const ProductInfo = lazy(()=>import("../public/ProductInfo"))
const Profile = lazy(()=>import("./Profile"))
const BuyNow = lazy(()=>import("./BuyNow"))


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
        path:"/product-info/:id",
        element:<ProductInfo/>
    },
    {
        path:"/buy-now",
        element:<BuyNow/>
    },
    {
        path:"*",
        element:<Navigate to='/'/>
    }
]