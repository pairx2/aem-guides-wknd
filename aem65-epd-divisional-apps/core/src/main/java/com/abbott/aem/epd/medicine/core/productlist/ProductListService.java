package com.abbott.aem.epd.medicine.core.productlist;

import java.util.List;

import org.apache.sling.api.resource.ResourceResolver;

import com.abbott.aem.epd.medicine.core.productlist.impl.MedicineProductData;

public interface ProductListService {

    List<MedicineProductData> lookupMedicineProductData(ResourceResolver resourceResolver, String path);




}
