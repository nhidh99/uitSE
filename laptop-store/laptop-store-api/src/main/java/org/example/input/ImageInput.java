package org.example.input;

import lombok.Data;

import javax.ws.rs.PathParam;

@Data
public class ImageInput {
    @PathParam("id")
    private Integer id;

    @PathParam("alt")
    private String alt;

    @PathParam("resolution")
    private Integer resolution;
}
