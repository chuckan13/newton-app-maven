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
    // loanoption: Yup.bool().oneOf([1, 2, 3], "You must choose an option"),
});

function LoanOptionsForm(props) {
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
        setSubmitting,
    } = useFormik({
        initialValues: {
            loanoption: null,
        },
        validationSchema,
        onSubmit(values) {
            const data = JSON.stringify({
                loanoption: values.loanoption
            });
            console.log(data);
            fetch(
                "https://newton-server-maven.herokuapp.com/",
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
                    console.log("Test:", data);
                    props.onFinish(true);
                })
                .then(() => {
                    setSubmitting(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    });

    return (
        <React.Fragment>
            <Form
                onSubmit={handleSubmit}
                className="text-left floating-form mb-5"
            >
                <Form.Group className="pb-2">
                    <Form.Label>Loan Option</Form.Label>
                    <Form.Control
                        as="select"
                        name="loanoption"
                        value={values.loanoption}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.loanoption && !errors.loanoption}
                        isInvalid={touched.loanoption && !!errors.loanoption}
                        defaultValue="Choose..."
                    />
                        <option value="1">{props.options.op1}</option>
                        <option value="2">{props.options.op2}</option>
                        <option value="3">{props.options.op3}</option>
                    <Form.Control.Feedback type="invalid">
                        {errors.loanoption}
                    </Form.Control.Feedback>
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
                </Row>
            </Form>
        </React.Fragment>
    );
}

class LoanOptions extends Component {

    constructor() {
        super();

        this.state = {
            options: {
                op1: 'Loading option 1...',
                op2: 'Loading option 2...',
                op3: 'Loading option 3...',
            },
        };
    }

    componentDidMount() {
        fetch('https://newton-server-maven.herokuapp.com/api/loans')
            .then(response => response.json())
            .then(data => this.setState({ options: data }));
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <NavBar />
                    <Col lg={4} md={5} sm={7} className="mx-auto mt-4">
                        <LoanOptionsForm />
                    </Col>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default LoanOptions;