const ReactDOM = require('react-dom');

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './views/landing.js';
import HowItWorks from './views/howitworks.js';
import Register from './views/register.js';
import Login from './views/login.js';
import Dashboard from './views/login.js';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Landing} exact />
					<Route path="/howitworks" component={HowItWorks} />
					<Route path="/register" component={Register} />
					<Route path="/loginpage" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
