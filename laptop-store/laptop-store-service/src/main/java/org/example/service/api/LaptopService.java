package org.example.service.api;


import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.filter.LaptopFilter;

import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.List;

public interface LaptopService {
    Response findLaptops(LaptopFilter laptopFilter);

    Response findLaptopById(Integer id);

    Response findLaptopsBySelling(Integer page);

    Response findLaptopsByCreatedDateDesc(Integer page);

    Response findLaptopsByDiscountDesc(Integer page);

    Response findLaptopsByPriceAsc(Integer page);

    Response findLaptopSuggestions(Integer laptopId);

    Response createLaptop(MultipartBody body);

    Response updateLaptop(Integer id, MultipartBody body);

    Response updateLaptopDetailImages(Integer id, Integer[] deleteIds, List<Attachment> attachments);

    Response deleteLaptop(Integer id);

    Response findPromotionsById(Integer id);

    Response findTagsById(Integer id);

    Response findDetailImageIdsById(Integer id);
}