package org.example.dto.reply;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonReplyDTO implements Serializable {

    private static final long serialVersionUID = 8480786262120162534L;

    @JsonProperty("author_name")
    private String authorName;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime createdAt;

    @JsonProperty("is_admin")
    private boolean isAdminReply;
}