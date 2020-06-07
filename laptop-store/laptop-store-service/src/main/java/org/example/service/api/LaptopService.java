package org.example.service.api;


import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.filter.LaptopFilter;

import javax.ws.rs.core.Response;

public interface LaptopService {
    Response findLaptops(LaptopFilter laptopFilter);

    Response findLaptopById(Integer id);

    Response findLaptopsBySelling(Integer page);

    Response findLaptopsByCreatedDateDesc(Integer page);

    Response findLaptopsByDiscountDesc(Integer page);

    Response findLaptopsByPriceAsc(Integer page);

    Response createLaptop(MultipartBody body);

    Response updateLaptop(Integer id, MultipartBody body);

    Response deleteLaptop(Integer id);

    Response findPromotionsById(Integer id);

    Response findTagsById(Integer id);
}