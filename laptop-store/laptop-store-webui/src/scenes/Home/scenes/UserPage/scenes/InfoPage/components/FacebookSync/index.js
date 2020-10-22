import React, { useState, useEffect } from "react";
import { buildModal, buildErrorModal } from "../../../../../../../../services/redux/actions";
import store from "../../../../../../../../services/redux/store";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "reactstrap";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";
import authApi from "../../../../../../../../services/api/authApi";

const FacebookSync = (props) => {
    const [fbAuth, setFbAuth] = useState(props.auth);

    useEffect(() => {
        setFbAuth(props.auth);
    }, [props.auth]);

    const responseFacebook = async (res) => {
        const facebookId = res["id"];
        const isExistedSync = await checkFacebookSync(facebookId);

        if (isExistedSync === null) {
            store.dispatch(buildErrorModal());
        } else if (isExistedSync === true) {
            const modal = {
                title: "Đã tồn tại liên kết",
                message: "Tài khoản Facebook đã được liên kết với người dùng khác",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
        } else {
            syncFacebook(facebookId);
        }
    };

    const checkFacebookSync = async (facebookId) => {
        try {
            const response = await authApi.checkFacebookSync(facebookId);
            return response.data;
        } catch (err) {
            console.log("fail");
            return null;
        }
    };

    const syncFacebook = async (facebookId) => {
        await authApi.syncFacebook(facebookId);
        setFbAuth(true);
    };

    const cancelFacebookSync = async () => {
        await authApi.cancelFacebookSync();
        setFbAuth(false);
    };

    const showCancelSyncModal = () => {
        const modal = {
            title: "Hủy liên kết Facebook",
            message: "Xác nhận hủy liên kết tài khoản Facebook?",
            confirm: () => cancelFacebookSync,
        };
        store.dispatch(buildModal(modal));
    };

    return fbAuth === null ? null : (
        <FacebookLogin
            appId={1961661687297528}
            fields="name"
            callback={responseFacebook}
            render={(renderProps) => (
                <Button
                    type="submit"
                    className={styles.button}
                    color="primary"
                    onClick={fbAuth ? showCancelSyncModal : renderProps.onClick}
                >
                    <FaFacebookF className={styles.icon} />{" "}
                    {fbAuth ? "Hủy kết nối Facebook" : "Kết nối Facebook"}
                </Button>
            )}
        />
    );
};

export default FacebookSync;
