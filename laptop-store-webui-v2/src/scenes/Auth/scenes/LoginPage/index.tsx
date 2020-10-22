import { Formik } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconInput from "../../../../components/IconInput";
import { authApi } from "../../../../services/api/authApi";
import { createCookie } from "../../../../services/helper/cookie";
import LoginFormValues from "../../../../values/forms/LoginFormValues";
import { SC } from "./styles";

const LoginPage = () => {
    const [status, setStatus] = useState<string | null>(null);

    const submit = useCallback(async (values: LoginFormValues) => {
        try {
            setStatus("Đang xử lí đăng nhập");
            const response = await authApi.postLogin(values);
            createCookie("access_token", response.headers["x-access-token"]);
            localStorage.setItem("refresh_token", response.headers["x-refresh-token"]);
            setStatus("Đăng nhập thành công");
            window.location.href = "/";
        } catch (err) {
            setStatus(err.response.data);
        }
    }, []);

    const initialValues: LoginFormValues = useMemo(
        () => ({
            username: "",
            password: "",
        }),
        []
    );

    return (
        <Formik initialValues={initialValues} onSubmit={submit}>
            <SC.LoginForm>
                <SC.Header>ĐĂNG NHẬP</SC.Header>

                <IconInput
                    icon={FaUser}
                    validate={true}
                    type="text"
                    name="username"
                    placeholder="Tài khoản"
                />

                <IconInput icon={FaLock} type="password" name="password" placeholder="Mật khẩu" />

                <SC.Submit type="submit" value="Đăng nhập" />

                <SC.RegisterRedirect>
                    Chưa có tài khoản? <Link to="/auth/register">Đăng kí ngay</Link>
                </SC.RegisterRedirect>

                {status ? <SC.Status>{status}</SC.Status> : null}
            </SC.LoginForm>
        </Formik>
    );
};

export default LoginPage;
