import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const ErrorPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight}}>
            <Link to='/' className="me-3" style={{display: 'flex', textDecoration: 'none', alignItems: 'center'}}>
                <h1 style={{color: 'black'}}>Error</h1>
                <Button style={{fontSize: 32, marginLeft: 10}}>back</Button>
            </Link>
        </div>
    );
};

export default ErrorPage;