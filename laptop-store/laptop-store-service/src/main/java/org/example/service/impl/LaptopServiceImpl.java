package org.example.service.impl;

import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.LaptopImageDAO;
import org.example.dao.api.PromotionDAO;
import org.example.dao.api.TagDAO;
import org.example.filter.LaptopFilter;
import org.example.filter.LaptopSearchFilter;
import org.example.input.LaptopInput;
import org.example.model.*;
import org.example.security.Secured;
import org.example.service.api.LaptopService;
import org.example.type.*;
import org.example.util.api.ImageUtils;

import javax.imageio.ImageIO;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public class LaptopServiceImpl implements LaptopService {

    private LaptopDAO laptopDAO;
    private PromotionDAO promotionDAO;
    private TagDAO tagDAO;
    private LaptopImageDAO laptopImageDAO;
    private ImageUtils imageUtils;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptops(@BeanParam LaptopFilter laptopFilter) {
        try {
            return laptopFilter.getIds().isEmpty()
                    ? findByPage(laptopFilter.getPage())
                    : findByIds(laptopFilter.getIds());
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Response findByPage(Integer page) {
        List<Laptop> laptops = laptopDAO.findByPage(page);
        Long laptopCount = laptopDAO.findTotalLaptops(null);
        return Response.ok(laptops).header("X-Total-Count", laptopCount).build();
    }

    private Response findByIds(List<Integer> ids) {
        List<Laptop> laptops = laptopDAO.findByIds(ids);
        return Response.ok(laptops).build();
    }

    @Override
    @GET
    @Path("/best-selling")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopsBySelling(@QueryParam("page") @DefaultValue("1") Integer page) {
        List<Laptop> laptops = laptopDAO.findBySelling(page);
        Long laptopCount = laptopDAO.findTotalLaptops(null);
        return Response.ok(laptops).header("X-Total-Count", laptopCount).build();
    }

    @Override
    @GET
    @Path("/recent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopsByCreatedDateDesc(@QueryParam("page") @DefaultValue("1") Integer page) {
        List<Laptop> laptops = laptopDAO.findByCreatedDateDesc(page);
        Long laptopCount = laptopDAO.findTotalLaptops(null);
        return Response.ok(laptops).header("X-Total-Count", laptopCount).build();
    }

    @Override
    @GET
    @Path("/discount")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopsByDiscountDesc(@QueryParam("page") @DefaultValue("1") Integer page) {
        List<Laptop> laptops = laptopDAO.findByDiscountDesc(page);
        Long laptopCount = laptopDAO.findTotalLaptops(null);
        return Response.ok(laptops).header("X-Total-Count", laptopCount).build();
    }

    @Override
    @GET
    @Path("/cheap")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopsByPriceAsc(@QueryParam("page") @DefaultValue("1") Integer page) {
        List<Laptop> laptops = laptopDAO.findByPriceAsc(page);
        Long laptopCount = laptopDAO.findTotalLaptops(null);
        return Response.ok(laptops).header("X-Total-Count", laptopCount).build();
    }

    @Override
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopById(@PathParam("id") Integer id) {
        try {
            Optional<Laptop> optLaptop = laptopDAO.findById(id);
            if (optLaptop.isPresent() && optLaptop.get().isRecordStatus()) {
                Laptop laptop = optLaptop.get();
                return Response.ok(laptop).build();
            }
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/suggestions")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopSuggestions(@PathParam("id") Integer laptopId) {
        List<Laptop> laptops = laptopDAO.findSuggestionsByLaptop(laptopId);
        return Response.ok(laptops).build();
    }

    @Override
    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    @Secured(RoleType.ADMIN)
    public Response findLaptopsByFilter(@QueryParam("q") String queryParam, @QueryParam("page") Integer page) {
        try {
            List<Laptop> laptops = laptopDAO.findByFilter(queryParam, page);
            Long laptopCount = laptopDAO.findTotalLaptops(queryParam);
            return Response.ok(laptops).header("X-Total-Count", laptopCount).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Secured(RoleType.ADMIN)
    public Response createLaptop(@Multipart(value = "details", type = "application/json") LaptopInput laptopInput,
                                 @Multipart(value = "image", type = "image/*") Attachment attachment) {
        try {
            Laptop laptop = buildLaptopFromLaptopRequestBody(laptopInput, attachment);
            laptopDAO.save(laptop);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Secured(RoleType.ADMIN)
    public Response updateLaptop(@PathParam("id") Integer laptopId,
                                 @Multipart(value = "details", type = "application/json") LaptopInput laptopInput,
                                 @Multipart(value = "image", type = "image/*") Attachment attachment) {
        try {
            Laptop laptop = buildLaptopFromLaptopRequestBody(laptopInput, attachment);
            laptop.setId(laptopId);
            laptopDAO.save(laptop);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Laptop buildLaptopFromLaptopRequestBody(LaptopInput laptopInput, Attachment attachment) throws IOException {
        String alt = imageUtils.buildSEOImageName(laptopInput.getName());
        byte[] imageBlob = null, thumbnailBlob = null;
        boolean isEmptyUploadedImages = attachment.getDataHandler().getName().equals("empty.jpg");
        if (!isEmptyUploadedImages) {
            InputStream is = attachment.getDataHandler().getInputStream();
            BufferedImage image = ImageIO.read(is);
            imageBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_IMAGE);
            thumbnailBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_THUMBNAIL);
        }

        List<Promotion> promotions = promotionDAO.findByIds(laptopInput.getPromotionIds());
        List<Tag> tags = tagDAO.findByIds(laptopInput.getTagIds());

        return Laptop.builder()
                .brand(laptopInput.getBrand())
                .design(laptopInput.getDesign())
                .discountPrice(laptopInput.getDiscountPrice())
                .graphisCard(laptopInput.getGraphicsCard())
                .os(laptopInput.getOs())
                .ports(laptopInput.getPorts())
                .quantity(laptopInput.getQuatity())
                .name(laptopInput.getName())
                .thickness(laptopInput.getThickness())
                .unitPrice(laptopInput.getUnitPrice())
                .weight(laptopInput.getWeight())
                .cpu(laptopInput.extractCPU())
                .monitor(laptopInput.extractMonitor())
                .hardDrive(laptopInput.extractHardDrive())
                .ram(laptopInput.extractRAM())
                .tags(tags).promotions(promotions).recordStatus(true)
                .alt(alt).image(imageBlob).thumbnail(thumbnailBlob).build();
    }

    @Override
    @PUT
    @Path("/{id}/detail-images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Secured(RoleType.ADMIN)
    public Response updateLaptopDetailImages(
            @PathParam("id") Integer laptopId,
            @Multipart(value = "del-ids", type = "application/json") Integer[] deleteIds,
            @Multipart(value = "uploads", type = "image/*") List<Attachment> attachments) {
        try {
            List<LaptopImage> uploadedImages = buildUploadedImagesFromRequestBody(laptopId, attachments);
            List<LaptopImage> deletedImages = buildDeletedImagesFromRequestBody(laptopId, deleteIds);
            laptopImageDAO.update(uploadedImages, deletedImages);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private List<LaptopImage> buildUploadedImagesFromRequestBody(Integer laptopId, List<Attachment> attachments) throws Exception {
        Laptop laptop = laptopDAO.findById(laptopId).orElseThrow(Exception::new);
        List<LaptopImage> uploadedImages = new LinkedList<>();
        boolean isEmptyUploadedImages = attachments.size() == 1 && attachments.get(0).getDataHandler().getName().equals("empty.jpg");

        if (!isEmptyUploadedImages) {
            for (Attachment attachment : attachments) {
                InputStream is = attachment.getDataHandler().getInputStream();
                BufferedImage image = ImageIO.read(is);
                byte[] imageBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_IMAGE);
                LaptopImage laptopImage = LaptopImage.builder().id(null).image(imageBlob).laptop(laptop).build();
                uploadedImages.add(laptopImage);
            }
        }
        return uploadedImages;
    }

    private List<LaptopImage> buildDeletedImagesFromRequestBody(Integer laptopId, Integer[] deleteIds) {
        List<Integer> curImageIds = laptopImageDAO.findIdsByLaptopId(laptopId);
        List<Integer> deletedImageIds = Arrays.asList(deleteIds);
        boolean isValidDeletion = curImageIds.containsAll(deletedImageIds);
        if (isValidDeletion) {
            return laptopImageDAO.findByIds(deletedImageIds);
        } else {
            throw new BadRequestException();
        }
    }

    @Override
    @DELETE
    @Path("/{id}")
    public Response deleteLaptop(@PathParam("id") Integer id) {
        try {
            laptopDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/promotions")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findPromotionsById(@PathParam("id") Integer id) {
        try {
            List<Promotion> promotions = promotionDAO.findByLaptopId(id);
            return promotions == null
                    ? Response.status(Response.Status.NOT_FOUND).build()
                    : Response.ok(promotions).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/tags")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findTagsById(@PathParam("id") Integer id) {
        try {
            List<Tag> tags = tagDAO.findByLaptopId(id);
            return tags == null
                    ? Response.status(Response.Status.BAD_REQUEST).build()
                    : Response.ok(tags).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/image-ids")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findDetailImageIdsById(@PathParam("id") Integer id) {
        try {
            List<Integer> ids = laptopImageDAO.findIdsByLaptopId(id);
            return ids == null
                    ? Response.status(Response.Status.BAD_REQUEST).build()
                    : Response.ok(ids).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/filter")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchLaptop(@BeanParam LaptopSearchFilter laptopSearchFilter) {
        try {
            List<Laptop> laptops = laptopDAO.findByFilter(laptopSearchFilter);
            return Response.ok(laptops).build();
        } catch (Exception e) {
            return Response.serverError().entity(e.getMessage()).build();
        }
    }
}