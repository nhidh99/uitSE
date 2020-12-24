package org.example.service.api.creator;

import org.example.input.form.AddressInput;
import org.example.model.Address;

import java.util.List;

public interface AddressCreator {
    List<Address> createUserAddressesStartWithDefault(String username);

    Address createUserAddress(AddressInput addressInput);
}
