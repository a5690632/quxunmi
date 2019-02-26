import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./view/login/";

const Index = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route component={App} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.render(<Index />, document.getElementById("root"));
