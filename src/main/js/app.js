const ReactDOM = require("react-dom");

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./views/landing.js";
import HowItWorks from "./views/howitworks.js";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={Landing} exact />
                        <Route path="/howitworks" component={HowItWorks} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
