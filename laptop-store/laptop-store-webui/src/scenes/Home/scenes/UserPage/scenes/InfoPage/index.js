/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Label, Input, Button, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import { FaInfoCircle } from "react-icons/fa";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import FacebookSync from "./components/FacebookSync";
import GoogleSync from "./components/GoogleSync";

const InfoPage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [fbAuth, setFbAuth] = useState(null);
    const [googleAuth, setGoogleAuth] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!loading) {
            const date = document.getElementById("birthday");
            const birthday = user["birthday"];
            date.valueAsDate = new Date(
                birthday["year"],
                birthday["monthValue"] - 1,
                birthday["dayOfMonth"],
                -new Date().getTimezoneOffset() / 60
            );
        }
    }, [loading]);

    const loadData = async () => {
        const [user, auth] = await Promise.all([loadUser(), loadSocialMediaAuth()]);
        setUser(user);
        setFbAuth(auth["FACEBOOK"]);
        setGoogleAuth(auth["GOOGLE"]);
        setLoading(false);
    };

    const loadUser = async () => {
        const response = await fetch("/cxf/api/users/me", {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") },
        });
        return response.ok ? await response.json() : null;
    };

    const loadSocialMediaAuth = async () => {
        const response = await fetch("/cxf/api/users/me/social-auth", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        return response.ok ? await response.json() : null;
    };

    const validateInputs = () => {
        const errors = getInputErrors();
        setErrors(errors);
        return errors.length === 0;
    };

    const getInputErrors = () => {
        const errors = [];
        const inputs = {
            fullName: document.getElementById("fullName"),
            telephone: document.getElementById("telephone"),
            email: document.getElementById("email"),
        };

        const validate = (message, condition) => {
            try {
                if (!condition()) {
                    errors.push(message);
                }
            } catch (err) {
                errors.push(message);
            }
        };

        validate(
            "Họ tên phải từ 6 - 45 kí tự",
            () => inputs["fullName"].value.length >= 6 && inputs["fullName"].value.length <= 45
        );

        validate(
            "Số điện thoại phải để trống hoặc là một dãy số",
            () => inputs["telephone"].value.length === 0 || !isNaN(inputs["telephone"].value)
        );

        validate("Email không hợp lệ (Email phải được để trống hoặc phải có dạng abc@xyz)", () => {
            return (
                inputs["email"].value.length === 0 ||
                inputs["email"].value.trim().match(/\S+@\S+\.\S+/)
            );
        });

        return errors;
    };

    const submit = () => {
        if (validateInputs()) {
            updateUser();
        }
    };

    const updateUser = async () => {
        const name = document.getElementById("fullName").value;
        const telephone = document.getElementById("telephone").value;
        const email = document.getElementById("email").value;
        const gender = document.getElementById("gender").value;
        const birthday = document.getElementById("birthday").value;

        const response = await fetch("/cxf/api/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify({
                name: name,
                phone: telephone,
                email: email,
                gender: gender,
                birthday: new Date(birthday).getTime(),
            }),
        });

        if (response.ok) {
            alert("Đã lưu thông tin mới thành công");
        }
    };

    return (
        <Loader
            show={loading}
            message={<Spinner color="primary" />}
            className={styles.loader}
            backgroundStyle={{ backgroundColor: "transparent" }}
        >
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaInfoCircle />
                    &nbsp;&nbsp;THÔNG TIN
                </label>

                <div className={styles.buttons}>
                    <FacebookSync auth={fbAuth} />
                    <GoogleSync auth={googleAuth} />
                    <Button
                        type="submit"
                        className={styles.submit}
                        color="success"
                        onClick={submit}
                    >
                        Lưu
                    </Button>
                </div>
            </div>

            <div>
                {errors.length !== 0
                    ? errors.map((err) => <label className={styles.err}>- {err}</label>)
                    : null}
            </div>

            {loading ? null : (
                <table className={styles.table}>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label className={styles.label} for="fullName">
                                Họ và tên:
                            </Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Nhập họ và tên"
                                defaultValue={user?.["name"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="telephone">
                                Điện thoại:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="telephone"
                                id="telephone"
                                placeholder="Nhập số điện thoại"
                                defaultValue={user?.["phone"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="email">
                                Email:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Nhập email"
                                defaultValue={user?.["email"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label}>Giới tính:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                id="gender"
                                defaultValue={user?.["gender"]}
                                className={styles.input}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="birthday">
                                Ngày sinh:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="date"
                                name="birthday"
                                id="birthday"
                                placeholder="Nhập ngày sinh"
                                className={styles.input}
                            />
                        </td>
                    </tr>
                </table>
            )}
        </Loader>
    );
};

export default InfoPage;
