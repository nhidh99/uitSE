import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import addressApi from "../../../../../../services/api/addressApi";
import AddressModel from "../../../../../../values/models/AddressModel";
import { SC } from "./styles";

type AddressBlockProps = {
    address: AddressModel;
    isDefaultAddress: boolean;
};

const AddressBlock = ({ address, isDefaultAddress }: AddressBlockProps) => {
    const deleteAddress = async () => {
        const result = window.confirm("Xác nhận xóa địa chỉ?");
        if (result) {
            try {
                await addressApi.deleteAddress(address.id);
                window.location.reload();
            } catch (err) {
                alert("Lỗi");
            }
        }
    };

    return (
        <SC.BlockContainer>
            <SC.ButtonsContainer>
                <Link to={`/user/addresses/edit/${address.id}`}>
                    <SC.EditButton />
                </Link>
                <SC.DeleteButton onClick={deleteAddress} />
            </SC.ButtonsContainer>

            {isDefaultAddress ? (
                <SC.DefaultAddress>
                    <FaCheckCircle />
                    Địa chỉ mặc định
                </SC.DefaultAddress>
            ) : null}
            
            <SC.InfoContainer>
                <SC.ReceiverName>{address.receiver_name}</SC.ReceiverName>{" "}
            </SC.InfoContainer>

            <SC.InfoContainer>
                <SC.DeliveryField>Điện thoại: </SC.DeliveryField>
                {address.receiver_phone}
            </SC.InfoContainer>

            <SC.InfoContainer>
                <SC.DeliveryField>Địa chỉ: </SC.DeliveryField>
                {address.location}
            </SC.InfoContainer>
        </SC.BlockContainer>
    );
};

export default AddressBlock;
