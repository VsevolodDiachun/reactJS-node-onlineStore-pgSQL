/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import {RouterProvider} from "react-router";
import {useAppRouter} from "./routes/AppRouter";
import {useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {useAction} from "./hooks/useAction";
import jwt_decode from "jwt-decode";

function App() {
  const {ASetUser, ASetAuth, ASetEmail, ASetUserId, ASetRole} = useAction()
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    //setTimeout(() => {   // DEV
      if (token) {
        check().then(data => {
          ASetUser(true)
          ASetAuth(true)
          const decode = jwt_decode(token)
          ASetEmail(decode.email)
          ASetUserId(decode.id)
          ASetRole(decode.role)
        }).finally(() => setLoading(false))
      }
      if (!token) {
        setLoading(false)
      }
    //}, 500)   // DEV
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