package com.abbott.aem.epd.medicine.core.productlist.impl;

import java.text.MessageFormat;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;

import com.abbott.aem.epd.medicine.core.productlist.ProductListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = ProductListService.class)
public class ProductListServiceImpl implements ProductListService {

    private static final String SQL2_REQUEST = "select * from [dam:Asset]"
            + " where isdescendantnode(''{0}'')"
            + " and [jcr:content/contentFragment]=true"
            + " and [jcr:content/data/cq:model]=''/conf/epd/globals/settings/dam/cfm/models/medicine-product-data''"
            + " order by name()";

    @Override
    public List<MedicineProductData> lookupMedicineProductData(ResourceResolver resourceResolver, String path) {
        List<MedicineProductData> productData = new LinkedList<>();
        Iterator<Resource> result = resourceResolver.findResources(MessageFormat.format(SQL2_REQUEST, path),
                "JCR-SQL2");
        while (result.hasNext()) {
            Resource next = result.next();
            MedicineProductData candidate = next.adaptTo(MedicineProductData.class);
            if (candidate == null) {
                log.warn("Could not adapt resource at {} to MedicineProductData", next.getPath());
            } else {
                productData.add(candidate);
            }
        }
        return productData;
    }

}
