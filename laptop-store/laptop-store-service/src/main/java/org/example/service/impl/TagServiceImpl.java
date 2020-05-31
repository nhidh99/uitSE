package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.TagDAO;
import org.example.model.Tag;
import org.example.service.api.TagService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/tags")
public class TagServiceImpl implements TagService {

    private TagDAO tagDAO;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllTags() {
        try {
            List<Tag> tags = tagDAO.findAll();
            return Response.ok(tags).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}