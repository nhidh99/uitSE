import React from "react";
import AddressModel from "../../../../../../values/models/AddressModel";
import { SC } from "./styles";

type DeliveryAddressProps = {
    addresses: AddressModel[];
};

const DeliveryAddress = ({ addresses }: DeliveryAddressProps) => (
    <SC.Container>
        <SC.Select id="address">
            {addresses.map((address) => (
                <option value={address.id}>
                    {address.receiver_name} - {address.receiver_phone} - {address.location}
                </option>
            ))}
        </SC.Select>
    </SC.Container>
);

export default DeliveryAddress;
