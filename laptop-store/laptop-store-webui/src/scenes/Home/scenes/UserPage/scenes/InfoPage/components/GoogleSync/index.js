import React, { useState, useEffect } from "react";
import { getCookie } from "../../../../../../../../services/helper/cookie";
import { buildModal } from "../../../../../../../../services/redux/actions";
import store from "../../../../../../../../services/redux/store";
import { Button } from "reactstrap";
import { FaGoogle } from "react-icons/fa";
import styles from "./styles.module.scss";
import GoogleLogin from "react-google-login";

const GoogleSync = (props) => {
    const [googleAuth, setGoogleAuth] = useState(props.auth);

    useEffect(() => {
        setGoogleAuth(props.auth);
    }, [props.auth]);

    const responseGoogle = async (res) => {
        const googleId = res["googleId"];
        const response = await fetch("/cxf/api/auth/google/sync", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify({ id: googleId }),
        });
        if (response.ok) {
            setGoogleAuth(true);
        }
    };

    const cancelSyncGoogle = async () => {
        const response = await fetch("/cxf/api/auth/google/sync", {
            method: "DELETE",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        if (response.ok) {
            setGoogleAuth(false);
        }
    };

    const showCancelSyncModal = () => {
        const modal = {
            title: "Hủy liên kết Google",
            message: "Xác nhận hủy liên kết tài khoản Google?",
            confirm: () => cancelSyncGoogle,
        };
        store.dispatch(buildModal(modal));
    };

    return googleAuth === null ? null : (
        <GoogleLogin
            clientId="273728474565-jtpupgab0il3lrc0qdlkm88e6ijq3nev.apps.googleusercontent.com"
            fields="name"
            onSuccess={responseGoogle}
            render={(renderProps) => (
                <Button
                    className={styles.button}
                    onClick={googleAuth ? showCancelSyncModal : renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    <FaGoogle className={styles.icon} />{" "}
                    {googleAuth ? "Hủy kết nối Google" : "Kết nối Google"}
                </Button>
            )}
        />
    );
};

export default GoogleSync;
