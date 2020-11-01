import React, { memo, useMemo } from "react";
import { FaGift } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Loader from "../../../../../../components/Loader";
import Paginate from "../../../../../../components/Paginate";
import promotionApi from "../../../../../../services/api/promotionApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import PromotionSummaryModel from "../../../../../../values/models/PromotionSummaryModel";
import SelectAll from "../../../components/SelectAll";
import SelectItem from "../../../components/SelectItem";
import { SC } from "./styles";
import { SSC } from "../../../../share.styles";

const PromotionTable = () => {
    const { list, count, page, setTarget } = useTableFetch<PromotionSummaryModel>(
        promotionApi.getByPage
    );

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
                <Paginate count={count} initialPage={page || 1} sizePerPage={10} />
            </>
        ) : (
            <SSC.EmptyContainer>
                <EmptyBlock icon={<FaGift />} title="Không tìm thấy khuyến mãi" borderless />
            </SSC.EmptyContainer>
        )
    ) : (
        <Loader loading={true} loadOnce={true} />
    );
};

export default memo(PromotionTable);
