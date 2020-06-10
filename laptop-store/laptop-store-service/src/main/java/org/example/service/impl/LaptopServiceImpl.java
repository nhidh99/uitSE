package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.PromotionDAO;
import org.example.dao.api.TagDAO;
import org.example.filter.LaptopFilter;
import org.example.model.*;
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
import java.util.List;
import java.util.Optional;

public class LaptopServiceImpl implements LaptopService {

    private LaptopDAO laptopDAO;
    private PromotionDAO promotionDAO;
    private TagDAO tagDAO;
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
    public Response createLaptop(MultipartBody body) {
        try {
            Laptop laptop = buildLaptopFromRequestBody(body);
            laptopDAO.save(laptop);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @Path("/{id}")
    @PUT
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response updateLaptop(@PathParam("id") Integer id, MultipartBody body) {
        try {
            Laptop laptop = buildLaptopFromRequestBody(body);
            laptop.setId(id);
            laptopDAO.save(laptop);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Laptop buildLaptopFromRequestBody(MultipartBody body) throws IOException, BadRequestException {
        RAM ram = buildRAMFromRequestBody(body);
        CPU cpu = buildCPUFromRequestBody(body);
        HardDrive hardDrive = buildHardDriveFromRequestBody(body);
        Monitor monitor = buildMonitorFromRequestBody(body);

        BrandType brand = body.getAttachmentObject("brand", BrandType.class);
        Integer quantity = body.getAttachmentObject("quantity", Integer.class);

        Long unitPrice = body.getAttachmentObject("unit-price", Long.class);
        Long discountPrice = body.getAttachmentObject("discount-price", Long.class);

        Float thickness = body.getAttachmentObject("thickness", Float.class);
        Float weight = body.getAttachmentObject("weight", Float.class);

        String design = body.getAttachmentObject("design", String.class);
        String graphicsCard = body.getAttachmentObject("graphics-card", String.class);
        String name = body.getAttachmentObject("name", String.class);
        String os = body.getAttachmentObject("os", String.class);
        String ports = body.getAttachmentObject("ports", String.class);

        ObjectMapper om = new ObjectMapper();
        Integer[] promotionIds = om.readValue(body.getAttachmentObject("promotions", String.class), Integer[].class);
        Integer[] tagIds = om.readValue(body.getAttachmentObject("tags", String.class), Integer[].class);

        List<Promotion> promotions = promotionDAO.findByIds(Arrays.asList(promotionIds));
        List<Tag> tags = tagDAO.findByIds(Arrays.asList(tagIds));

        String alt = imageUtils.buildSEOImageName(name);
        InputStream is = body.getAttachmentObject("image", InputStream.class);
        byte[] imageBlob = null, thumbnailBlob = null;
        BufferedImage image = ImageIO.read(is);
        if (image != null) {
            imageBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_IMAGE);
            thumbnailBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_THUMBNAIL);
        }

        return Laptop.builder().alt(alt)
                .brand(brand).cpu(cpu).design(design).discountPrice(discountPrice)
                .graphisCard(graphicsCard).hardDrive(hardDrive).image(imageBlob)
                .monitor(monitor).name(name).os(os).ports(ports).quantity(quantity)
                .ram(ram).recordStatus(true).thickness(thickness)
                .thumbnail(thumbnailBlob).unitPrice(unitPrice).weight(weight)
                .tags(tags).promotions(promotions).build();
    }

    private RAM buildRAMFromRequestBody(MultipartBody body) {
        Integer id = body.getAttachmentObject("ram-id", Integer.class);
        Integer size = body.getAttachmentObject("ram-size", Integer.class);
        RAMType type = body.getAttachmentObject("ram-type", RAMType.class);
        Integer bus = body.getAttachmentObject("ram-bus", Integer.class);
        Integer extraSlot = body.getAttachmentObject("ram-extra-slot", Integer.class);
        return RAM.builder().id(id == -1 ? null : id).size(size).type(type).bus(bus).extraSlot(extraSlot).build();
    }

    private CPU buildCPUFromRequestBody(MultipartBody body) {
        Integer id = body.getAttachmentObject("cpu-id", Integer.class);
        CPUType type = body.getAttachmentObject("cpu-type", CPUType.class);
        String detail = body.getAttachmentObject("cpu-detail", String.class);
        Float speed = body.getAttachmentObject("cpu-speed", Float.class);
        Float maxSpeed = body.getAttachmentObject("cpu-max-speed", Float.class);
        return CPU.builder().id(id == -1 ? null : id).type(type).detail(detail).speed(speed).maxSpeed(maxSpeed).build();
    }

    private HardDrive buildHardDriveFromRequestBody(MultipartBody body) {
        Integer id = body.getAttachmentObject("hd-id", Integer.class);
        HardDriveType type = body.getAttachmentObject("hd-type", HardDriveType.class);
        Integer size = body.getAttachmentObject("hd-size", Integer.class);
        String detail = body.getAttachmentObject("hd-detail", String.class);
        return HardDrive.builder().id(id == -1 ? null : id).type(type).size(size).detail(detail).build();
    }

    private Monitor buildMonitorFromRequestBody(MultipartBody body) {
        Integer id = body.getAttachmentObject("monitor-id", Integer.class);
        Float size = body.getAttachmentObject("monitor-size", Float.class);
        ResolutionType type = body.getAttachmentObject("resolution-type", ResolutionType.class);
        Integer resolutionWidth = body.getAttachmentObject("resolution-width", Integer.class);
        Integer resolutionHeight = body.getAttachmentObject("resolution-height", Integer.class);
        return Monitor.builder().id(id == -1 ? null : id).size(size)
                .resolutionType(type).resolutionWidth(resolutionWidth)
                .resolutionHeight(resolutionHeight).build();
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
}