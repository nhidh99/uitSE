package org.example.dto.question;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.dto.reply.CommonReplyDTO;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO implements Serializable {

    private static final long serialVersionUID = 5077337210269910354L;

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("question")
    private String question;

    @JsonProperty("author_name")
    private String authorName;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime createdAt;

    @JsonProperty("answer")
    private CommonReplyDTO answerDTO;

    @JsonProperty("reply_count")
    private Long replyCount;
}