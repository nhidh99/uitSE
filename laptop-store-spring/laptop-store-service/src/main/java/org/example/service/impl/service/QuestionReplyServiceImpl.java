//package org.example.service.impl.service;
//
//import org.example.dao.ReplyRepository;
//import org.example.dto.reply.ReplyDTO;
//import org.example.input.query.ReplySearchInput;
//import org.example.model.Order;
//import org.example.service.api.service.ReplyService;
//import org.example.service.util.PageableUtil;
//import org.example.type.FeedbackStatus;
//import org.example.util.ModelMapperUtil;
//import org.example.util.Pair;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.springframework.transaction.support.TransactionTemplate;
//
//import java.util.List;
//
//@Service
//public class QuestionReplyServiceImpl implements ReplyService {
//    private final ReplyRepository replyRepository;
//    private final TransactionTemplate txTemplate;
//
//    @Autowired
//    public QuestionReplyServiceImpl(ReplyRepository replyRepository, PlatformTransactionManager txManager) {
//        this.replyRepository = replyRepository;
//        this.txTemplate = new TransactionTemplate(txManager);
//    }
//
//    @Override
////    public Pair<List<ReplyDTO>, Long> findAndCountRepliesBySearch(ReplySearchInput search) {
////        Pageable pageable = PageableUtil.createPageableFromSearch(search);
////        boolean isEmptyQuery = search.getQuery().isEmpty();
////        return txTemplate.execute((txStatus) -> {
////            Pair<List<Order>, Long> repliesAndCount = isEmptyQuery
////                    ? findAndCountRepliesBySearchWithoutQueryParam(search, pageable)
////                    : findAndCountRepliesBySearchWithQueryParam(search, pageable);
////            return ModelMapperUtil.mapFirstOfPair(repliesAndCount, ReplyDTO.class);
////        });
////    }
//
//    // TODO: update
////    private Pair<List<Order>, Long> findAndCountRepliesBySearchWithQueryParam(
////            ReplySearchInput search, Pageable pageable) {
////        String query = search.getQuery();
////        FeedbackStatus status = search.getStatus();
////        List<Order> replies = replyRepository.findByQueryAndStatus(query, status, pageable);
////        long count = replyRepository.countByQueryAndStatus(query, status);
////        return Pair.of(replies, count);
////    }
//
//    // TODO: update
////    private Pair<List<Order>, Long> findAndCountRepliesBySearchWithoutQueryParam(
////            ReplySearchInput search, Pageable pageable) {
////        FeedbackStatus status = search.getStatus();
////        List<Order> replies = replyRepository.findByStatus(status, pageable);
////        long count = replyRepository.countByStatus(status);
////        return Pair.of(replies, count);
////    }
//}
