import { Formik } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import { FaLock, FaMailBulk, FaPhone, FaTransgender, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconInput from "../../../../components/IconInput";
import { SC } from "./styles";
import * as Yup from "yup";
import { authApi } from "../../../../services/api/authApi";
import { createCookie } from "../../../../services/helper/cookie";
import RegisterFormValues from "../../../../values/forms/RegisterFormValues";

const RegisterPage = () => {
    const [status, setStatus] = useState<string | null>(null);

    const schema = useMemo(
        () =>
            Yup.object({
                name: Yup.string()
                    .max(30, "Họ tên tối đa 30 kí tự")
                    .required("Họ tên không được để trống"),
                email: Yup.string()
                    .max(80, "Email tối đa 80 kí tự")
                    .required("Email không được để trống")
                    .matches(/(.+)@(.+){2,}\.(.+){2,}/, "Email không hợp lệ"),
                phone: Yup.string()
                    .matches(/^[0-9]{10}$/, "Số điện thoại gồm 10 chữ số")
                    .required("Số điện thoại không được để trống"),
                gender: Yup.string().required("Giới tính không được để trống"),
                username: Yup.string()
                    .min(6, "Tên tài khoản tối thiểu 6 kí tự")
                    .max(30, "Tên tài khoản tối đa 30 kí tự")
                    .required("Tên tài khoản không được để trống")
                    .matches(/^(?!.*[_.]{2})[^_.].*[^_.]$/, "Tên tải khoản không hợp lệ"),
                password: Yup.string()
                    .min(12, "Mật khẩu tối thiểu 12 kí tự")
                    .max(80, "Mật khẩu tối đa 80 kí tự")
                    .required("Mật khẩu không được để trống"),
                confirm: Yup.string()
                    .oneOf([Yup.ref("password")], "Mật khẩu nhập lại không khớp")
                    .required("Mật khẩu không được để trống"),
            }),
        []
    );

    const submit = useCallback(async (values: RegisterFormValues) => {
        try {
            setStatus("Đang xử lí đăng kí...");
            const registerResponse = await authApi.postRegister(values);
            const loginResponse = await authApi.postLogin({
                username: values.username,
                password: values.password,
            });
            createCookie("access_token", loginResponse.headers["x-access-token"]);
            localStorage.setItem("refresh_token", loginResponse.headers["x-refresh-token"]);

            setStatus(registerResponse.data);
            window.location.href = "/";
        } catch (err) {
            setStatus(err.response.data);
        }
    }, []);

    const initialValues: RegisterFormValues = useMemo(
        () => ({
            name: "",
            gender: "MALE",
            phone: "",
            email: "",
            username: "",
            password: "",
            confirm: "",
        }),
        []
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={schema}
            isInitialValid={schema.isValidSync(initialValues)}
        >
            {({ isValid, isSubmitting }) => (
                <SC.RegisterForm>
                    <SC.Header>ĐĂNG KÍ</SC.Header>

                    <IconInput
                        icon={FaUser}
                        type="text"
                        name="name"
                        placeholder="Họ tên"
                        maxLength={30}
                        validate
                    />

                    <IconInput
                        icon={FaMailBulk}
                        type="text"
                        name="email"
                        placeholder="Email"
                        maxLength={80}
                        validate
                    />

                    <IconInput
                        icon={FaPhone}
                        type="text"
                        name="phone"
                        placeholder="Điện thoại"
                        maxLength={10}
                        validate
                    />

                    <IconInput
                        icon={FaTransgender}
                        type="text"
                        name="gender"
                        component="select"
                        defaultValue=""
                        validate
                    >
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </IconInput>

                    <IconInput
                        icon={FaUser}
                        type="text"
                        name="username"
                        placeholder="Tài khoản"
                        maxLength={30}
                        validate
                    />

                    <IconInput
                        icon={FaLock}
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        maxLength={80}
                        validate
                    />

                    <IconInput
                        icon={FaLock}
                        type="password"
                        name="confirm"
                        placeholder="Nhập lại mật khẩu"
                        maxLength={80}
                        validate
                    />

                    <SC.Submit type="submit" disabled={!isValid || isSubmitting}>
                        Đăng kí
                    </SC.Submit>

                    <SC.LoginRedirect>
                        Đã có tài khoản? <Link to="/auth/login">Đăng nhập</Link>
                    </SC.LoginRedirect>

                    {status ? <SC.Status>{status}</SC.Status> : null}
                </SC.RegisterForm>
            )}
        </Formik>
    );
};

export default RegisterPage;
