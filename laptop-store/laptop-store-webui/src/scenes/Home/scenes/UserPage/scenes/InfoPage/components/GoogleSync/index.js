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
        const isExistedSync = await checkGoogleSync(googleId);

        if (isExistedSync === null) {
            const modal = {
                title: "Lỗi hệ thống",
                message: "Không thể xử lí yêu cầu",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
            return;
        }

        if (isExistedSync === true) {
            const modal = {
                title: "Đã tồn tại liên kết",
                message: "Tài khoản Google đã được liên kết với người dùng khác",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
            return;
        }

        syncGoogle(googleId);
    };

    const checkGoogleSync = async (googleId) => {
        const response = await fetch("/cxf/api/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify({ id: googleId }),
        });
        return response.ok ? await response.json() : null;
    };

    const syncGoogle = async (googleId) => {
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
        } else {
            const modal = {
                title: "Lỗi hệ thống",
                message: "Không thể xử lí yêu cầu",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
        }
    };

    const cancelGoogleSync = async () => {
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
            confirm: () => cancelGoogleSync,
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
