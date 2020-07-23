package org.example.service.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.LaptopImageDAO;
import org.example.dao.api.PromotionDAO;
import org.example.input.ImageInput;
import org.example.service.api.ImageService;
import org.example.type.ImageType;

import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/{resolution}")
public class ImageServiceImpl implements ImageService {

    private PromotionDAO promotionDAO;
    private LaptopDAO laptopDAO;
    private LaptopImageDAO laptopImageDAO;

    private static final int LAPTOP_BIG_IMAGE_RESOLUTION = 1000;
    private static final int LAPTOP_IMAGE_RESOLUTION = 400;
    private static final int LAPTOP_THUMBNAIL_RESOLUTION = 150;
    private static final int PROMOTION_IMAGE_RESOLUTION = 200;

    private static final Map<Integer, ImageType> laptopResolutionMap = new HashMap<Integer, ImageType>() {{
        put(LAPTOP_BIG_IMAGE_RESOLUTION, ImageType.LAPTOP_BIG_IMAGE);
        put(LAPTOP_IMAGE_RESOLUTION, ImageType.LAPTOP_IMAGE);
        put(LAPTOP_THUMBNAIL_RESOLUTION, ImageType.LAPTOP_THUMBNAIL);
    }};

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
            ImageType type = laptopResolutionMap.get(imageInput.getResolution());
            byte[] image = laptopDAO.findImageById(imageInput.getId(), type);
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
            ImageType type = laptopResolutionMap.get(imageInput.getResolution());
            byte[] image = laptopImageDAO.findImageById(imageInput.getId(), type);
            return (image != null)
                    ? Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}