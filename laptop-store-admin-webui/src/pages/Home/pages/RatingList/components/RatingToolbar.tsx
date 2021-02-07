import ActionButton from "@/pages/Home/components/ActionButton";
import SearchBar from "@/pages/Home/components/SearchBar";
import React, { memo } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function RatingToolbar() {
    return (
        <div className="flex justify-between gap-3">
            <SearchBar placeholder="Tim kiem" />
            <div className="flex gap-3">
                <ActionButton icon={<FaCheck />} title="Duyệt" onClick={() => {}} isMobileHidden />
                <ActionButton icon={<FaTimes />} title="Xoá" onClick={() => {}} isMobileHidden />
            </div>
        </div>
    );
}

export default memo(RatingToolbar);
