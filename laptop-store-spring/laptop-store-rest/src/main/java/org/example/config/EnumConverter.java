package org.example.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.stereotype.Component;

@Component
public class EnumConverter implements ConverterFactory<String, Enum> {
    @Override
    public <T extends Enum> Converter<String, T> getConverter(Class<T> targetType) {
        return new StringToEnum(getEnumType(targetType));
    }

    private class StringToEnum<T extends Enum> implements Converter<String, T> {

        private final Class<T> enumType;

        public StringToEnum(Class<T> enumType) {
            this.enumType = enumType;
        }

        @Override
        public T convert(String source) {
            if (source.isEmpty()) {
                return null;
            }
            return (T) Enum.valueOf(this.enumType, source.trim().toUpperCase());
        }
    }

    private static Class<?> getEnumType(Class targetType) {
        Class<?> enumType = targetType;
        while (enumType != null && !enumType.isEnum()) {
            enumType = enumType.getSuperclass();
        }
        if (enumType == null) {
            throw new IllegalArgumentException(
                    "The target type " + targetType.getName() + " does not refer to an enum");
        }
        return enumType;
    }
}
