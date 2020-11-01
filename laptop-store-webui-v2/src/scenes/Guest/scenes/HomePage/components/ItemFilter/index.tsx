/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import FilterFormValues from "../../../../../../values/forms/FilterFormValues";
import { SC } from "./styles";
import queryString from "query-string";
import { useForm } from "react-hook-form";

const ItemFilter = () => {
    const history = useHistory();
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

    const { register, getValues } = useForm({
        defaultValues: initialValues,
    });

    const filter = (e: React.FormEvent<HTMLFormElement>) => {
        const params = queryString.stringify(getValues(), { skipEmptyString: true });
        if (params.length === 0) {
            if (location.pathname !== "/") {
                history.push("/");
            }
        } else {
            history.push({
                pathname: "/filter",
                search: params,
            });
        }
        window.scrollTo({ top: 230, behavior: "smooth" });
    };

    return (
        <SC.Container>
            <SC.Header>BỘ LỌC</SC.Header>
            <SC.Form onChange={filter}>
                <SC.Title>Hãng sản xuất</SC.Title>
                <SC.BrandGroup>
                    <label>
                        <input ref={register} name="brands" type="checkbox" value="acer" />
                        Acer
                    </label>

                    <label>
                        <input ref={register} name="brands" type="checkbox" value="asus" />
                        Asus
                    </label>

                    <label>
                        <input ref={register} name="brands" type="checkbox" value="dell" />
                        Dell
                    </label>

                    <label>
                        <input ref={register} name="brands" type="checkbox" value="hp" />
                        HP
                    </label>

                    <label>
                        <input ref={register} name="brands" type="checkbox" value="lenovo" />
                        Lenovo
                    </label>

                    <label>
                        <input ref={register} name="brands" type="checkbox" value="macbook" />
                        Macbook
                    </label>

                    <label>
                        <input ref={register} name="brands" type="checkbox" value="msi" />
                        MSI
                    </label>
                </SC.BrandGroup>

                <SC.Title>Mức giá</SC.Title>
                <SC.InputGroup>
                    <label>
                        <input ref={register} name="price" type="radio" value="" />
                        Tất cả mức giá
                    </label>

                    <label>
                        <input ref={register} name="price" type="radio" value="1" />
                        Dưới 10 triệu
                    </label>

                    <label>
                        <input ref={register} name="price" type="radio" value="2" />
                        Từ 10 - 15 triệu
                    </label>

                    <label>
                        <input ref={register} name="price" type="radio" value="3" />
                        Từ 15 - 20 triệu
                    </label>

                    <label>
                        <input ref={register} name="price" type="radio" value="4" />
                        Từ 20 - 25 triệu
                    </label>

                    <label>
                        <input ref={register} name="price" type="radio" value="5" />
                        Trên 25 triệu
                    </label>
                </SC.InputGroup>

                <SC.Title>Nhu cầu</SC.Title>
                <SC.InputGroup>
                    <label>
                        <input ref={register} name="tags" type="checkbox" value="office" />
                        Học tập - văn phòng
                    </label>

                    <label>
                        <input ref={register} name="tags" type="checkbox" value="technical" />
                        Đồ họa - kỹ thuật
                    </label>

                    <label>
                        <input ref={register} name="tags" type="checkbox" value="gaming" />
                        Laptop Gaming
                    </label>

                    <label>
                        <input ref={register} name="tags" type="checkbox" value="luxury" />
                        Cao cấp - sang trọng
                    </label>

                    <label>
                        <input ref={register} name="tags" type="checkbox" value="lightweight" />
                        Mỏng nhẹ
                    </label>
                </SC.InputGroup>

                <SC.Title>CPU</SC.Title>
                <SC.InputGroup>
                    <label>
                        <input ref={register} name="cpus" type="checkbox" value="intel_core_i7" />
                        Intel Core i7
                    </label>

                    <label>
                        <input ref={register} name="cpus" type="checkbox" value="intel_core_i5" />
                        Intel Core i5
                    </label>

                    <label>
                        <input ref={register} name="cpus" type="checkbox" value="intel_core_i3" />
                        Intel Core i3
                    </label>

                    <label>
                        <input ref={register} name="cpus" type="checkbox" value="intel_celeron" />
                        Intel Core Celeron
                    </label>

                    <label>
                        <input ref={register} name="cpus" type="checkbox" value="intel_pentium" />
                        Intel Core Pentium
                    </label>
                    <label>
                        <input ref={register} name="cpus" type="checkbox" value="amd" />
                        AMD
                    </label>
                </SC.InputGroup>

                <SC.Title>RAM</SC.Title>
                <SC.BrandGroup>
                    <label>
                        <input ref={register} name="rams" type="checkbox" value="24" />
                        24 GB
                    </label>

                    <label>
                        <input ref={register} name="rams" type="checkbox" value="16" />
                        16 GB
                    </label>

                    <label>
                        <input ref={register} name="rams" type="checkbox" value="8" />8 GB
                    </label>

                    <label>
                        <input ref={register} name="rams" type="checkbox" value="4" />4 GB
                    </label>
                </SC.BrandGroup>
            </SC.Form>
        </SC.Container>
    );
};

export default memo(ItemFilter);
