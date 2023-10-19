import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useAction} from "../hooks/useAction";
import {useNavigate} from "react-router-dom";
const NavBar = () => {
    const location = useLocation()
    const {isAuth, isEmail, isRole} = useSelector(state => state.userReducer)
    const {ASetAuth, ASetUser, ASetUserId} = useAction()
    const navigate = useNavigate()

    const logOut = () => {
        ASetUser({})
        ASetAuth(false)
        ASetUserId(null)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none', margin: '0px 10px'}} to={SHOP_ROUTE}>baryga.net</NavLink>
                {isAuth ?
                    <Nav>
                        <h5 style={{color: 'white', margin: 'auto'}}>
                            {isEmail}
                        </h5>
                        {isRole === 'ADMIN' && <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                            className="ms-2"
                        >
                            Адмін панель
                        </Button>}
                        {location.pathname !== '/basket' && <Button
                            variant={"outline-light"}
                            onClick={() => navigate(BASKET_ROUTE)}
                            className="ms-2"
                        >
                            Корзина
                        </Button>}

                        <Button
                            variant={"outline-light"}
                            className="ms-2"
                            onClick={() => logOut()}
                        >
                            Вийти
                        </Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;