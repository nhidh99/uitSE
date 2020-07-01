package org.example.service.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.LaptopImageDAO;
import org.example.dao.api.PromotionDAO;
import org.example.input.ImageInput;
import org.example.service.api.ImageService;

import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

@Path("/{resolution}")
public class ImageServiceImpl implements ImageService {

    private PromotionDAO promotionDAO;
    private LaptopDAO laptopDAO;
    private LaptopImageDAO laptopImageDAO;

    private static final int LAPTOP_IMAGE_RESOLUTION = 600;
    private static final int LAPTOP_THUMBNAIL_RESOLUTION = 400;
    private static final int PROMOTION_IMAGE_RESOLUTION = 200;

    @Override
    @GET
    @Path("/promotions/{id}/{alt}.jpg")
    @Produces("image/jpeg")
    public Response findPromotionImage(@BeanParam ImageInput imageInput) {
        try {
            byte[] image = imageInput.getResolution() == PROMOTION_IMAGE_RESOLUTION
                    ? promotionDAO.findImageById(imageInput.getId()) : null;
            return (image != null)
                    ? Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/laptops/{id}/{alt}.jpg")
    @Produces("image/jpeg")
    public Response findLaptopImage(@BeanParam ImageInput imageInput) {
        try {
            byte[] image;
            Integer id = imageInput.getId();
            switch (imageInput.getResolution()) {
                case LAPTOP_IMAGE_RESOLUTION:
                    image = laptopDAO.findImageById(id);
                    break;
                case LAPTOP_THUMBNAIL_RESOLUTION:
                    image = laptopDAO.findThumbnailById(id);
                    break;
                default:
                    image = null;
                    break;
            }
            return (image != null)
                    ? Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/details/{id}/{alt}.jpg")
    @Produces("image/jpeg")
    public Response findLaptopDetailImage(@BeanParam ImageInput imageInput) {
        try {
            byte[] image = imageInput.getResolution() == LAPTOP_IMAGE_RESOLUTION
                    ? laptopImageDAO.findImageById(imageInput.getId()) : null;
            return (image != null)
                    ? Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}