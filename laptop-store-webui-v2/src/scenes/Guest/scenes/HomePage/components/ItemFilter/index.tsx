/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Formik, useFormikContext } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import FilterFormValues from "../../../../../../values/forms/FilterFormValues";
import { SC } from "./styles";
import queryString from "query-string";

const FilterForm = memo(() => {
    const history = useHistory();
    const location = useLocation();

    const { values } = useFormikContext<FilterFormValues>();

    useEffect(() => {
        const params = queryString.stringify(values, { skipEmptyString: true });
        if (params.length === 0) {
            if (location.pathname !== "/") {
                history.push("/");
            }
        } else {
            history.push(`/filter?${params}`);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [values]);

    return (
        <SC.FilterForm>
            <SC.Title>Hãng sản xuất</SC.Title>
            <SC.BrandGroup>
                <label>
                    <Field name="brands" type="checkbox" value="acer" />
                    Acer
                </label>
                <label>
                    <Field name="brands" type="checkbox" value="asus" />
                    Asus
                </label>
                <label>
                    <Field name="brands" type="checkbox" value="dell" />
                    Dell
                </label>
                <label>
                    <Field name="brands" type="checkbox" value="hp" />
                    HP
                </label>
                <label>
                    <Field name="brands" type="checkbox" value="lenovo" />
                    Lenovo
                </label>
                <label>
                    <Field name="brands" type="checkbox" value="macbook" />
                    Macbook
                </label>
                <label>
                    <Field name="brands" type="checkbox" value="msi" />
                    MSI
                </label>
            </SC.BrandGroup>

            <SC.Title>Mức giá</SC.Title>
            <SC.InputGroup>
                <label>
                    <Field name="price" type="radio" value="" />
                    Tất cả mức giá
                </label>
                <label>
                    <Field name="price" type="radio" value="1" />
                    Dưới 10 triệu
                </label>
                <label>
                    <Field name="price" type="radio" value="2" />
                    Từ 10 - 15 triệu
                </label>
                <label>
                    <Field name="price" type="radio" value="3" />
                    Từ 15 - 20 triệu
                </label>
                <label>
                    <Field name="price" type="radio" value="4" />
                    Từ 20 - 25 triệu
                </label>
                <label>
                    <Field name="price" type="radio" value="5" />
                    Trên 25 triệu
                </label>
            </SC.InputGroup>

            <SC.Title>Nhu cầu</SC.Title>
            <SC.InputGroup>
                <label>
                    <Field name="tags" type="checkbox" value="office" />
                    Học tập - văn phòng
                </label>
                <label>
                    <Field name="tags" type="checkbox" value="technical" />
                    Đồ họa - kỹ thuật
                </label>
                <label>
                    <Field name="tags" type="checkbox" value="gaming" />
                    Laptop Gaming
                </label>
                <label>
                    <Field name="tags" type="checkbox" value="luxury" />
                    Cao cấp - sang trọng
                </label>
                <label>
                    <Field name="tags" type="checkbox" value="lightweight" />
                    Mỏng nhẹ
                </label>
            </SC.InputGroup>

            <SC.Title>CPU</SC.Title>
            <SC.InputGroup>
                <label>
                    <Field name="cpus" type="checkbox" value="intel_core_i7" />
                    Intel Core i7
                </label>
                <label>
                    <Field name="cpus" type="checkbox" value="intel_core_i5" />
                    Intel Core i5
                </label>
                <label>
                    <Field name="cpus" type="checkbox" value="intel_core_i3" />
                    Intel Core i3
                </label>
                <label>
                    <Field name="cpus" type="checkbox" value="intel_celeron" />
                    Intel Core Celeron
                </label>
                <label>
                    <Field name="cpus" type="checkbox" value="intel_pentium" />
                    Intel Core Pentium
                </label>
                <label>
                    <Field name="cpus" type="checkbox" value="amd" />
                    AMD
                </label>
            </SC.InputGroup>

            <SC.Title>RAM</SC.Title>
            <SC.BrandGroup>
                <label>
                    <Field name="rams" type="checkbox" value="24" />
                    24 GB
                </label>
                <label>
                    <Field name="rams" type="checkbox" value="16" />
                    16 GB
                </label>
                <label>
                    <Field name="rams" type="checkbox" value="8" />8 GB
                </label>
                <label>
                    <Field name="rams" type="checkbox" value="4" />4 GB
                </label>
            </SC.BrandGroup>
        </SC.FilterForm>
    );
});

const ItemFilter = () => {
    const location = useLocation();

    // @ts-ignore
    const initialValues = useMemo<FilterFormValues>(() => {
        const params = queryString.parse(location.search);
        const output = {
            brands: params?.brands ?? [],
            cpus: params?.cpus ?? [],
            price: params?.price ?? "",
            rams: params?.rams ?? [],
            tags: params?.tags ?? [],
        };

        Object.keys(output).forEach((key) => {
            if (key !== "price") {
                // @ts-ignore
                output[key] = Array.isArray(output[key]) ? output[key] : [output[key]];
            }
        });
        return output;
    }, []);

    return (
        <SC.Container>
            <SC.Header>BỘ LỌC</SC.Header>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
                <FilterForm />
            </Formik>
        </SC.Container>
    );
};

export default memo(ItemFilter);