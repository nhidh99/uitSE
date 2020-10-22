import React, { memo } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SC } from "./styles";

const AddButton = () => (
    <Link to="/user/addresses/create">
        <SC.AddButton>
            <FaPlusCircle />
            Thêm địa chỉ mới
        </SC.AddButton>
    </Link>
);

export default memo(AddButton);
