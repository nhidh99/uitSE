/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { setUser } from "../../../../services/redux/slices/userSlice";
import store from "../../../../services/redux/store";
import UserInfoFormValues from "../../../../values/forms/UserInfoFormValues";
import UserModel from "../../../../values/models/UserModel";
import { yupResolver } from "@hookform/resolvers/yup";
import { SC } from "./styles";

type InfoPageState = {
    user: UserModel;
    initialValues: UserInfoFormValues;
};

const InfoPage = () => {
    // @ts-ignore
    const { user, initialValues }: InfoPageState = useSelector((state: RootState) => {
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
    });

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
                    .max(50, "Email tối đa 50 kí tự")
                    .required("Email không được để trống")
                    .matches(/(.+)@(.+){2,}\.(.+){2,}/, "Email không hợp lệ"),
                phone: Yup.string()
                    .matches(/^[0-9]{10}$/, "Số điện thoại gồm 10 chữ số")
                    .required("Số điện thoại không được để trống"),
                gender: Yup.string().required("Giới tính không được để trống"),
            }),
        []
    );

    const { register, handleSubmit, formState, errors } = useForm({
        mode: "onBlur",
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(submit)}>
            <FieldInput
                label="Họ tên:"
                component={<input type="text" name="name" ref={register} maxLength={30} />}
                errorMessage={errors.name?.message}
            />

            <FieldInput
                label="Email:"
                component={<input type="text" name="email" ref={register} maxLength={50} />}
                errorMessage={errors.email?.message}
            />

            <FieldInput
                label="Điện thoại:"
                component={<input type="text" name="phone" ref={register} maxLength={10} />}
                errorMessage={errors.phone?.message}
            />

            <FieldInput
                label="Giới tính:"
                noValidate
                component={
                    <select name="gender" ref={register}>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                }
            />

            <SC.Submit type="submit" value="Lưu" disabled={formState.isSubmitting} />
        </form>
    );
};

export default memo(InfoPage);
