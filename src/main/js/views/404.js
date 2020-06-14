import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Logo from "../../resources/static/img/logo.png";
import "../app.scss";

import { FaGrinBeamSweat } from "react-icons/fa";

class Error extends Component {
    render() {
        return (
            <React.Fragment>
                <Container className="mt-5 pt-3">
                    <Row className="justify-content-center">
                        <Logo />
                    </Row>
                    <h1>404</h1>
                    <Row className="align-items-center px-2">
                        <h1 className="display-1 primary">
                            <b>Uh oh...</b>
                        </h1>
                        <FaGrinBeamSweat className="primary ml-5" size={120} />
                    </Row>
                    <h3>The page you're looking for doesn't exist!</h3>
                    <p>
                        Try checking the previous page, or click the button
                        below to go to our homepage.
                    </p>
                    <Row className="justify-content-center justify-content-md-start">
                        <Button href="/" variant="main" className="mt-5">
                            Homepage
                        </Button>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Error;
