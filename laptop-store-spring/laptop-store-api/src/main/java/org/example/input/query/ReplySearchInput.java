package org.example.input.query;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.example.type.FeedbackStatus;
import org.example.type.ReplyType;

@Getter
@Setter
@SuperBuilder
public class ReplySearchInput extends SearchInput {
    private FeedbackStatus status;
    private ReplyType type;
}
