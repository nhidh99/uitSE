import React, { memo } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useHistory } from "react-router";
import { SC } from "./styles";

const AddButton = () => {
    const history = useHistory();
    return (
        <SC.AddButton onClick={() => history.push("/user/addresses/create")}>
            <FaPlusCircle />
            Thêm địa chỉ mới
        </SC.AddButton>
    );
};

export default memo(AddButton);