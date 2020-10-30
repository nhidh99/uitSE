import React, { memo, useMemo } from "react";
import { SC } from "./styles";
import { SSC } from "../../share.styles";
import useTableFetch from "../../../../services/hooks/useTableFetch";
import { FaGift, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import promotionApi from "../../../../services/api/promotionApi";
import PromotionSummaryModel from "../../../../values/models/PromotionSummaryModel";
import { Formik } from "formik";
import SelectAll from "../components/SelectAll";
import SelectItem from "../components/SelectItem";
import Loader from "../../../../components/Loader";
import EmptyBlock from "../../../../components/EmptyBlock";
import Paginate from "../../../../components/Paginate";

const PromotionPage = () => {
    const { list, count, query, page, setPage, setTarget } = useTableFetch<PromotionSummaryModel>(
        promotionApi.getByPage
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

    const pageChange = (e: { selected: number }) => {
        setPage(e.selected + 1);
    };

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

            {list ? (
                list.length > 0 ? (
                    <>
                        <SC.Table>
                            <tr>
                                <SelectAll />
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
                            ))}
                        </SC.Table>
                        <Paginate
                            count={count}
                            initialPage={page || 1}
                            sizePerPage={10}
                            pageChange={pageChange}
                        />
                    </>
                ) : (
                    <SSC.EmptyContainer>
                        <EmptyBlock
                            icon={<FaGift />}
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

export default memo(PromotionPage);
