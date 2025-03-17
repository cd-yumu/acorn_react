// src/router/index.jsx

import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Post from "../pages/Post";
import UserDetail from "../pages/UserDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import UserUpdateForm from "../pages/UserUpdateForm";
import UserPwdUpdateForm from "../pages/UserPwdUpdateForm";
import PostForm from "../components/PostForm";
import PostDetail from "../pages/PostDetail";

const routes = [
    {path: "/index.html", element:<Home/>},
    {path: "/", element:<Home/>},
    {path: "/posts", element: <Post/>},
    {path: "/user/detail", element: <ProtectedRoute><UserDetail/></ProtectedRoute>},
    {path: "/user/edit", element: <ProtectedRoute><UserUpdateForm/></ProtectedRoute>},
    {path: "/user/password/edit", element: <ProtectedRoute><UserPwdUpdateForm/></ProtectedRoute>},
    {path: "/posts/new", element: <ProtectedRoute><PostForm/></ProtectedRoute>},
    // 1번 글 - /posts/1 , 2번 글 - /posts/2
    // 검색 키워드가 존재한다면 /posts/2?condition=xxx&keyword=yyy 이런식으로 넘어온다.
    {path: "/posts/:num", element: <PostDetail/>}
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