/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";
import addressApi from "../../../../services/api/addressApi";
import locationApi from "../../../../services/api/locationApi";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { fireFetching, skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import { setMessage } from "../../../../services/redux/slices/messageSlice";
import { setDefaultAddressId } from "../../../../services/redux/slices/userSlice";
import store from "../../../../services/redux/store";
import AddressFormValues from "../../../../values/forms/AddressFormValues";
import LocationModel from "../../../../values/models/LocationModel";
import { SC } from "./styles";

type AddressDetailState = {
    cities: LocationModel[];
    districts: LocationModel[];
    wards: LocationModel[];
};

const AddressDetail = () => {
    // @ts-ignore
    const { addressId } = useParams();

    const showAddressButton: boolean = useSelector(
        (state: RootState) => addressId && state.user?.address_id !== parseInt(addressId)
    );

    const schema = useMemo(
        () =>
            Yup.object({
                receiver_name: Yup.string()
                    .max(30, "Tên người nhận tối đa 30 kí tự")
                    .required("Tên người nhận không được để trống"),
                receiver_phone: Yup.string()
                    .matches(/^[0-9]{10}$/, "Số điện thoại gồm 10 chữ số")
                    .required("Số điện thoại không được để trống"),
                city_id: Yup.number().required("Chọn tỉnh thành").typeError("Chọn tỉnh thành"),
                district_id: Yup.number().required("Chọn quận huyện").typeError("Chọn tỉnh thành"),
                ward_id: Yup.number().required("Chọn phường xã").typeError("Chọn tỉnh thành"),
                street: Yup.string()
                    .max(30, "Tên đường tối đa 30 kí tự")
                    .required("Tên đường không được để trống"),
                address_num: Yup.string()
                    .max(30, "Địa chỉ tối đa 30 kí tự")
                    .required("Địa chỉ không được để trống"),
            }),
        []
    );

    const initialState: AddressDetailState = useMemo(
        () => ({
            cities: [],
            districts: [],
            wards: [],
        }),
        []
    );

    const [state, setState] = useState<AddressDetailState>(initialState);
    const { cities, districts, wards } = state;

    const { register, handleSubmit, reset, trigger, formState, errors } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            receiver_name: "",
            receiver_phone: "",
            city_id: null,
            district_id: null,
            ward_id: null,
            street: "",
            address_num: "",
        },
    });

    useEffect(() => {
        const loadData = async () => {
            const response = await locationApi.getCities();
            const cities = response.data;

            if (addressId) {
                const response = await addressApi.getAddressById(addressId);
                const values = response.data;
                const [districts, wards] = (
                    await Promise.all([
                        locationApi.getDistrictsByCityId(values.city_id),
                        locationApi.getWardsByDistrictId(values.district_id),
                    ])
                ).map((response) => response.data);

                setState((prev) => ({
                    ...prev,
                    cities: cities,
                    districts: districts,
                    wards: wards,
                }));

                reset(values);
                trigger();
            } else {
                setState((prev) => ({ ...prev, cities: cities }));
            }
        };

        loadData();
    }, []);

    const selectCity = useCallback(async (cityId: number) => {
        setState((prev) => ({ ...prev, districts: [], wards: [] }));
        const response = await locationApi.getDistrictsByCityId(cityId);
        const districts = response.data;
        setState((prev) => ({ ...prev, districts: districts }));
    }, []);

    const selectDistrict = useCallback(async (districtId: number) => {
        setState((prev) => ({ ...prev, wards: [] }));
        const response = await locationApi.getWardsByDistrictId(districtId);
        const wards = response.data;
        setState((prev) => ({ ...prev, wards: wards }));
    }, []);

    const submit = useCallback(async (values: AddressFormValues) => {
        let message: string | null = null;
        try {
            if (addressId) {
                await addressApi.putAddress(addressId, values);
                message = "Cập nhật địa chi thành công";
            } else {
                const response = await addressApi.postAddress(values);
                window.location.href = `/user/addresses/edit/${response.data}`;
            }
        } catch (err) {
            message = err.response;
        } finally {
            if (message) {
                store.dispatch(setMessage(message));
            }
        }
    }, []);

    const setDefaultAddress = useCallback(async () => {
        let message: string | null = null;
        try {
            const id = parseInt(addressId);
            const response = await userApi.putDefaultAddress(id);
            store.dispatch(setDefaultAddressId(id));
            message = response.data;
        } catch (err) {
            message = err.response;
        } finally {
            if (message) {
                store.dispatch(setMessage(message));
            }
        }
    }, []);

    useEffect(() => {
        if (cities.length === 0) {
            store.dispatch(fireFetching());
        } else {
            store.dispatch(skipFetching());
        }
    }, [cities]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <FieldInput
                label="Người nhận:"
                component={
                    <input
                        ref={register}
                        type="text"
                        name="receiver_name"
                        placeholder="Họ tên người nhận"
                        maxLength={30}
                    />
                }
                errorMessage={errors.receiver_name?.message}
            />

            <FieldInput
                label="Người nhận:"
                component={
                    <input
                        type="text"
                        name="receiver_phone"
                        placeholder="Điện thoại người nhận"
                        ref={register}
                        maxLength={10}
                    />
                }
                errorMessage={errors.receiver_phone?.message}
            />

            <FieldInput
                label="Tỉnh/Thành:"
                component={
                    <select
                        name="city_id"
                        ref={register}
                        disabled={cities.length === 0}
                        onChange={(e) => selectCity(parseInt(e.currentTarget.value))}
                    >
                        <option hidden value="">
                            Chọn tỉnh thành
                        </option>
                        {cities.map((d) => (
                            <option value={d.id}>{d.name}</option>
                        ))}
                    </select>
                }
                errorMessage={errors.city_id?.message}
            />

            <FieldInput
                label="Quận/Huyện:"
                component={
                    <select
                        name="district_id"
                        ref={register}
                        disabled={districts.length === 0}
                        onChange={(e) => selectDistrict(parseInt(e.currentTarget.value))}
                    >
                        <option hidden value="">
                            Chọn quận huyện
                        </option>
                        {districts.map((d) => (
                            <option value={d.id}>{d.name}</option>
                        ))}
                    </select>
                }
                errorMessage={errors.district_id?.message}
            />

            <FieldInput
                label="Phường/Xã:"
                component={
                    <select name="ward_id" ref={register} disabled={wards.length === 0}>
                        <option hidden value="">
                            Chọn phường xã
                        </option>
                        {wards.map((d) => (
                            <option value={d.id}>{d.name}</option>
                        ))}
                    </select>
                }
                errorMessage={errors.district_id?.message}
            />

            <FieldInput
                label="Đường:"
                component={<input name="street" ref={register} placeholder="Tên đường" />}
                errorMessage={errors.street?.message}
            />

            <FieldInput
                label="Số nhà:"
                component={
                    <input
                        type="text"
                        name="address_num"
                        ref={register}
                        placeholder="Số nhà"
                        maxLength={30}
                    />
                }
                errorMessage={errors.address_num?.message}
            />

            <SC.ButtonContainer>
                <SC.SubmitButton disabled={formState.isSubmitting} type="submit">
                    {addressId ? "Cập nhật" : "Tạo"} địa chỉ
                </SC.SubmitButton>

                {showAddressButton ? (
                    <SC.AddressButton type="button" onClick={setDefaultAddress}>
                        Đặt địa chỉ mặc định
                    </SC.AddressButton>
                ) : null}
            </SC.ButtonContainer>
        </form>
    );
};

export default AddressDetail;
