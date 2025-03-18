import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

const routes = [
    {path:"/", element: <Home/>},
    {path: "/index.html", element:<Home/>}
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