package org.example.service.impl;

import org.example.dao.api.AddressDAO;
import org.example.dao.api.UserDAO;
import org.example.input.AddressInput;
import org.example.model.Address;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.AddressService;
import org.example.type.RoleType;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

@Secured({RoleType.ADMIN, RoleType.USER})
public class AddressServiceImpl implements AddressService {

    private AddressDAO addressDAO;
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response findAddressById(@PathParam("id") Integer id,
                                    @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            Address address = addressDAO.findById(id).orElseThrow(Exception::new);
            boolean isValidRequest = address.getUser().getId().equals(userId);
            return isValidRequest ? Response.ok(address).build() : Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response createAddress(AddressInput addressInput, @Context SecurityContext securityContext) {
        try {
            Address address = buildAddressFromRequestBody(addressInput, securityContext);
            addressDAO.save(address);
            return Response.status(Response.Status.CREATED).entity(address.getId()).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response updateAddress(@PathParam("id") Integer id, AddressInput addressInput, @Context SecurityContext securityContext) {
        try {
            Address address = buildAddressFromRequestBody(addressInput, securityContext);
            address.setId(id);
            addressDAO.save(address);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Address buildAddressFromRequestBody(AddressInput addressInput, SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        return Address.builder()
                .receiverName(addressInput.getReceiverName())
                .receiverPhone(addressInput.getReceiverPhone())
                .addressNum(addressInput.getAddressNum())
                .street(addressInput.getStreet())
                .ward(addressInput.getWard())
                .district(addressInput.getDistrict())
                .city(addressInput.getCity())
                .user(user).recordStatus(true).build();
    }

    @Override
    @DELETE
    @Path("/{id}")
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response deleteAddress(@PathParam("id") Integer id) {
        try {
            addressDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/default")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response updateDefaultAddress(Integer addressId,
                                         @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
            Address address = addressDAO.findById(addressId).orElseThrow(BadRequestException::new);
            user.setDefaultAddress(address);
            userDAO.update(user);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
