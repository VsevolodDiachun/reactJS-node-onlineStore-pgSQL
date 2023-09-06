import Admin from "../pages/Admin";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Basket from "../pages/Basket";
import Shop from "../pages/Shop";
import Auth from "../pages/Auth";
import DevicePage from "../pages/DevicePage";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";


const protectedRoutes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {path: ADMIN_ROUTE, element: <Admin />},
            {path: BASKET_ROUTE, element: <Basket />}
        ]
    }
]

const publicRoutes = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage/>,
        children: [
            {path: SHOP_ROUTE, element: <Shop />},
            {path: DEVICE_ROUTE + "/:id", element: <DevicePage />},
            {path: LOGIN_ROUTE, element: <Auth />},
            {path: REGISTRATION_ROUTE, element: <Auth />},
        ]
    }
]

export const authorizedRoutes = [...publicRoutes, ...protectedRoutes]

export const unAuthorizedRoutes = [ ...publicRoutes]