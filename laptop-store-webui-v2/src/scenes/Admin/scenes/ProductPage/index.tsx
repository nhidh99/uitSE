/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SC } from "./styles";
import { SSC } from "../../share.styles";
import ProductSummaryModel from "../../../../values/models/ProductSummaryModel";
import laptopApi from "../../../../services/api/laptopApi";
import useTableFetch from "../../../../services/hooks/useTableFetch";
import { FaLaptop, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Paginate from "../../../../components/Paginate";
import EmptyBlock from "../../../../components/EmptyBlock";
import Loader from "../../../../components/Loader";
import queryString from "query-string";
import { useLocation } from "react-router";

const ProductPage = () => {
    const location = useLocation();

    const { list, count, page, setPage, setQuery, setTarget } = useTableFetch<ProductSummaryModel>(
        laptopApi.getByPage,
        // @ts-ignore
        queryString.parse(location.search, { parseNumbers: true })
    );

    const headers = useMemo(
        () => [
            { name: "Mã SP", target: "id" },
            { name: "Sản phẩm", target: "name" },
            { name: "Hình ảnh", target: undefined },
            { name: "Số lượng", target: "quantity" },
            { name: "Đơn giá", target: "unit_price" },
            { name: "Đánh giá", target: "rating" },
        ],
        []
    );

    const search = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            // @ts-ignore
            setQuery(e.currentTarget.value);
        }
    }, []);

    const submitSearch = useCallback((e: any) => {
        // @ts-ignore
        const query = document.getElementById("search").value;
        setQuery(query);
    }, []);

    const pageChange = (e: { selected: number }) => {
        setPage(e.selected + 1);
    };

    return (
        <>
            <SSC.SectionTitle>
                Danh sách sản phẩm
                <div>
                    <button className="delete">
                        <FaTrash /> XOÁ
                    </button>

                    <button className="insert">
                        <FaPlus /> THÊM
                    </button>
                </div>
            </SSC.SectionTitle>

            <SSC.SearchContainer>
                <SSC.SearchInput
                    id="search"
                    onKeyUp={search}
                    placeholder="Tìm kiếm theo mã hoặc tên"
                />
                <SSC.SearchButton onClick={submitSearch}>
                    <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                    Tìm kiếm
                </SSC.SearchButton>
            </SSC.SearchContainer>

            {list ? (
                list.length > 0 ? (
                    <>
                        <SC.Table>
                            <tr>
                                <th className="select">
                                    <input type="checkbox" />
                                </th>
                                {headers.map((h) => (
                                    <th
                                        onClick={h.target ? () => setTarget(h.target) : undefined}
                                        className={h.target ? "sortable" : "unsortable"}
                                    >
                                        {h.name}
                                    </th>
                                ))}
                            </tr>
                            {list.map((product) => (
                                <tr>
                                    <td className="select">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="id">{product.id}</td>
                                    <td className="name">{product.name}</td>
                                    <td className="image">
                                        <img
                                            src={product.image_url}
                                            width={40}
                                            height={40}
                                            alt={product.name}
                                        />
                                    </td>
                                    <td className="quantity">{product.quantity}</td>
                                    <td className="unit_price">
                                        {product.unit_price.toLocaleString()}
                                        <u>đ</u>
                                    </td>
                                    <td className="rating">{product.avg_rating.toFixed(1)}</td>
                                </tr>
                            ))}
                        </SC.Table>
                        <Paginate
                            count={count}
                            initialPage={page}
                            sizePerPage={10}
                            pageChange={pageChange}
                        />
                    </>
                ) : (
                    <SSC.EmptyContainer>
                        <EmptyBlock
                            icon={<FaLaptop />}
                            title="Không tìm thấy sản phẩm nào"
                            borderless
                        />
                    </SSC.EmptyContainer>
                )
            ) : (
                <Loader loading={true} loadOnce={true} />
            )}
        </>
    );
};

export default ProductPage;
