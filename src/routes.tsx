import type { RouteObject } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import Setting from "./pages/setting"
import User from "./pages/user"
import Admin from "./pages/admin"




const routes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
        children: []
    },
    {
        path: "/register",
        element: <Register />,
        children: []
    },
    {
        path: "/setting",
        element: <Setting />,
        children: []
    },
    {
        path: "/home",
        element: <Home />,
        children: []
    },
    {
        path: "/user",
        element: <User />,
        children: []
    },
    {
        path: "/admin",
        element: <Admin />,
        children: []
    }
   
]

export default routes