import React from "react";
import { FaAddressBook } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import AddressModel from "../../../../../../values/models/AddressModel";
import { SC } from "./styles";

type DeliveryAddressProps = {
    addresses: AddressModel[];
};

const DeliveryAddress = ({ addresses }: DeliveryAddressProps) => (
    <SC.Container>
        {addresses.length === 0 ? (
            <EmptyBlock
                icon={<FaAddressBook />}
                title="Bạn cần tối thiểu 01 địa chỉ để tiến hành đặt hàng"
                borderless
            />
        ) : (
            <SC.Select id="address">
                {addresses.map((address) => (
                    <option value={address.id}>
                        {address.receiver_name} - {address.receiver_phone} -{" "}
                        {address.location}
                    </option>
                ))}
            </SC.Select>
        )}
    </SC.Container>
);

export default DeliveryAddress;
