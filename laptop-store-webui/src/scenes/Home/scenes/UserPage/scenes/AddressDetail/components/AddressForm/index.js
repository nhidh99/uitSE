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
                    title: "Cap nhat thanh cong",
                    message: "Cap nhat dia chi thanh cong",
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
            .max(30, "Ten nguoi nhan toi da 30 ki tu")
            .required("Ten nguoi nhan khong duoc de trong"),
        receiver_phone: Yup.string()
            .matches(/^[0-9]{10}$/, "So dien thoai gom 10 chu so")
            .required("So dien thoai khong duoc de trong"),
        city_id: Yup.number().required("Chon tinh thanh"),
        district_id: Yup.number().required("Chon quan huyen"),
        ward_id: Yup.number().required("Chon phuong xa"),
        street: Yup.string()
            .max(30, "Ten duong toi da 30 ki tu")
            .required("Ten duong khong duoc de trong"),
        address_num: Yup.string()
            .max(30, "Dia chi toi da 30 ki tu")
            .required("Dia chi khong duoc de trong"),
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
                            Nguoi nhan:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                type="name"
                                name="receiver_name"
                                placeholder="Nhap ten nguoi nhan"
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
                            Dien thoai:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                type="name"
                                name="receiver_phone"
                                placeholder="Nhap so dien thoai"
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
                            Tinh/Thanh:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                component="select"
                                name="city_id"
                                onChange={selectCity}
                            >
                                <option value="" hidden>
                                    Chon tinh thanh
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
                            Quan/Huyen:
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
                                    Chon quan huyen
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
                            Phuong/Xa:
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
                                    Chon phuong xa
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
                            Duong:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                name="street"
                                placeholder="Nhap ten duong"
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
                            Dia chi:
                        </label>
                        <div className={styles.col}>
                            <Field
                                className={`form-control ${styles.input}`}
                                name="address_num"
                                placeholder="Nhap dia chi"
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
                                Luu
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Loader>
    );
};

export default AddressForm;
