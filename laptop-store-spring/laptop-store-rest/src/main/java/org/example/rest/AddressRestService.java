package org.example.rest;

import org.example.dto.AddressDetailDTO;
import org.example.input.AddressInput;
import org.example.model.Address;
import org.example.model.User;
import org.example.service.api.AddressService;
import org.example.service.api.LocationService;
import org.example.service.api.UserService;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


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
        AddressDetailDTO output = addressService.findDetailByIdAndUsername(id, username);
        return ResponseEntity.ok(output);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> postAddress(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestBody AddressInput addressInput) {
        try {
            String username = userDetails.getUsername();
            Integer addressId = addressService.createAddress(addressInput, username);
            return ResponseEntity.ok(addressId.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteAddress(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable("id") Integer addressId) {
        try {
            String username = userDetails.getUsername();
            addressService.deleteAddress(addressId, username);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putAddress(@AuthenticationPrincipal UserDetails userDetails,
                                        @PathVariable("id") Integer addressId,
                                        @RequestBody AddressInput addressInput) {
        try {
            String username = userDetails.getUsername();
            addressService.updateAddress(addressId, addressInput, username);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}/default", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> putDefaultAddress(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable("id") Integer addressId) {
        try {
            String username = userDetails.getUsername();
            boolean isValidRequest = addressService.existsByIdAndUsername(addressId, username);
            if (!isValidRequest) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            User user = userService.findByUsername(username);
            user.setDefaultAddressId(addressId);
            userService.save(user);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}