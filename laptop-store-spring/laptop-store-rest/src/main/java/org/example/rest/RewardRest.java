package org.example.rest;

import org.example.model.Reward;
import org.example.service.api.RewardService;
import org.example.type.RewardType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rewards")
public class RewardRest {

    @Autowired
    private RewardService rewardService;

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findById(@PathVariable("id") RewardType id) {
        Reward reward = rewardService.findById(id);
        return ResponseEntity.ok(reward);
    }
}