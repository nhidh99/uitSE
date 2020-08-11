package org.example.component.converter;

import org.example.type.RewardType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class RewardTypeConverter implements Converter<String, RewardType> {
    @Override
    public RewardType convert(String s) {
        return RewardType.valueOf(s);
    }
}
