import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { FaGoogle } from "react-icons/fa";
import styles from "./styles.module.scss";
import GoogleLogin from "react-google-login";
import authApi from "../../../../../../../../../../services/api/authApi";
import { buildModal, buildErrorModal } from "../../../../../../../../../../services/redux/actions";
import store from "../../../../../../../../../../services/redux/store";

const GoogleSync = (props) => {
    const [googleAuth, setGoogleAuth] = useState(props.auth);

    useEffect(() => {
        setGoogleAuth(props.auth);
    }, [props.auth]);

    const responseGoogle = async (res) => {
        const googleId = res["googleId"];
        const isExistedSync = await checkGoogleSync(googleId);

        if (isExistedSync === null) {
            store.dispatch(buildErrorModal());
        } else if (isExistedSync === true) {
            const modal = {
                title: "Đã tồn tại liên kết",
                message:
                    "Tài khoản Google đã được liên kết với người dùng khác",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
        } else {
            syncGoogle(googleId);
        }
    };

    const checkGoogleSync = async (googleId) => {
        try {
            const response = await authApi.checkGoogleSync(googleId);
            return response.data;
        } catch (err) {
            return null;
        }
    };

    const syncGoogle = async (googleId) => {
        await authApi.syncGoogle(googleId);
        setGoogleAuth(true);
    };

    const cancelGoogleSync = async () => {
        await authApi.cancelGoogleSync();
        setGoogleAuth(false);
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
                    onClick={
                        googleAuth ? showCancelSyncModal : renderProps.onClick
                    }
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
