import React, { memo } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { SSC } from "../../../../share.styles";

const PromotionHeader = () => {
    return (
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
    );
};

export default memo(PromotionHeader);
