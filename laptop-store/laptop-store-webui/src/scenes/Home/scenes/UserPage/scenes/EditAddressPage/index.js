/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Label, Input, Button } from "reactstrap";
import { FaBook } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";
import {
    loadCities,
    loadDistrictsByCityId,
    loadWardsByDistrictId,
} from "../../../../../../services/helper/address";

const EditAddressPage = ({ location }) => {
    const [errors, setErrors] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [cityId, setCityId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [wardId, setWardId] = useState(null);

    const address = location.state?.address;

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!cityId) return;
        loadDistricts();
    }, [cityId]);

    useEffect(() => {
        if (!districtId) return;
        loadWards();
    }, [districtId]);

    const loadData = async () => {
        const cities = await loadCities();
        setCities(cities);
        setDistricts([]);
        setDistrictId("");
    };

    const loadDistricts = async () => {
        const districts = await loadDistrictsByCityId(cityId);
        setDistricts(districts);
        setWards([]);
        setWardId("");
    };

    const loadWards = async () => {
        const wards = await loadWardsByDistrictId(districtId);
        setWards(wards);
    };

    const buildAddressBody = () => {
        const receiverName = document.getElementById("receiver-name").value;
        const receiverPhone = document.getElementById("receiver-phone").value;
        const city = document.getElementById("city").value;
        const district = document.getElementById("district").value;
        const ward = document.getElementById("ward").value;
        const street = document.getElementById("street").value;
        const addressNum = document.getElementById("address-num").value;

        return {
            receiver_name: receiverName,
            receiver_phone: receiverPhone,
            city: city,
            district: district,
            ward: ward,
            street: street,
            address_num: addressNum,
        };
    };

    const validateInputs = (inputs) => {
        const errors = [];
        const validate = (message, condition) => (condition() ? null : errors.push(message));
        validate("Họ và tên không được để trống hoặc chứa chữ số", () =>
            inputs["receiver_name"].match(/^[a-zA-Z\s\p{L}]{3,30}$/gu)
        );
        validate("Số điện thoại từ 6 - 12 chữ số", () =>
            inputs["receiver_phone"].match(/^\d{6,12}$/)
        );
        validate("Tỉnh/Thành phố không được để trống", () => inputs["city"].length > 0);
        validate("Quận huyện không được để trống", () => inputs["district"].length > 0);
        validate("Phường xã không được để trống", () => inputs["ward"].length > 0);
        validate("Đường không được để trống", () => inputs["street"].length > 0);
        validate("Số nhà không được để trống", () => inputs["address_num"].length > 0);
        return errors;
    };

    const createAddress = async () => {
        const body = buildAddressBody();
        const errors = validateInputs(body);

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        const url =
            "/cxf/api/addresses/" + (location.state?.address ? location.state.address["id"] : "");

        const response = await fetch(url, {
            method: location.state?.address ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            window.location.href = "/user/address";
        }
    };

    return (
        <Fragment>
            <header className={styles.header}>
                <FaBook />
                &nbsp;&nbsp;{address ? "SỬA ĐỊA CHỈ" : "TẠO ĐỊA CHỈ"}
                <Button color="success" onClick={createAddress} className={styles.button}>
                    Lưu địa chỉ
                </Button>
            </header>
            {errors.length > 0 ? (
                <p>
                    {errors.map((error) => (
                        <label className={styles.error}>{error}.</label>
                    ))}
                </p>
            ) : null}
            <table className={styles.form}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label>Họ và tên:</Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                name="receiver-name"
                                id="receiver-name"
                                placeholder="Nhập họ và tên"
                                defaultValue={address != null ? address["receiver_name"] : null}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Điện thoại:</Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="receiver-phone"
                                id="receiver-phone"
                                placeholder="Nhập số điện thoại"
                                defaultValue={address != null ? address["receiver_phone"] : null}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Tỉnh/Thành:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                name="city"
                                id="city"
                                onChange={(e) => setCityId(e.target.value)}
                                defaultValue={cityId}
                            >
                                <option value="" hidden>
                                    Chọn Tỉnh/Thành
                                </option>
                                {cities.map((city) => (
                                    <option value={city["id"]}>{city["name"]}</option>
                                ))}
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Quận/Huyện:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                name="district"
                                id="district"
                                onChange={(e) => setDistrictId(e.target.value)}
                                value={districtId}
                            >
                                <option value="" hidden>
                                    Chọn Quận/Huyện
                                </option>
                                {districts.map((district) => (
                                    <option value={district["id"]}>{district["name"]}</option>
                                ))}
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Phường/Xã:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                name="ward"
                                id="ward"
                                value={wardId}
                                onChange={(e) => setWardId(e.target.value)}
                            >
                                <option value="" hidden>
                                    Chọn Phường/Xã
                                </option>
                                {wards.map((ward) => (
                                    <option value={ward["id"]}>{ward["name"]}</option>
                                ))}
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Đường:</Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="street"
                                id="street"
                                placeholder="Nhập tên đường"
                                defaultValue={address != null ? address["street"] : null}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.labelCol}>Địa chỉ:</Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="address-num"
                                id="address-num"
                                rows="3"
                                placeholder="Nhập địa chỉ (hẻm, số nhà)"
                                defaultValue={address != null ? address["address_num"] : null}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
};

export default EditAddressPage;
