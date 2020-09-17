import { Form, Formik } from "formik";
import React, { useCallback, useMemo } from "react";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";

const PasswordPage = () => {
    const initialValues = useMemo(
        () => ({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
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

    const submit = useCallback(() => {}, []);

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
                    opacity: isDisabledButton ? "0.5" : "1",
                };
                return (
                    <Form>
                        <FieldInput
                            name="old_password"
                            label="Nhập MK cũ:"
                            type="password"
                            validate
                        />

                        <FieldInput
                            name="new_password"
                            label="Nhập MK mới:"
                            type="password"
                            validate
                        />

                        <FieldInput
                            name="confirm_password"
                            label="Xác nhận MK:"
                            type="password"
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
