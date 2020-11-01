import React, { useCallback, useMemo, useState } from "react";
import { FaLock, FaMailBulk, FaPhone, FaTransgender, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconInput from "../../../../components/IconInput";
import { SC } from "./styles";
import * as Yup from "yup";
import { authApi } from "../../../../services/api/authApi";
import { createCookie } from "../../../../services/helper/cookie";
import RegisterFormValues from "../../../../values/forms/RegisterFormValues";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

    const { register, handleSubmit, formState, errors } = useForm({
        defaultValues: {
            name: "",
            gender: "MALE",
            phone: "",
            email: "",
            username: "",
            password: "",
            confirm: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    return (
        <SC.RegisterForm onSubmit={handleSubmit(submit)}>
            <SC.Header>ĐĂNG KÍ</SC.Header>

            <IconInput
                icon={<FaUser />}
                component={
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ tên"
                        maxLength={30}
                        ref={register}
                    />
                }
                errorMessage={errors.name?.message}
            />

            <IconInput
                icon={<FaMailBulk />}
                component={
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        maxLength={80}
                        ref={register}
                    />
                }
                errorMessage={errors.email?.message}
            />

            <IconInput
                icon={<FaPhone />}
                component={
                    <input
                        type="text"
                        name="phone"
                        placeholder="Điện thoại"
                        maxLength={10}
                        ref={register}
                    />
                }
                errorMessage={errors.phone?.message}
            />

            <IconInput
                icon={<FaTransgender />}
                component={
                    <select name="gender" ref={register}>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                }
                noValidate
            />

            <IconInput
                icon={<FaUser />}
                component={
                    <input
                        type="text"
                        name="username"
                        placeholder="Tài khoản"
                        maxLength={30}
                        ref={register}
                    />
                }
                errorMessage={errors.username?.message}
            />

            <IconInput
                icon={<FaLock />}
                component={
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        maxLength={80}
                        ref={register}
                    />
                }
                errorMessage={errors.password?.message}
            />

            <IconInput
                icon={<FaLock />}
                component={
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Nhập lại mật khẩu"
                        maxLength={80}
                        ref={register}
                    />
                }
                errorMessage={errors.confirm?.message}
            />

            <SC.Submit type="submit" disabled={formState.isSubmitting}>
                Đăng kí
            </SC.Submit>

            <SC.LoginRedirect>
                Đã có tài khoản? <Link to="/auth/login">Đăng nhập</Link>
            </SC.LoginRedirect>

            {status ? <SC.Status>{status}</SC.Status> : null}
        </SC.RegisterForm>
    );
};

export default RegisterPage;
