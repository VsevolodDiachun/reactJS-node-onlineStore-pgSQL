import {useSelector} from "react-redux";
import {authorizedRoutes, unAuthorizedRoutes} from "./routes";
import {createBrowserRouter} from "react-router-dom";

export function useAppRouter(){
    const {isAuth} = useSelector(state => state.userReducer)
    const routes = isAuth ? authorizedRoutes : unAuthorizedRoutes
    return createBrowserRouter(routes)
}