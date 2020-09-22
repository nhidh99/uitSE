import { Form, Formik } from "formik";
import React, { useCallback, useMemo } from "react";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";
import userApi from "../../../../services/api/userApi";
import PasswordFormValues from "../../../../values/forms/PasswordFormValues";

const PasswordPage = () => {
    const initialValues: PasswordFormValues = useMemo(
        () => ({
            old_password: "",
            new_password: "",
            confirm_password: "",
        }),
        []
    );

    const schema = useMemo(
        () =>
            Yup.object({
                old_password: Yup.string().required(
                    "Mật khẩu không được để trống"
                ),
                new_password: Yup.string()
                    .min(12, "Mật khẩu tối thiểu 12 kí tự")
                    .required("Mật khẩu không được để trống"),
                confirm_password: Yup.string()
                    .oneOf(
                        [Yup.ref("new_password")],
                        "Mật khẩu nhập lại không khớp"
                    )
                    .required("Mật khẩu không được để trống"),
            }),
        []
    );

    const submit = useCallback(async (values: PasswordFormValues) => {
        try {
            const response = await userApi.putCurrentUserPassword(values);
            alert(response.data);
            window.location.reload();
        } catch (err) {
            alert(err.response.data);
        }
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={schema}
            isInitialValid={schema.isValidSync(initialValues)}
        >
            {({ isValid, isSubmitting }) => {
                const isDisabledButton = isSubmitting || !isValid;
                const buttonStyle = {
                    border: "none",
                    backgroundColor: "#FFCC00",
                    color: "#333",
                    marginTop: "5px",
                    width: "200px",
                    cursor: "pointer",
                    opacity: isDisabledButton ? "0.5" : "1",
                };
                return (
                    <Form>
                        <FieldInput
                            name="old_password"
                            type="password"
                            label="Nhập MK cũ:"
                            placeholder="Nhập mật khẩu cũ"
                            validate
                        />

                        <FieldInput
                            name="new_password"
                            type="password"
                            label="Nhập MK mới:"
                            placeholder="Nhập mật khẩu mới"
                            validate
                        />

                        <FieldInput
                            name="confirm_password"
                            type="password"
                            label="Xác nhận MK:"
                            placeholder="Xác nhận mật khẩu mới"
                            validate
                        />

                        <FieldInput
                            label=""
                            component="button"
                            type="submit"
                            style={buttonStyle}
                            disabled={isDisabledButton}
                        >
                            Đổi mật khẩu
                        </FieldInput>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PasswordPage;
