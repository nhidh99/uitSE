package org.example.service.impl;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.dao.api.*;
import org.example.input.CommentInput;
import org.example.input.ReplyInput;
import org.example.model.*;
import org.example.security.Secured;
import org.example.service.api.CommentService;
import org.example.type.RoleType;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

public class CommentServiceImpl implements CommentService {
    private CommentDAO commentDAO;
    private UserDAO userDAO;
    private LaptopDAO laptopDAO;
    private CommentReplyDAO commentReplyDAO;

    @Override
    @POST
    @Path("/")
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response createComment(@QueryParam("product-id") Integer productId, CommentInput commentInput,
                                 @Context SecurityContext securityContext) {
        try {
            Comment comment = buildCommentFromRequestBody(productId, commentInput, securityContext);
            commentDAO.save(comment);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private Comment buildCommentFromRequestBody(Integer productId, CommentInput commentInput, SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        Laptop laptop = laptopDAO.findById(productId).orElseThrow(BadRequestException::new);
        String question = commentInput.getQuestion();
        return Comment.builder().laptop(laptop).user(user)
                .question(question)
                .commentDate(LocalDate.now()).build();
    }

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findByProductId(@QueryParam("product-id") Integer productId) {
        try {
            List<Comment> comments;
            Long commentCount;
            if(productId != null) {
                comments = commentDAO.findByProductId(productId);
                commentCount = commentDAO.findTotalCommentByProductId(productId);
            } else {
                comments = commentDAO.findAll();
                commentCount = commentDAO.findTotalCommentByFilter(null, null);
            }
            return Response.ok(comments).header("X-Total-Count", commentCount).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findCommentsByFilter(@QueryParam("id") String id, @QueryParam("status") String status ,@QueryParam("page") Integer page) {
        try {
            List<Comment> comments = commentDAO.findByFilter(id, status, page);
            Long commentCount = commentDAO.findTotalCommentByFilter(id, status);
            return Response.ok(comments).header("X-Total-Count", commentCount).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @Override
    @DELETE
    @Path("/{id}")
    @Secured({RoleType.ADMIN})
    public Response deleteCommentById(@PathParam("id") Integer id, @Context SecurityContext securityContext) {
        try {
            commentDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}")
    @Secured({RoleType.ADMIN})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response approveCommentById(@PathParam("id") Integer id,
                                       ReplyInput replyInput,
                                       @Context SecurityContext securityContext) {
        try {
            CommentReply commentReply = null;
            if(!replyInput.getReply().isEmpty()) {
                commentReply = buildReplyFromRequestBody(id, replyInput, securityContext);
            }
            commentDAO.approve(id, commentReply);
            return Response.ok().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/{id}/replies")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createReply(@PathParam("id") Integer commentId,
                                ReplyInput replyInput,
                                @Context SecurityContext securityContext) {
        try {
            CommentReply commentReply = buildReplyFromRequestBody(commentId, replyInput, securityContext);
            commentReplyDAO.save(commentReply);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private CommentReply buildReplyFromRequestBody(Integer commentId,
                                                  ReplyInput replyInput,
                                                  SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        Comment comment = commentDAO.findById(commentId).orElseThrow(BadRequestException::new);
        String reply = replyInput.getReply();
        return CommentReply.builder().user(user).comment(comment).reply(reply).replyDate(LocalDate.now()).build();
    }


}
