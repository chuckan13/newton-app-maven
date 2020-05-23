const ReactDOM = require("react-dom");

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./views/landing.js";
import HowItWorks from "./views/howitworks.js";
import Register from "./views/register.js";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={Landing} exact />
                        <Route path="/howitworks" component={HowItWorks} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
