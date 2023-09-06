import './App.css';
import {RouterProvider} from "react-router";
import {useAppRouter} from "./routes/AppRouter";
import {useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {useAction} from "./hooks/useAction";
import jwt_decode from "jwt-decode";
import {useSelector} from "react-redux";

function App() {
  const {ASetUser, ASetAuth, ASetEmail, ASetUserId, ASetBasket, ASetBasketCount, ASetBrands, ASetRole} = useAction()
  const {isUserId} = useSelector(state => state.userReducer)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')



  useEffect(() => {
    setTimeout(() => {   // DEV
      if (token) {
        check().then(data => {
          ASetUser(true)
          ASetAuth(true)
          if (token) {
            const decode = jwt_decode(token)
            ASetEmail(decode.email)
            ASetUserId(decode.id)
            ASetRole(decode.role)
          }
        }).finally(() => setLoading(false))
      }
      if (!token) {
        setLoading(false)
      }
    }, 500)   // DEV
  }, [])

  const router = useAppRouter()

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
        <RouterProvider router={router}/>
  );
}

export default App;