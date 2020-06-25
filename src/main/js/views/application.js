import React, { Component, useState } from "react";

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
    dob: Yup.string()
        .required("Required"),
    ssn: Yup.string()
        .required("Required"),
    address: Yup.string()
        .required("Required"),
    address2: Yup.string()
        .required("Required"),
    city: Yup.string()
        .required("Required"),
    zip: Yup.number()
        .required("Required"),
    terms: Yup.bool().oneOf([true], "You must agree before submitting"),
});

function ApplicationForm() {
    /*    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        dirty,
        isValid,
        isSubmitting,
        setSubmitting,
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
                phone: values.phone,
                password: values.password,
                loanOption1: "LO1",
                loanOption2: "LO2",
                loanOption3: "LO3",
                autopay: false,
                selectedLoan: 0,
                stripeCustomerId: "",
            });
            console.log(data);
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
                        setRegistrationFailed(
                            <div className="invalid-feedback d-block position-static pt-2">
                                The email you chose is already taken.
                            </div>
                        );
                    } else if (data.status == 200) {
                        alert("Account created!");
                    } else {
                        console.log("Unspecified response status received.");
                    }
                })
                .then(() => {
                    setSubmitting(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    }); */

    return (
        <React.Fragment>
            <Form
                noValidate
                onSubmit={handleSubmit}
                className="text-left floating-form mb-5"
            >
                <Form.Row>
                    <Form.Group as={Col} md="6" className="pb-2">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            plaintext
                            readonly
                            defaultValue="fetchFirst"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" className="pb-2">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            plaintext
                            readonly
                            defaultValue="fetchLast"
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group className="pb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        plaintext
                        readonly
                        defaultValue="fetchEmail"
                    />
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Phone Number"
                        isValid={touched.phone && !errors.phone}
                        isInvalid={touched.phone && !!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <hr />

                <Form.Group className="pb-2">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="text"
                        name="ssn"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="MM/DD/YYYY"
                        isValid={touched.dob && !errors.dob}
                        isInvalid={touched.dob && !!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.dob}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                        type="text"
                        name="ssn"
                        value={values.ssn}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="SSN"
                        isValid={touched.ssn && !errors.ssn}
                        isInvalid={touched.ssn && !!errors.ssn}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.ssn}
                    </Form.Control.Feedback>
                </Form.Group>

                <hr />

                <Form.Group className="pb-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="1234 Main St"
                        isValid={touched.address && !errors.address}
                        isInvalid={touched.address && !!errors.address}
                    />
                </Form.Group>

                <Form.Group className="pb-2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="address2"
                        value={values.address2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Apartment, studio, or floor"
                        isValid={touched.address2 && !errors.address2}
                        isInvalid={touched.address2 && !!errors.address2}
                    />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="4" className="pb-2">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.city && !errors.city}
                            isInvalid={touched.city && !!errors.city}
                        />
                    </Form.Group>

                    <Form.Group as={Col} cmd="4" lassName="pb-2">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            as="select"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isValid={touched.state && !errors.state}
                            isInvalid={touched.state && !!errors.state}
                            defaultValue="Choose..."
                        >
                            <option>State 1</option>
                            <option>State 2</option>
                            <option>State 3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" className="pb-2">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                <Form.Group className="pb-0 mb-0">
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
                <Row className="justify-content-center text-center">
                    <Button
                        type="submit"
                        variant="main"
                        disabled={!(isValid && dirty) || isSubmitting}
                        className="mt-5"
                    >
                        {isSubmitting ? "Loading..." : "Submit"}
                    </Button>
                    {registrationFailed}
                </Row>
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
                        <h2 className="text-center mb-4">
                            <b>Application</b>
                        </h2>
                        <ApplicationForm />
                    </Col>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Register;
