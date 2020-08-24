/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import { Button, Spinner } from "reactstrap";
import * as Yup from "yup";
import Loader from "react-loader-advanced";
import addressApi from "../../../../../../../../services/api/addressApi";
import { useParams } from "react-router-dom";
import store from "../../../../../../../../services/redux/store";
import { buildModal } from "../../../../../../../../services/redux/actions";

const AddressForm = () => {
    const { id } = useParams();
    const INITIAL_STATE = {
        loading: true,
        cities: [],
        districts: [],
        wards: [],
        formInitValues: {
            receiver_name: "",
            receiver_phone: "",
            city_id: "",
            district_id: "",
            ward_id: "",
            street: "",
            address_num: "",
        },
    };

    const formikRef = useRef();
    const [state, setState] = useState(INITIAL_STATE);
    const { loading, cities, districts, wards, formInitValues } = state;

    useEffect(() => {
        isNaN(id) ? loadInsertPageData() : loadEditPageData();
    }, []);

    const loadInsertPageData = async () => {
        const cities = await loadCities();
        setState((prev) => ({
            ...prev,
            cities: cities,
            loading: false,
        }));
    };

    const loadEditPageData = async () => {
        try {
            const response = await addressApi.getById(id);
            const data = response.data;
            const { address } = data;
            const [cities, districts, wards] = await Promise.all([
                loadCities(),
                loadDistrictsByCityId(data["city_id"]),
                loadWardsByDistrictId(data["district_id"]),
            ]);
            setState({
                loading: false,
                cities: cities,
                districts: districts,
                wards: wards,
                formInitValues: {
                    receiver_name: address["receiver_name"],
                    receiver_phone: address["receiver_phone"],
                    city_id: data["city_id"],
                    district_id: data["district_id"],
                    ward_id: data["ward_id"],
                    street: address["street"],
                    address_num: address["address_num"],
                },
            });
            formikRef.current.setFieldValue("city_id", data["city_id"]);
            formikRef.current.setFieldValue("district_id", data["district_id"]);
            formikRef.current.setFieldValue("ward_id", data["ward_id"]);
        } catch (err) {
            console.log("fail");
        }
    };

    const loadCities = async () => {
        try {
            const response = await addressApi.getCities();
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const loadDistrictsByCityId = async (cityId) => {
        try {
            const response = await addressApi.getDistricts(cityId);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const loadWardsByDistrictId = async (districtId) => {
        try {
            const response = await addressApi.getWards(districtId);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const selectCity = async (e) => {
        setState((prev) => ({ ...prev, districts: [], wards: [] }));
        const cityId = parseInt(e.target.value);

        formikRef.current.setFieldValue("city_id", cityId, true);
        formikRef.current.setFieldValue("district_id", "", true);
        formikRef.current.setFieldValue("ward_id", "", true);
        formikRef.current.setFieldTouched("district_id", false);
        formikRef.current.setFieldTouched("ward_id", false);

        const districts = await loadDistrictsByCityId(cityId);
        setState((prev) => ({
            ...prev,
            loading: false,
            districts: districts,
        }));
    };

    const selectDistrict = async (e) => {
        setState((prev) => ({ ...prev, wards: [] }));
        const districtId = parseInt(e.target.value);

        formikRef.current.setFieldValue("district_id", districtId, true);
        formikRef.current.setFieldValue("ward_id", "", true);
        formikRef.current.setFieldTouched("ward_id", false);

        const wards = await loadWardsByDistrictId(districtId);
        setState((prev) => ({
            ...prev,
            loading: false,
            wards: wards,
        }));
    };

    const selectWard = (e) => {
        const wardId = parseInt(e.target.value);
        formikRef.current.setFieldValue("ward_id", wardId, true);
    };

    const submit = async (values) => {
        try {
            if (isNaN(id)) {
                const response = await addressApi.postAddress(values);
                const addressId = response.data;
                window.location.href = `/user/address/${addressId}`;
            } else {
                await addressApi.putAddress(id, values);
                const modal = {
                    title: "Cập nhật thành công",
                    message: "Cập nhật địa chỉ thành công",
                    confirm: () => null,
                };
                store.dispatch(buildModal(modal));
            }
        } catch (err) {
            console.log("fail");
        }
    };

    const AddressSchema = Yup.object().shape({
        receiver_name: Yup.string()
            .min(1)
            .max(30, "Tên người nhận tối đa 30 kí tự")
            .required("Tên người nhận không được để trống"),
        receiver_phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Số điện thoại gồm 10 chữ số")
            .required("Số điện thoại không được để trống"),
        city_id: Yup.number().required("Chọn tỉnh thành"),
        district_id: Yup.number().required("Chọn quận huyện"),
        ward_id: Yup.number().required("Chọn phường xã"),
        street: Yup.string()
            .max(30, "Tên đường tối đa 30 kí tự")
            .required("Tên đường không được để trống"),
        address_num: Yup.string()
            .max(30, "Địa chỉ tối đa 30 kí tự")
            .required("Địa chỉ không được để trống"),
    });

    return (
        <Loader show={loading} message={<Spinner />}>
            <Formik
                initialValues={formInitValues}
                onSubmit={submit}
                validationSchema={AddressSchema}
                innerRef={formikRef}
                enableReinitialize={true}
            >
                <Form className={styles.form}>
                    <div className={styles.row}>
                        <label className={styles.label} htmlFor="receiver_name">
                            Người nhận:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                type="name"
                                name="receiver_name"
                                placeholder="Nhập tên người nhận"
                                maxLength={30}
                            />
                            <ErrorMessage
                                name="receiver_name"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label
                            className={styles.label}
                            htmlFor="receiver_phone"
                        >
                            Điện thoại:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                type="name"
                                name="receiver_phone"
                                placeholder="Nhập số điện thoại"
                                maxLength={10}
                            />
                            <ErrorMessage
                                name="receiver_phone"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label} htmlFor="city_id">
                            Tỉnh/Thành:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                component="select"
                                name="city_id"
                                onChange={selectCity}
                            >
                                <option value="" hidden>
                                    Chọn tỉnh thành
                                </option>
                                {cities.map((city) => (
                                    <option value={city["id"]}>
                                        {city["name"]}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="city_id"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label} htmlFor="district_id">
                            Quận/Huyện:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                component="select"
                                name="district_id"
                                onChange={selectDistrict}
                                id="district_id"
                            >
                                <option value="" hidden>
                                    Chọn quận huyện
                                </option>
                                {districts.map((district) => (
                                    <option value={district["id"]}>
                                        {district["name"]}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="district_id"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label} htmlFor="ward_id">
                            Phường/Xã:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                component="select"
                                name="ward_id"
                                id="ward_id"
                                onChange={selectWard}
                            >
                                <option value="" hidden>
                                    Chọn phường xã
                                </option>
                                {wards.map((ward) => (
                                    <option value={ward["id"]}>
                                        {ward["name"]}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="ward_id"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label} htmlFor="street">
                            Đường:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                name="street"
                                placeholder="Nhập tên đường"
                                maxLength={30}
                            />
                            <ErrorMessage
                                name="street"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label} htmlFor="address-num">
                            Địa chỉ:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                name="address_num"
                                placeholder="Nhập địa chỉ"
                                maxLength={30}
                            />
                            <ErrorMessage
                                name="address_num"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label} />
                        <div className={styles.col}>
                            <Button
                                type="submit"
                                color="success"
                                className={styles.submit}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Loader>
    );
};

export default AddressForm;
