// src/router/index.jsx

import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Post from "../pages/Post";
import UserDetail from "../pages/UserDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import UserUpdateForm from "../pages/UserUpdateForm";
import UserPwdUpdateForm from "../pages/UserPwdUpdateForm";

const routes = [
    {path: "/index.html", element:<Home/>},
    {path: "/", element:<Home/>},
    {path: "/posts", element: <Post/>},
    {path: "/user/detail", element: <ProtectedRoute><UserDetail/></ProtectedRoute>},
    {path: "/user/edit", element: <ProtectedRoute><UserUpdateForm/></ProtectedRoute>},
    {path: "/user/password/edit", element: <ProtectedRoute><UserPwdUpdateForm/></ProtectedRoute>}
];

const router = createHashRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/",
            path: route.path === "/" ? undefined : route.path,
            element: route.element
        }
    })
}]);

export default router;