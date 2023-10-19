/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {useAction} from "../hooks/useAction";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

const Auth = () => {
    const {isAuth} = useSelector(state => state.userReducer)
    const {ASetUser, ASetAuth, ASetEmail, ASetUserId} = useAction()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [])

    const submit = async (e) => {
        let data

        try {
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            ASetUser(data)
            ASetEmail(email)
            ASetAuth(true)
            const decode = jwt_decode(data)
            ASetUserId(decode.id)
            toast.success("success")
        } catch (e) {
            toast.error("ERROR: authorization")
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight -54}}
        >
            <Card style={{width: "600px"}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизація' : 'Реєстрація'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder='Введіть ваш email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-3 ">
                        {isLogin
                            ?
                            <div>
                                Нема акаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструватися</NavLink>
                            </div>
                            :
                            <div>
                                Є акаунт? <NavLink to={LOGIN_ROUTE}>Увійти</NavLink>
                            </div>
                        }
                        <Button
                            className="align-self-end"
                            variant={"outline-success"}
                            type={"submit"}
                            onClick={() => submit()}
                        >
                            {isLogin ? "Увійти" : "Зареєструватися"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;