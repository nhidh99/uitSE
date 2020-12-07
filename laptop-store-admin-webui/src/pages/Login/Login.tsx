import LoginFormData from "@/@types/form/LoginFormData";
import { createCookie } from "@/services/helper/cookie";
import React, { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { authAPI } from "@/services/api/authAPI";

function Login() {
    const [status, setStatus] = useState<string | null>(null);

    const { register, handleSubmit, formState } = useForm({
        defaultValues: { username: "", password: "" }
    });

    const submit = useCallback(async (data: LoginFormData) => {
        try {
            setStatus("Đang xử lí đăng nhập");
            const response = await authAPI.postLogin(data);
            createCookie("access_token", response.headers["x-access-token"]);
            localStorage.setItem("refresh_token", response.headers["x-refresh-token"]);
            setStatus("Đăng nhập thành công");
            window.location.href = "/products";
        } catch (err) {
            setStatus(err.response.data);
        }
    }, []);

    return (
        <form
            className="flex flex-col gap-3
                border-gray-800 bg-gray-300 shadow-md
                text-center
                mx-auto mt-20
                px-8 py-5
                w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            onSubmit={handleSubmit(submit)}
        >
            <div className="md:text-base font-semibold">ĐĂNG NHẬP DNSTORE</div>
            <input
                className="focus:outline-none px-3 py-1"
                type="text"
                name="username"
                placeholder="Tài khoản"
                ref={register}
            />
            <input
                className="focus:outline-none px-3 py-1"
                type="password"
                name="password"
                placeholder="Mật khẩu"
                ref={register}
            />
            <button
                className="block bg-gray-500
                    text-white
                    focus:outline-none                  
                    px-3 py-1.5 text-xs sm:text-sm"
                disabled={formState.isSubmitting}
                type="submit"
            >
                Đăng nhập
            </button>
            {status ? <span className="text-xs sm:text-sm text-red-600 ">{status}</span> : null}
        </form>
    );
}

export default memo(Login);
