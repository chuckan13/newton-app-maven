import React, { Component } from "react";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../app.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Must be a valid email").required("Required"),
    password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    terms: Yup.bool().oneOf([true], "You must agree before submitting"),
});

function RegistrationForm() {
    let registrationFailed = false;
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        dirty,
        isValid,
        isSubmitting,
    } = useFormik({
        initialValues: {
            terms: false,
        },
        validationSchema,
        onSubmit(values) {
            const data = JSON.stringify({
                fullName: values.firstName + " " + values.lastName,
                userName: values.email,
                role: "USER",
                password: values.password,
                loanOption1: "LO1",
                loanOption2: "LO2",
                loanOption3: "LO3",
                autopay: false,
                selectedLoan: 0,
                stripeCustomerId: "",
            });
            fetch(
                "https://newton-server-maven.herokuapp.com/api/users/sign-up",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: data,
                }
            )
                .then((data) => {
                    console.log("Success:", data);
                    if (data.status == 409) {
                        registrationFailed = true;
                    } else if (data.status == 200) {
                        alert("Account created!");
                    } else {
                        console.log("Unspecified response status received.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    });

    return (
        <React.Fragment>
            <Form
                noValidate
                onSubmit={handleSubmit}
                className="text-left floating-form mb-5"
            >
                <h2 className="text-center mb-4">
                    <b>Register</b>
                </h2>
                <Form.Row>
                    <Form.Group as={Col} md="6" className="pb-2">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="First name"
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={touched.firstName && !!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" className="pb-2">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Last name"
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={touched.lastName && !!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group className="pb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email"
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm password"
                        isValid={
                            touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="pb-2">
                    <Form.Check
                        required
                        name="terms"
                        label="I agree to terms and conditions"
                        value={values.terms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.terms && !!errors.terms}
                        id="terms"
                    />
                </Form.Group>
                <Row className="justify-content-center pb-2">
                    <Button
                        type="submit"
                        variant="main"
                        disabled={!(isValid && dirty) || isSubmitting}
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </Button>
                </Row>
                {registrationFailed && (
                    <Form.Control.Feedback type="invalid">
                        The email you chose is already taken. Please use a different email or sign in with the email above.
                    </Form.Control.Feedback>
                )}
            </Form>
        </React.Fragment>
    );
}

class Register extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <NavBar />
                    <Col lg={4} md={5} sm={7} className="mx-auto mt-4">
                        <RegistrationForm />
                    </Col>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Register;
