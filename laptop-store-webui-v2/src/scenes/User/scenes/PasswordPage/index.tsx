import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";
import userApi from "../../../../services/api/userApi";
import PasswordFormValues from "../../../../values/forms/PasswordFormValues";
import { SC } from "./styles";

const PasswordPage = () => {
    const schema = useMemo(
        () =>
            Yup.object({
                old_password: Yup.string().required("Mật khẩu không được để trống"),
                new_password: Yup.string()
                    .min(12, "Mật khẩu tối thiểu 12 kí tự")
                    .required("Mật khẩu không được để trống"),
                confirm_password: Yup.string()
                    .oneOf([Yup.ref("new_password")], "Mật khẩu nhập lại không khớp")
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

    const { register, handleSubmit, formState, errors } = useForm({
        mode: "onBlur",
        defaultValues: { old_password: "", new_password: "", confirm_password: "" },
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(submit)}>
            <FieldInput
                label="Mật khẩu cũ:"
                component={
                    <input
                        name="old_password"
                        maxLength={50}
                        ref={register}
                        type="password"
                        placeholder="Nhập mật khẩu cũ"
                    />
                }
                errorMessage={errors.old_password?.message}
            />

            <FieldInput
                label="Mật khẩu mới:"
                component={
                    <input
                        name="new_password"
                        type="password"
                        maxLength={50}
                        ref={register}
                        placeholder="Nhập mật khẩu mới"
                    />
                }
                errorMessage={errors.new_password?.message}
            />

            <FieldInput
                label="Xác nhận MK:"
                component={
                    <input
                        name="confirm_password"
                        type="password"
                        maxLength={50}
                        ref={register}
                        placeholder="Xác nhận mật khẩu"
                    />
                }
                errorMessage={errors.confirm_password?.message}
            />

            <SC.SubmitButton type="submit" disabled={formState.isSubmitting}>
                Đổi mật khẩu
            </SC.SubmitButton>
        </form>
    );
};

export default PasswordPage;
