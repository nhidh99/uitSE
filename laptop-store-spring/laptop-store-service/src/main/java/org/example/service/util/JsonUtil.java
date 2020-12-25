package org.example.service.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.constant.ErrorMessageConstants;

import java.util.Map;
import java.util.Set;

public class JsonUtil {
    private static final ObjectMapper om = new ObjectMapper();

    public static Map<Integer, Integer> parseCart(String cartJSON) {
        try {
            return om.readValue(cartJSON, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException(ErrorMessageConstants.SERVER_ERROR);
        }
    }

    public static Set<Integer> parseWishList(String wishListJSON) {
        try {
            return om.readValue(wishListJSON, new TypeReference<>() {});
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
