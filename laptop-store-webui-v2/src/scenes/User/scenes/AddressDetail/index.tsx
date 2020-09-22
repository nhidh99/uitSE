import { Form, Formik } from "formik";
import React, {
    FormEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as Yup from "yup";
import FieldInput from "../../../../components/FIeldInput";
import Spinner from "../../../../components/Spinner";
import addressApi from "../../../../services/api/addressApi";
import locationApi from "../../../../services/api/locationApi";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { setDefaultAddressId } from "../../../../services/redux/slices/userSlice";
import store from "../../../../services/redux/store";
import AddressFormValues from "../../../../values/forms/AddressFormValues";
import LocationModel from "../../../../values/models/LocationModel";
import { SC } from "./styles";

type AddressDetailState = {
    initialValues: AddressFormValues;
    cities: LocationModel[];
    districts: LocationModel[];
    wards: LocationModel[];
};

const AddressDetail = () => {
    // @ts-ignore
    const { addressId } = useParams();

    const showAddressButton: boolean = useSelector(
        (state: RootState) =>
            addressId && state.user?.address_id !== parseInt(addressId)
    );

    const schema = useMemo(
        () =>
            Yup.object({
                receiver_name: Yup.string()
                    .min(1)
                    .max(30, "Tên người nhận tối đa 30 kí tự")
                    .required("Tên người nhận không được để trống"),
                receiver_phone: Yup.string()
                    .matches(/^[0-9]{10}$/, "Số điện thoại gồm 10 chữ số")
                    .required("Số điện thoại không được để trống"),
                city_id: Yup.number()
                    .required("Chọn tỉnh thành")
                    .typeError("Chọn tỉnh thành"),
                district_id: Yup.number()
                    .required("Chọn quận huyện")
                    .typeError("Chọn tỉnh thành"),
                ward_id: Yup.number()
                    .required("Chọn phường xã")
                    .typeError("Chọn tỉnh thành"),
                street: Yup.string()
                    .max(30, "Tên đường tối đa 30 kí tự")
                    .required("Tên đường không được để trống"),
                address_num: Yup.string()
                    .max(30, "Địa chỉ tối đa 30 kí tự")
                    .required("Địa chỉ không được để trống"),
            }),
        []
    );

    const initialFormValues: AddressFormValues = useMemo(
        () => ({
            receiver_name: "",
            receiver_phone: "",
            city_id: null,
            district_id: null,
            ward_id: null,
            street: "",
            address_num: "",
        }),
        []
    );

    const initialState: AddressDetailState = useMemo(
        () => ({
            initialValues: initialFormValues,
            cities: [],
            districts: [],
            wards: [],
        }),
        []
    );

    const [state, setState] = useState<AddressDetailState>(initialState);
    const { initialValues, cities, districts, wards } = state;

    useEffect(() => {
        const loadData = async () => {
            const response = await locationApi.getCities();
            const cities = response.data;

            if (addressId) {
                const response = await addressApi.getAddressById(addressId);
                const values: AddressFormValues = response.data;
                const [districts, wards] = (
                    await Promise.all([
                        //@ts-ignore
                        locationApi.getDistrictsByCityId(values.city_id),
                        //@ts-ignore
                        locationApi.getWardsByDistrictId(values.district_id),
                    ])
                ).map((response) => response.data);

                setState((prev) => ({
                    ...prev,
                    cities: cities,
                    districts: districts,
                    wards: wards,
                    initialValues: values,
                }));
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
        try {
            if (addressId) {
                await addressApi.putAddress(addressId, values);
                alert("Cập nhật địa chi thành công");
            } else {
                const response = await addressApi.postAddress(values);
                window.location.href = `/user/addresses/edit/${response.data}`;
            }
        } catch (err) {
            alert("Lỗi");
        }
    }, []);

    const setDefaultAddress = useCallback(async () => {
        try {
            const id = parseInt(addressId);
            const response = await userApi.putDefaultAddress(id);
            store.dispatch(setDefaultAddressId(id));
            alert(response.data);
        } catch (err) {
            alert("Lỗi");
        }
    }, []);

    return cities.length === 0 ? (
        <Spinner />
    ) : (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={schema}
            isInitialValid={schema.isValidSync(initialValues)}
        >
            {({ isValid, isSubmitting, setFieldValue, setFieldTouched }) => {
                const isDisabledButton = isSubmitting || !isValid;
                return (
                    <Form>
                        <FieldInput
                            label="Người nhận:"
                            name="receiver_name"
                            placeholder="Họ tên người nhận"
                            maxLength={30}
                            validate
                        />

                        <FieldInput
                            label="Điện thoại:"
                            name="receiver_phone"
                            placeholder="Điện thoại người nhận"
                            maxLength={10}
                            validate
                        />

                        <FieldInput
                            label="Tỉnh/Thành:"
                            name="city_id"
                            component="select"
                            disabled={cities.length === 0}
                            onChange={(e: FormEvent<HTMLInputElement>) => {
                                const cityId = parseInt(e.currentTarget.value);
                                setFieldValue("city_id", cityId);
                                selectCity(cityId);
                            }}
                            onBlur={() => setFieldTouched("city_id", true)}
                            validate
                        >
                            <option value="" hidden>
                                Chọn tỉnh/thành
                            </option>
                            {cities.map((city) => (
                                <option value={city.id}>{city.name}</option>
                            ))}
                        </FieldInput>

                        <FieldInput
                            label="Quận/Huyện:"
                            name="district_id"
                            component="select"
                            onChange={(e: FormEvent<HTMLInputElement>) => {
                                const distId = parseInt(e.currentTarget.value);
                                setFieldValue("district_id", distId);
                                selectDistrict(distId);
                            }}
                            disabled={districts.length === 0}
                            onBlur={() => setFieldTouched("district_id", true)}
                            validate
                        >
                            <option value="" hidden>
                                Chọn quận/huyện
                            </option>
                            {districts.map((district) => (
                                <option value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </FieldInput>

                        <FieldInput
                            label="Phường/Xã:"
                            name="ward_id"
                            component="select"
                            disabled={wards.length === 0}
                            onChange={(e: FormEvent<HTMLInputElement>) => {
                                const wardId = parseInt(e.currentTarget.value);
                                setFieldValue("ward_id", wardId);
                            }}
                            onBlur={() => setFieldTouched("ward_id", true)}
                            validate
                        >
                            <option value="" hidden>
                                Chọn phường/xã
                            </option>
                            {wards.map((ward) => (
                                <option value={ward.id}>{ward.name}</option>
                            ))}
                        </FieldInput>

                        <FieldInput
                            label="Đường:"
                            name="street"
                            placeholder="Tên đường"
                            maxLength={30}
                            validate
                        />

                        <FieldInput
                            label="Số nhà:"
                            name="address_num"
                            placeholder="Số nhà"
                            maxLength={30}
                            validate
                        />

                        <SC.ButtonContainer>
                            <SC.SubmitButton
                                disabled={isDisabledButton}
                                type="submit"
                            >
                                {addressId ? "Cập nhật" : "Tạo"} địa chỉ
                            </SC.SubmitButton>

                            {showAddressButton ? (
                                <SC.AddressButton
                                    type="button"
                                    onClick={setDefaultAddress}
                                >
                                    Đặt địa chỉ mặc định
                                </SC.AddressButton>
                            ) : null}
                        </SC.ButtonContainer>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddressDetail;
