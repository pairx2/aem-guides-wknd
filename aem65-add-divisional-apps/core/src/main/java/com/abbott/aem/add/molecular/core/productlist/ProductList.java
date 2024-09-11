package com.abbott.aem.add.molecular.core.productlist;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ProductList {

    String getProductListJsonString();

}
