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
            List<Comment> comments = commentDAO.findByProductId(productId);
            return Response.ok(comments).build();
        } catch (Exception ex) {
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
