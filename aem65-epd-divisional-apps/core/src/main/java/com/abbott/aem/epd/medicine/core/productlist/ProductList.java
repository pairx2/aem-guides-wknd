package com.abbott.aem.epd.medicine.core.productlist;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ProductList {

    String getProductListJsonString();
    
    String getDefaultHeading();
    String getShowAllResults();
    
	void setDefaultHeading(String defaultHeading);
	void setShowAllResults(String showAllResults);
	
	
	String getNumberOfResults() ;


String getShowMore();
String getBackToTop();
String getNoProducts() ;
String getProductsDataRootPath();
void setNumberOfResults(String numberOfResults);
void setShowMore(String showMore);
void setBackToTop(String backToTop);
void setNoProducts(String noProducts);
void setProductsDataRootPath(String productsDataRootPath);
    

}
