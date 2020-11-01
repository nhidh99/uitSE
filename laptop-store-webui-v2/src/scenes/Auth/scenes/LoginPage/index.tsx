import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconInput from "../../../../components/IconInput";
import { authApi } from "../../../../services/api/authApi";
import { createCookie } from "../../../../services/helper/cookie";
import LoginFormValues from "../../../../values/forms/LoginFormValues";
import { SC } from "./styles";

const LoginPage = () => {
    const [status, setStatus] = useState<string | null>(null);

    const submit = useCallback(async (data: LoginFormValues) => {
        try {
            setStatus("Đang xử lí đăng nhập");
            const response = await authApi.postLogin(data);
            createCookie("access_token", response.headers["x-access-token"]);
            localStorage.setItem("refresh_token", response.headers["x-refresh-token"]);
            setStatus("Đăng nhập thành công");
            window.location.href = "/";
        } catch (err) {
            setStatus(err.response.data);
        }
    }, []);

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <SC.LoginForm onSubmit={handleSubmit(submit)}>
            <SC.Header>ĐĂNG NHẬP</SC.Header>

            <IconInput
                icon={<FaUser />}
                component={
                    <input type="text" name="username" placeholder="Tài khoản" ref={register} />
                }
            />

            <IconInput
                icon={<FaLock />}
                component={
                    <input type="password" name="username" placeholder="Mật khẩu" ref={register} />
                }
            />

            <SC.Submit disabled={formState.isSubmitting} type="submit">
                Đăng nhập
            </SC.Submit>

            <SC.RegisterRedirect>
                Chưa có tài khoản? <Link to="/auth/register">Đăng kí ngay</Link>
            </SC.RegisterRedirect>

            {status ? <SC.Status>{status}</SC.Status> : null}
        </SC.LoginForm>
    );
};

export default LoginPage;
