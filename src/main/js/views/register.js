import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "../app.scss";

class Register extends Component {
    render() {
        return (
            <Container fluid style={{ height: "100vh", padding: 0 }}>
                <NavBar />
                <Col lg={4} md={5} sm={7} className="mx-auto mt-5">
                    <Form className="floating-form">
                        <h2 className="text-center mb-4">
                            <b>Register</b>
                        </h2>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="agreeToTerms">
                            <Form.Check
                                type="checkbox"
                                label="I agree to Terms and Policy."
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <div className="position-absolute" style={{ bottom: 0, width: "100%" }}>
                    <Footer />
                </div>
            </Container>
        );
    }
}

export default Register;
