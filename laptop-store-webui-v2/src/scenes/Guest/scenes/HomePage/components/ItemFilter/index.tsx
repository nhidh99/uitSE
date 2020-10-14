import { Field, Formik } from "formik";
import React from "react";
import { SC } from "./styles";

const ItemFilter = () => {
    return (
        <SC.Container>
            <SC.Header>BỘ LỌC</SC.Header>
            <Formik initialValues={{}} onSubmit={() => {}}>
                <SC.FilterForm>
                    <SC.Title>Hãng sản xuất</SC.Title>
                    <SC.BrandGroup>
                        <label>
                            <Field name="brands" type="checkbox" value="ACER" />
                            Acer
                        </label>
                        <label>
                            <Field name="brands" type="checkbox" value="ASUS" />
                            Asus
                        </label>
                        <label>
                            <Field name="brands" type="checkbox" value="DELL" />
                            Dell
                        </label>
                        <label>
                            <Field name="brands" type="checkbox" value="HP" />
                            HP
                        </label>
                        <label>
                            <Field name="brands" type="checkbox" value="LENOVO" />
                            Lenovo
                        </label>
                        <label>
                            <Field name="brands" type="checkbox" value="MACBOOK" />
                            Macbook
                        </label>
                        <label>
                            <Field name="brands" type="checkbox" value="MSI" />
                            MSI
                        </label>
                    </SC.BrandGroup>

                    <SC.Title>Mức giá</SC.Title>
                    <SC.InputGroup>
                        <label>
                            <Field name="price" type="radio" value="0" />
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
                            <Field name="tags" type="checkbox" value="OFFICE" />
                            Học tập - văn phòng
                        </label>
                        <label>
                            <Field name="tags" type="checkbox" value="TECHNICAL" />
                            Đồ họa - kỹ thuật
                        </label>
                        <label>
                            <Field name="tags" type="checkbox" value="GAMING" />
                            Laptop Gaming
                        </label>
                        <label>
                            <Field name="tags" type="checkbox" value="LUXURY" />
                            Cao cấp - sang trọng
                        </label>
                        <label>
                            <Field name="tags" type="checkbox" value="LIGHTRIGHT" />
                            Mỏng nhẹ
                        </label>
                    </SC.InputGroup>

                    <SC.Title>CPU</SC.Title>
                    <SC.InputGroup>
                        <label>
                            <Field name="cpus" type="checkbox" value="INTEL_CORE_I7" />
                            Intel Core i7
                        </label>
                        <label>
                            <Field name="cpus" type="checkbox" value="INTEL_CORE_I5" />
                            Intel Core i5
                        </label>
                        <label>
                            <Field name="cpus" type="checkbox" value="INTEL_CORE_I3" />
                            Intel Core i3
                        </label>
                        <label>
                            <Field name="cpus" type="checkbox" value="INTEL_CELERON" />
                            Intel Core Celeron
                        </label>
                        <label>
                            <Field name="cpus" type="checkbox" value="INTEL_PENTIUM" />
                            Intel Core Pentium
                        </label>
                        <label>
                            <Field name="cpus" type="checkbox" value="AMD" />
                            AMD
                        </label>
                    </SC.InputGroup>

                    <SC.Title>RAM</SC.Title>
                    <SC.InputGroup>
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
                    </SC.InputGroup>

                    <SC.Button>Tìm kiếm</SC.Button>
                </SC.FilterForm>
            </Formik>
        </SC.Container>
    );
};

export default ItemFilter;
