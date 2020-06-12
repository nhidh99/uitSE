import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import { FaUser, FaLock, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createCookie } from "../../../../services/helper/cookie";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";

const LoginPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setError(null);
        setLoading(true);

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await fetch("/cxf/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            const token = await response.text();
            createCookie("access_token", token, 1);
            window.location.href = "/";
        } else {
            let error = null;
            switch (response.status) {
                case 401:
                    error = "Tài khoản hoặc mật khẩu không chính xác";
                    break;
                default:
                    error = "Lỗi hệ thống";
                    break;
            }
            setError(error);
            setLoading(false);
        }
    };

    const responseFacebook = async (res) => {
        const facebookId = res["id"];
        const response = await fetch("/cxf/api/auth/facebook/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: facebookId }),
        });
        if (response.ok) {
            const token = await response.text();
            createCookie("access_token", token, 1);
            window.location.href = "/";
        } else {
            let error = "";
            switch (response.status) {
                case 404:
                    error = "Không tìm thấy tài khoản liên kết";
                    break;
                default:
                    error = "Lỗi hệ thống";
                    break;
            }
            setError(error);
            setLoading(false);
        }
    };

    const responseGoogle = async (res) => {
        const googleId = res["googleId"];
        const response = await fetch("/cxf/api/auth/google/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: googleId }),
        });
        if (response.ok) {
            const token = await response.text();
            createCookie("access_token", token, 1);
            window.location.href = "/";
        } else {
            let error = "";
            switch (response.status) {
                case 400:
                    error = "Không tìm thấy tài khoản liên kết";
                    break;
                default:
                    error = "Lỗi hệ thống";
                    break;
            }
            setError(error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.loginForm}>
                <header>ĐĂNG NHẬP</header>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaUser />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Tài khoản"
                        className={styles.borderInputRight}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className={styles.borderInputLeft}>
                            <FaLock />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        className={styles.borderInputRight}
                    />
                </InputGroup>

                <Button
                    color="secondary"
                    className={styles.button}
                    onClick={login}
                    disabled={loading}
                >
                    Đăng nhập
                </Button>

                <p>
                    Chưa có tài khoản?&nbsp;
                    <Link to="/auth/register">Đăng kí ngay</Link>
                    &nbsp;|&nbsp;
                    <Link to="/auth/forgot">Quên mật khẩu</Link>
                </p>

                {error ? <p className={styles.error}>{error}</p> : null}
            </div>

            <GoogleLogin
                clientId="273728474565-jtpupgab0il3lrc0qdlkm88e6ijq3nev.apps.googleusercontent.com"
                fields="name"
                onSuccess={responseGoogle}
                render={(renderProps) => (
                    <button
                        className={`${styles.altBtn} ${styles.googleBtn}`}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <span className={styles.iconLogin}>
                            <FaGoogle size={25} color="#white" />
                        </span>
                        Đăng nhập với Google
                    </button>
                )}
            />

            <FacebookLogin
                appId={1961661687297528}
                fields="name"
                callback={responseFacebook}
                render={(renderProps) => (
                    <button
                        className={`${styles.altBtn} ${styles.facebookBtn}`}
                        onClick={renderProps.onClick}
                    >
                        <span className={styles.iconLogin}>
                            <FaFacebookF color="white" size={25} onClick={renderProps.onClick} />
                        </span>
                        Đăng nhập với Facebook
                    </button>
                )}
            />
        </div>
    );
};

export default LoginPage;
