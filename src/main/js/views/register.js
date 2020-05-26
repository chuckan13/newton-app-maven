import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../app.scss";

class Register extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <Col lg={4} md={5} sm={7} className="mx-auto mt-5">
                    <Form className="floating-form mb-5">
                        <h2 className="text-center mb-4">
                            <b>Register</b>
                        </h2>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                        <Form.Group controlId="agreeToTerms">
                            <Form.Check
                                type="checkbox"
                                label="I agree to Terms and Policy."
                            />
                        </Form.Group>
                        <Row className="justify-content-center">
                            <Button variant="main" type="submit">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Col>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Register;
