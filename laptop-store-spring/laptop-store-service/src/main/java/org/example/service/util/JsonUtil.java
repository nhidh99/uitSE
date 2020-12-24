package org.example.service.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;

public class JsonUtil {
    private static final ObjectMapper om = new ObjectMapper();

    public static <T> T parse(String json) {
        try {
            return om.readValue(json, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    public static String stringify(Object object) {
        try {
            return om.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException(ErrorMessageConstants.SERVER_ERROR);
        }
    }
}
