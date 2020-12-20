package org.example.rest;

import org.example.dto.address.AddressDetailDTO;
import org.example.input.form.AddressInput;
import org.example.service.api.AddressService;
import org.example.service.api.UserService;
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

    @Autowired
    private UserService userService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getAddressById(@AuthenticationPrincipal UserDetails userDetails,
                                            @PathVariable("id") Integer id) {
        String username = userDetails.getUsername();
        AddressDetailDTO output = addressService.findUserAddressDetail(id, username);
        return ResponseEntity.ok(output);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postAddress(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestBody AddressInput addressInput) {
        String username = userDetails.getUsername();
        addressInput.setUsername(username);
        Integer addressId = addressService.insertUserAddress(addressInput);
        return ResponseEntity.ok(addressId.toString());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteUserAddress(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable("id") Integer addressId) {
        try {
            String username = userDetails.getUsername();
            addressService.deleteUserAddress(addressId, username);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putAddress(@AuthenticationPrincipal UserDetails userDetails,
                                        @PathVariable("id") Integer addressId,
                                        @RequestBody AddressInput addressInput) {
        String username = userDetails.getUsername();
        addressInput.setAddressId(addressId);
        addressInput.setUsername(username);
        addressService.updateUserAddress(addressInput);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/default", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putDefaultAddress(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable("id") Integer addressId) {
        try {
            String username = userDetails.getUsername();
            userService.setDefaultAddress(username, addressId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}