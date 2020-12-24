package org.example.service.api.checker;

import org.example.input.form.AddressInput;

public interface AddressChecker {
    void checkExistedUserAddress(String username, Integer addressId);

    void checkExistedAddressLocation(Integer cityId, Integer districtId, Integer wardId);

    void checkAddressInput(AddressInput addressInput);
}
