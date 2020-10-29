import React, { memo, useMemo } from "react";
import { SC } from "./styles";
import { SSC } from "../../share.styles";
import useTableFetch from "../../../../services/hooks/useTableFetch";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import promotionApi from "../../../../services/api/promotionApi";
import PromotionSummaryModel from "../../../../values/models/PromotionSummaryModel";
import { Formik } from "formik";
import queryString from "query-string";
import { useLocation } from "react-router";
import SelectAll from "../components/SelectAll";
import SelectItem from "../components/SelectItem";

const PromotionPage = () => {
    const location = useLocation();

    const { list, count, query, setPage, setTarget } = useTableFetch<PromotionSummaryModel>(
        promotionApi.getByPage,
        // @ts-ignore
        queryString.parse(location.search, { parseNumbers: true })
    );

    const submitSearch = (values: { query: string }) => {};

    const headers = useMemo(
        () => [
            { name: "Mã KM", target: "id" },
            { name: "Khuyến mãi", target: "name" },
            { name: "Hình ảnh", target: undefined },
            { name: "Số lượng", target: "quantity" },
            { name: "Đơn giá", target: "price" },
        ],
        []
    );

    return (
        <>
            <SSC.SectionTitle>
                Danh sách khuyến mãi
                <div>
                    <button className="delete">
                        <FaTrash /> XOÁ
                    </button>

                    <button className="insert">
                        <FaPlus /> THÊM
                    </button>
                </div>
            </SSC.SectionTitle>

            <Formik
                initialValues={{ query: query || "" }}
                onSubmit={submitSearch}
                enableReinitialize={true}
            >
                <SSC.SearchForm noValidate>
                    <SSC.SearchInput name="query" placeholder="Tìm kiếm theo mã hoặc tên" />
                    <SSC.SearchButton>
                        <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                        Tim kiem
                    </SSC.SearchButton>
                </SSC.SearchForm>
            </Formik>

            <SC.Table>
                <tr>
                    <SelectAll />
                    {headers.map((header) => (
                        <th
                            onClick={header.target ? () => setTarget(header.target) : undefined}
                            className={header.target ? "sortable" : "unsortable"}
                        >
                            {header.name}
                        </th>
                    ))}
                </tr>

                {list
                    ? list.map((product) => (
                          <tr onClick={() => alert("hey")}>
                              <SelectItem />
                              <td className="id">{product.id}</td>
                              <td className="name">{product.name}</td>
                              <td className="image">
                                  <img
                                      src={product.image_url}
                                      width={30}
                                      height={30}
                                      alt={product.name}
                                  />
                              </td>
                              <td className="quantity">{product.quantity}</td>
                              <td className="price">
                                  {product.price.toLocaleString()}
                                  <u>đ</u>
                              </td>
                          </tr>
                      ))
                    : null}
            </SC.Table>
        </>
    );
};

export default memo(PromotionPage);
