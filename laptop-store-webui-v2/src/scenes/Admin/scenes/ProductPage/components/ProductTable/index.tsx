import React, { memo, useMemo } from "react";
import { FaLaptop } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Loader from "../../../../../../components/Loader";
import Paginate from "../../../../../../components/Paginate";
import laptopApi from "../../../../../../services/api/laptopApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import ProductSummaryModel from "../../../../../../values/models/ProductSummaryModel";
import { SSC } from "../../../../share.styles";
import SelectAll from "../../../components/SelectAll";
import SelectItem from "../../../components/SelectItem";
import { SC } from "./styles";

const ProductTable = () => {
    const { list, count, page, setTarget } = useTableFetch<ProductSummaryModel>(
        laptopApi.getByPage
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

    return list ? (
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
                        <tr>
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
                            <td className="unit_price">
                                {product.unit_price.toLocaleString()}
                                <u>đ</u>
                            </td>
                            <td className="rating">{product.avg_rating.toFixed(1)}</td>
                        </tr>
                    ))}
                </SC.Table>
                <Paginate count={count} initialPage={page || 1} sizePerPage={10} />
            </>
        ) : (
            <SSC.EmptyContainer>
                <EmptyBlock icon={<FaLaptop />} title="Không tìm thấy sản phẩm nào" borderless />
            </SSC.EmptyContainer>
        )
    ) : (
        <Loader loading={true} loadOnce={true} />
    );
};

export default memo(ProductTable);
