import React, { Component } from 'react';
import NavBar from './components/navbar.js';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Check from 'react-bootstrap/FormCheck';
import Collapse from 'react-bootstrap/Collapse';

import { FaTag, FaUser } from 'react-icons/fa';

import '../app.scss';

class Dashboard extends Component {
	constructor() {
		super();

		this.state = {
			user: {
				autopay: false,
				fullName: 'Loading name...',
				id: -1,
				loanOption1: 'Loading LO1...',
				loanOption2: 'Loading LO2...',
				loanOption3: 'Loading LO3...',
				password: 'Loading password...',
				role: 'Loading role...',
				selectedLoan: 0,
				stripeCustomerId: '',
				userName: 'Loading email...'
			},
			loan: {
				id: 0,
				amountTotal: 0,
				amountPaid: 0,
				apr: 0,
				totalMonths: 0,
				pastDatesPaid: [],
				nextPaymentAmount: 0,
				nextPaymentDate: 'Loading payment date...',
				processedDate: 'Loading processed date...',
				medicalCenter: 'Loading medical center...',
				userId: -1
			},
			accountDetailsOpen: false
		};
	}

	componentDidMount() {
		fetch('https://newton-server-maven.herokuapp.com/api/users')
			.then(response => response.json())
			.then(data => this.setState({ user: data }));

		fetch('https://newton-server-maven.herokuapp.com/api/users/selectedloan')
			.then(response => response.json())
			.then(data => this.setState({ loan: data }));
	}

	render() {
		const { user, loan, accountDetailsOpen } = this.state;
		console.log(user, loan);

		const accountInfo = (
			<React.Fragment>
				<div className="my-1">
					<b>{user.fullName}</b>
				</div>
				<hr style={{ borderColor: '#C5C5C5' }} />
				<div className="mt-1">
					<b>
						<i>Email</i>
					</b>
				</div>
				{user.userName}
				<br />
				<div className="mt-1">
					<b>
						<i>Phone number</i>
					</b>
				</div>{' '}
				732-123-4567<br />
				<a className="my-1" href="#personalInfo">
					<u>Edit personal information</u>
				</a>
				<hr style={{ borderColor: '#C5C5C5' }} />
				<div className="mt-1">
					<b>
						<i>Bank</i>
					</b>
				</div>{' '}
				TD Bank<br />
				<div className="mt-1">
					<b>
						<i>Account #</i>
					</b>
				</div>{' '}
				xxx-4120<br />
				<a className="mt-1" href="#bankInfo">
					<u>Edit bank information</u>
				</a>
				<a className="mt-1" href="#paymentMethod">
					<u>Register a new payment method</u>
				</a>
			</React.Fragment>
		);

		return (
			<React.Fragment>
				<div className="d-flex" style={{ flexFlow: 'column', height: '100%', width: '100vw' }}>
					<NavBar simple background />
					<Row style={{ width: '100%', height: '100%', flexGrow: '1' }} className="mx-auto">
						<Col
							xs={4}
							style={{ backgroundColor: '#ddd' }}
							className="d-none d-md-flex justify-content-center align-items-center"
						>
							<Row>
								<Card
									className="m-0 px-3 py-4 mb-5"
									style={{
										borderRadius: '10px',
										boxShadow: '1px 1px 3px 1px #9E9E9E'
									}}
								>
									<h5 className="primary">
										<b>Account Details</b>
									</h5>
									{accountInfo}
								</Card>
							</Row>
							<Row className="py-2 px-5" style={{ position: 'absolute', bottom: '0px' }}>
								<b>For further assistance:</b>
								Give us a call at 732-987-6543 or email us at help@covered.com
							</Row>
						</Col>
						<Col md={8} xs={12}>
							<div className="py-4 px-0 px-sm-4">
								<Row className="p-4 d-flex d-md-none justify-content-center align-items-center">
									<Button
										onClick={() => this.setState({ accountDetailsOpen: !accountDetailsOpen })}
										aria-controls="collapse-content"
										aria-expanded={accountDetailsOpen}
										className="primary"
										variant="main"
									>
										<FaUser size={20} className="d-inline mr-2 mb-1" color="white" /> Account
										Details
									</Button>
									<Collapse in={this.state.accountDetailsOpen}>
										<Card
											id="collapse-content"
											className="mt-3 px-3 py-4"
											style={{
												borderRadius: '10px',
												boxShadow: '1px 1px 3px 1px #9E9E9E'
											}}
										>
											{accountInfo}
										</Card>
									</Collapse>
								</Row>
								<Row className="p-4 d-flex justify-content-between align-items-center">
									<h4 className="m-0 mt-1">
										<b>{loan.medicalCenter}</b>
									</h4>
									<div className="d-flex mt-2">
										<Check />Autopay: {user.autopay ? 'On' : 'Off'}
									</div>
								</Row>
								<hr style={{ borderColor: '#C5C5C5' }} />
								<Row className="px-4 py-2 d-flex justify-content-lg-between justify-content-center align-items-center">
									<h5 className="m-0">
										<b>${loan.nextPaymentAmount}</b> due on <b>{loan.nextPaymentDate}</b>
									</h5>
									<Button variant="main mt-3 mt-lg-0">Make one-time payment</Button>
								</Row>
								<hr style={{ borderColor: '#C5C5C5' }} />
								<Row className="p-4 align-items-center">
									<FaTag size={20} className="d-inline" />
									<h6 className="ml-3 mb-0">PURCHASE DETAILS</h6>
								</Row>
								<Row className="p-4">
									<Container>
										TOTAL OF PAYMENTS
										<br />
										<b>${loan.amountTotal}</b>
										<ProgressBar
											now={loan.amountTotal > 0 ? loan.amountPaid / loan.amountTotal * 100 : 40}
											className="mt-3"
											variant="custom"
										/>
										<Row className="d-flex m-0 py-2" style={{ justifyContent: 'space-between' }}>
											<div style={{ textAlign: 'left' }}>
												PAID<br />
												<b>${loan.amountPaid}</b>
											</div>
											<div style={{ textAlign: 'right' }}>
												REMAINING<br />
												<b>${loan.amountTotal - loan.amountPaid}</b>
											</div>
										</Row>
									</Container>
								</Row>
								<Container className="mt-4">
									LOAN TIMELINE
									<br />
									<Container className="d-flex" style={{ overflowX: 'auto' }}>
										<span className="p-4" key={0} style={{ minWidth: '150px' }}>
											Processed:<br />
											{loan.processedDate}
										</span>
										{loan.pastDatesPaid.map((date, index) => (
											<span className="p-4" style={{ minWidth: '150px' }} key={index + 1}>
												Paid:<br />
												{date}
											</span>
										))}
									</Container>
								</Container>
							</div>
						</Col>
					</Row>
				</div>
			</React.Fragment>
		);
	}
}

export default Dashboard;
