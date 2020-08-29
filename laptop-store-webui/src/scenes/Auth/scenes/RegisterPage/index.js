import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
} from "reactstrap";
import {
    FaUser,
    FaMailBulk,
    FaPhone,
    FaTransgender,
    FaLock,
} from "react-icons/fa";
import * as Yup from "yup";
import authApi from "../../../../services/api/authApi";
import store from "../../../../services/redux/store";
import { buildErrorModal } from "../../../../services/redux/actions";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    const [error, setError] = useState(null);

    const submit = async (data) => {
        setError(null);
        try {
            await authApi.register(data);
            window.location.href = "/auth/login";
        } catch (err) {
            switch (err.response.status) {
                case 400:
                    setError("Tên đăng nhập hoặc email đã tồn tại");
                    break;
                case 403:
                    setError("Mật khẩu xác nhận không khớp");
                    break;
                default:
                    store.dispatch(buildErrorModal());
                    break;
            }
        }
    };

    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .max(30, "Họ tên tối đa 30 kí tự")
            .required("Họ tên không được để trống"),
        email: Yup.string()
            .max(50, "Email tối đa 50 kí tự")
            .required("Email không được để trống")
            .matches(/(.+)@(.+){2,}\.(.+){2,}/, "Địa chỉ email không hợp lệ"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Số điện thoại gồm 10 chữ số")
            .required("Số điện thoại không được để trống"),
        gender: Yup.string().required("Giới tính không được để trống"),
        username: Yup.string()
            .min(6, "Tên tài khoản tối thiểu 6 kí tự")
            .max(30, "Tên tài khoản tối đa 30 kí tự")
            .required("Tên tài khoản không được để trống")
            .matches(
                /^(?!.*[_.]{2})[^_.].*[^_.]$/,
                "Tên tải khoản không hợp lệ"
            ),
        password: Yup.string()
            .min(12, "Mật khẩu tối thiểu 12 kí tự")
            .max(50, "Mật khẩu tối đa 50 kí tự")
            .required("Mật khẩu không được để trống"),
        confirm: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu nhập lại không khớp")
            .required("Mật khẩu không được để trống"),
    });

    return (
        <Formik
            initialValues={{}}
            validationSchema={RegisterSchema}
            isInitialValid={false}
            onSubmit={submit}
        >
            {({ isValid, isSubmitting }) => (
                <Form className={styles.form}>
                    <header>ĐĂNG KÍ</header>
                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaUser />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Nhập họ tên"
                                maxLength={30}
                            />
                        </InputGroup>
                        <ErrorMessage
                            name="name"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaMailBulk />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                type="text"
                                name="email"
                                placeholder="Nhập email"
                                maxLength={50}
                            />
                        </InputGroup>
                        <ErrorMessage
                            name="email"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaPhone />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                type="text"
                                name="phone"
                                placeholder="Nhập điện thoại"
                                maxLength={10}
                            />
                        </InputGroup>
                        <ErrorMessage
                            name="phone"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaTransgender />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                name="gender"
                                component="select"
                            >
                                <option value="" hidden>
                                    Chọn giới tính
                                </option>
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </Field>
                        </InputGroup>
                        <ErrorMessage
                            name="gender"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaUser />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                name="username"
                                type="text"
                                placeholder="Nhập tài khoản"
                                maxLength={30}
                            />
                        </InputGroup>
                        <ErrorMessage
                            name="username"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaLock />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                name="password"
                                type="password"
                                maxLength={50}
                                placeholder="Nhập mật khẩu"
                            />
                        </InputGroup>
                        <ErrorMessage
                            name="password"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FaLock />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Field
                                className="form-control"
                                name="confirm"
                                type="password"
                                maxLength={50}
                                placeholder="Nhập lại mật khẩu"
                            />
                        </InputGroup>
                        <ErrorMessage
                            name="confirm"
                            component="div"
                            className={styles.error}
                        />
                    </div>

                    <Button disabled={isSubmitting || !isValid} type="submit">
                        Đăng kí
                    </Button>

                    <label className={styles.redirect}>
                        Đã có tài khoản?{" "}
                        <Link to="/auth/login">
                            <b>Đăng nhập</b>
                        </Link>
                    </label>

                    {error ? (
                        <label className={styles.registerError}>
                            <b>{error}</b>
                        </label>
                    ) : null}
                </Form>
            )}
        </Formik>
    );
};

export default RegisterPage;
