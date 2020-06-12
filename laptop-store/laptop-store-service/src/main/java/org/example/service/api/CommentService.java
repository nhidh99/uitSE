package org.example.service.api;

import org.example.input.CommentInput;
import org.example.input.ReplyInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface CommentService {
    Response createComment(Integer productId, CommentInput commentInput, SecurityContext securityContext);

    Response findByProductId(Integer productId);

    Response createReply(Integer commentId, ReplyInput replyInput, SecurityContext securityContext);

}
