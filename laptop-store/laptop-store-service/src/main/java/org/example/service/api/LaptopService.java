package org.example.service.api;


import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.filter.LaptopFilter;
import org.example.filter.LaptopSearchFilter;
import org.example.input.LaptopInput;

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

    Response findLaptopsByFilter(String queryParam, Integer page);

    Response createLaptop(LaptopInput laptopInput, Attachment attachment);

    Response updateLaptop(Integer id, LaptopInput laptopInput, Attachment attachment);

    Response updateLaptopDetailImages(Integer id, Integer[] deleteIds, List<Attachment> attachments);

    Response deleteLaptop(Integer id);

    Response findPromotionsById(Integer id);

    Response findTagsById(Integer id);

    Response findDetailImageIdsById(Integer id);

    Response searchLaptop(LaptopSearchFilter laptopSearchFilter);
}