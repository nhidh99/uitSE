package org.example.service.api;

import org.example.input.CommentInput;
import org.example.input.ReplyInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface CommentService {
    Response createComment(Integer productId, CommentInput commentInput, SecurityContext securityContext);

    Response findByProductId(Integer productId);

    Response deleteCommentById(Integer commentId, SecurityContext securityContext);

    Response approveCommentById(Integer commentId, ReplyInput replyInput, SecurityContext securityContext);

    Response findCommentsByFilter(String id, String status, Integer page);

    Response createReply(Integer commentId, ReplyInput replyInput, SecurityContext securityContext);

}
