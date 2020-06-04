import React, { Component } from 'react';

import NavBar from './components/navbar.js';
import Footer from './components/footer.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../app.scss';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	username: Yup.string().email('Must be a valid email').required('Required'),
	password: Yup.string().required('Required')
});

function LoginForm() {
	const {
		handleSubmit,
		handleChange,
		values,
		errors,
		touched,
		handleBlur,
		dirty,
		isValid,
		isSubmitting
	} = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema,
		onSubmit(values) {
			// let formData = new FormData();
			// formData.append('username', values.username);
			// formData.append('password', values.password);
			// const data = new URLSearchParams(formData);
			const data = JSON.stringify({
				fullName: 'Niko Fotopoulos',
				userName: values.username,
				password: values.password,
				role: 'USER',
				loanOption1: '',
				loanOption2: '',
				loanOption3: '',
				stripeCustomerId: '',
				autopay: false,
				selectedLoan: 0
			});
			// const loginData = JSON.stringify(values);
			// console.log('LOG IN VALUES');
			// console.log(formData);
			// console.log(data);
			// debugger;
			fetch('https://newton-server-maven.herokuapp.com/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: data
			})
				.then(response => {
					console.log('Success');
					console.log(response.url);
					window.location.replace(response.url);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	});
	return (
		<Form noValidate onSubmit={handleSubmit} className="text-left floating-form mb-5">
			<h2 className="text-center mb-4">
				<b>Login</b>
			</h2>
			<Form.Group className="pb-2">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					name="username"
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Email"
					isValid={touched.username && !errors.username}
					isInvalid={touched.username && !!errors.username}
				/>
				<Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
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
				<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
			</Form.Group>
			<Row className="justify-content-center">
				<Button type="submit" variant="main" disabled={!(isValid && dirty) || isSubmitting}>
					{isSubmitting ? 'Loading...' : 'Submit'}
				</Button>
			</Row>
		</Form>
	);
}

class Login extends Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<NavBar />
					<Col lg={4} md={5} sm={7} className="mx-auto mt-4">
						<LoginForm />
					</Col>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Login;
