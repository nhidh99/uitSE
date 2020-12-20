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

    public static <T, D> D map(T src, D des) {
        modelMapper.map(src, des);
        return des;
    }

    public static <D, T> List<D> mapList(List<T> list, Class<D> outClass) {
        return list.stream().map(e -> modelMapper.map(e, outClass)).collect(Collectors.toList());
    }

    public static <D, T> Pair<List<D>, Long> mapFirstOfPair(Pair<List<T>, Long> pair, Class<D> outClass) {
        List<D> list = mapList(pair.getFirst(), outClass);
        long count = pair.getSecond();
        return Pair.of(list, count);
    }
}