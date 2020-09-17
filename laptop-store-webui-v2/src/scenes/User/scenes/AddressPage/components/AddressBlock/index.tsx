import React from "react";
import { Link } from "react-router-dom";
import AddressModel from "../../../../../../values/models/AddressModel";
import { SC } from "./styles";

type AddressBlockProps = {
    address: AddressModel;
};

const AddressBlock = ({ address }: AddressBlockProps) => (
    <SC.BlockContainer>
        <SC.ButtonsContainer>
            <Link to={`/users/addresses/${address.id}`}>
                <SC.EditButton />
            </Link>
            <SC.DeleteButton />
        </SC.ButtonsContainer>

        <SC.InfoContainer>
            <SC.ReceiverName>{address.receiver_name}</SC.ReceiverName>
        </SC.InfoContainer>

        <SC.InfoContainer>
            <SC.DeliveryField>Điện thoại: </SC.DeliveryField>
            {address.receiver_phone}
        </SC.InfoContainer>

        <SC.InfoContainer>
            <SC.DeliveryField>Địa chỉ: </SC.DeliveryField>
            {`${address.address_num} ${[
                address.street,
                address.ward,
                address.district,
                address.city,
            ].join(", ")}`}
        </SC.InfoContainer>
    </SC.BlockContainer>
);

export default AddressBlock;
