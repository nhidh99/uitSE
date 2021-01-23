package org.example.rest;

import org.example.dto.address.AddressDetailDTO;
import org.example.input.form.AddressInput;
import org.example.service.api.service.AddressService;
import org.example.service.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/addresses")
@PreAuthorize("isAuthenticated()")
public class AddressRestService {
    @Autowired
    private AddressService addressService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getAddressById(@PathVariable("id") Integer id) {
        AddressDetailDTO output = addressService.findUserAddressDetail(id);
        return ResponseEntity.ok(output);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postAddress(@RequestBody AddressInput addressInput) {
        Integer addressId = addressService.insertUserAddress(addressInput);
        return ResponseEntity.ok(addressId.toString());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteUserAddress(@PathVariable("id") Integer addressId) {
        try {
            addressService.deleteUserAddress(addressId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putAddress(@PathVariable("id") Integer addressId,
                                        @RequestBody AddressInput addressInput) {
        addressInput.setAddressId(addressId);
        addressService.updateUserAddress(addressInput);
        return ResponseEntity.noContent().build();
    }
}