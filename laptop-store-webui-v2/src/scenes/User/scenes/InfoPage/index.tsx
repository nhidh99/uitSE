/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { setUser } from "../../../../services/redux/slices/userSlice";
import store from "../../../../services/redux/store";
import UserInfoFormValues from "../../../../values/forms/UserInfoFormValues";
import UserModel from "../../../../values/models/UserModel";

type InfoPageState = {
    user: UserModel;
    initialValues: UserInfoFormValues;
};

const InfoPage = () => {
    // @ts-ignore
    const { user, initialValues }: InfoPageState = useSelector(
        (state: RootState) => {
            const user = state.user;
            return {
                user: user,
                initialValues: {
                    name: user?.name,
                    phone: user?.phone,
                    email: user?.email,
                    gender: user?.gender,
                },
            };
        }
    );

    const submit = useCallback(async (data: UserInfoFormValues) => {
        try {
            const response = await userApi.putCurrentUserInfo(data);
            const newUser = { ...user, ...data };
            store.dispatch(setUser(newUser));
            alert(response.data);
        } catch (err) {
            alert("Fail");
        }
    }, []);

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
            }),
        []
    );

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={schema}
            isInitialValid={schema.isValidSync(initialValues)}
            enableReinitialize={true}
        >
            {({ isValid, isSubmitting }) => {
                const isDisabledButton = isSubmitting || !isValid;
                const buttonStyle = {
                    border: "none",
                    backgroundColor: "#5cb85c",
                    color: "white",
                    marginTop: "5px",
                    marginBottom: 0,
                    width: "200px",
                    opacity: isDisabledButton ? "0.5" : "1",
                };
                return (
                    <Form>
                        <FieldInput label="Họ tên:" name="name" validate />
                        <FieldInput label="Email:" name="email" validate />
                        <FieldInput label="Điện thoại:" name="phone" validate />
                        <FieldInput
                            label="Giới tính"
                            name="gender"
                            component="select"
                            validate
                        >
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                        </FieldInput>

                        <FieldInput
                            label=""
                            component="button"
                            disabled={isDisabledButton}
                            style={buttonStyle}
                        >
                            Lưu
                        </FieldInput>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default InfoPage;
