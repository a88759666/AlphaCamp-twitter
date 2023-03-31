import type { RouteObject } from "react-router-dom"
import Home from "./pages/home"
import Reply from "./pages/reply"
import Login from "./pages/login"
import Register from "./pages/register"
import Setting from "./pages/setting"
import User from "./pages/user"
import AdminHome from "pages/admin/home"
import AdminLogin from "pages/admin/login"
import AdminUser from "pages/admin/user"
import UserSelfFollowingPage from "pages/user/components/UserSelfFollowingPage"
import UserSelfFollowerPage from "pages/user/components/UserSelfFollowerPage"
import User2 from "pages/otherUser"



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
        path: "/reply/:id",
        element: <Reply />,
        children: []
    },
    {
        path: "/user",
        element: <User />,
        children: []
    },
    {
        path: "/user/:id",
        element: <User2 />,
        children: []
    },
    {
        path: "/user/following",
        element: <UserSelfFollowingPage />,
    },
    {
        path: "/user/follower",
        element: <UserSelfFollowerPage />,
    },
    {
        path: "/admin/home",
        element: <AdminHome />,
        children: []
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
        children: []
    },
    {
        path: "/admin/users",
        element: <AdminUser />,
        children: []
    },

   
]

export default routes

