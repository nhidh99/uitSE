package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"org.example.*"})
@EntityScan(basePackages = {"org.example.*"})
@EnableJpaRepositories(basePackages = {"org.example.*"})
@EnableCaching
public class LaptopStoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(LaptopStoreApplication.class);
    }
}
