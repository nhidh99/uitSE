package org.example.util;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import java.util.List;
import java.util.stream.Collectors;

public class ModelMapperUtil {
    private static final ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    }

    public static <T, D> D map(T entity, Class<D> outClass) {
        return modelMapper.map(entity, outClass);
    }

    public static <T, D> void map(T src, D des) {
        modelMapper.map(src, des);
    }

    public static <D, T> List<D> mapList(List<T> list, Class<D> outClass) {
        return list.stream().map(e -> modelMapper.map(e, outClass)).collect(Collectors.toList());
    }
}