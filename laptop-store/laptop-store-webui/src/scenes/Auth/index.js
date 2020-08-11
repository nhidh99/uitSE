import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./scenes/LoginPage";
import RegisterPage from "./scenes/RegisterPage";
import ForgotPage from "./scenes/ForgotPage";
import styles from './styles.module.scss';

const Auth = () => (
    <Switch>
        <div className={styles.container}>
            <Route exact component={LoginPage} path="/auth/login" />
            <Route exact component={ForgotPage} path="/auth/forgot" />
            <Route exact component={RegisterPage} path="/auth/register" />
        </div>
    </Switch>
);

export default Auth;
