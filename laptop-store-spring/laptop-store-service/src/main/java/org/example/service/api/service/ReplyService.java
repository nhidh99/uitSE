package org.example.service.api.service;

import org.example.dto.reply.ReplyDTO;
import org.example.input.query.ReplySearchInput;
import org.example.util.Pair;

import java.util.List;

public interface ReplyService {
    Pair<List<ReplyDTO>, Long> findAndCountRepliesBySearch(ReplySearchInput search);
}
