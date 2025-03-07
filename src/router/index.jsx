// src/router/index.jsx

import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Study from "../pages/Study";
import Post from "../pages/Post";
import PostForm from "../pages/PostForm";
import PostUpdateForm from "../pages/PostUpdateForm";


// 라우팅 정보를 배열에 미리 저장해 둔다.
const routes = [
    {path: "/", element:<Home/>},
    {path: "/game", element:<Game/>},
    {path: "/study", element:<Study/>},
    {path: "/posts", element:<Post/>},
    {path: "/posts/new", element:<PostForm/>},
    {path: "/posts/:id/edit", element:<PostUpdateForm/>}
];

//createBrowserRouter 에서 createHashRouter 바꾼다면 주소창에 # 로 구분 표시시
const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);

export default router;

