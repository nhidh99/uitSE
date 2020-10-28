package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"org.example.*"})
@EntityScan(basePackages = {"org.example.*"})
@EnableJpaRepositories(basePackages = {"org.example.*"})
public class LaptopStoreApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(LaptopStoreApplication.class);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(LaptopStoreApplication.class);
    }
}
