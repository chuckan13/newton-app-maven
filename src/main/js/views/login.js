import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../app.scss";

class Login extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <NavBar />
                    <Col lg={4} md={5} sm={7} className="mx-auto mt-5">
                        <Form className="floating-form">
                            <h2 className="text-center mb-4">
                                <b>Login</b>
                            </h2>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Row className="justify-content-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Login;
