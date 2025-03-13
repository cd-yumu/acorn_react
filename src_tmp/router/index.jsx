// src/router/index.jsx

import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Post from "../pages/Post";

const routes = [
    {path: "/index.html", element:<Home/>},
    {path: "/", element:<Home/>},
    {path: "/posts", element: <Post/>}
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