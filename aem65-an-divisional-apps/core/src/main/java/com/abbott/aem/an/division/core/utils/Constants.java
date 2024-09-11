package com.abbott.aem.an.division.core.utils;

import com.day.cq.commons.jcr.JcrConstants;

public final class Constants {

	private Constants() {
	    throw new IllegalStateException("Constants class");
	}
	public static final String APPLICATION_ID = "x-application-id";
	public static final String ORIGIN_SECRET = "x-origin-secret";
	public static final String COUNTRY_CODE = "x-country-code";
	public static final String PREFERRED_LANGUAGE = "x-preferred-language";
	public static final String SECRET_HEADER = "x-secret-header";
	public static final String APPLICATION_ACCESS_KEY = "x-application-access-key";
	public static final String RELOAD_CONFIG = "x-reload-config";
	public static final String CONTENT_TYPE = "Content-Type";
	public static final String PROXYLBABBOTTCORP = "PROXY_LB_ABBOTT_CORP";
	public static final int PROXYPORT = 80;	
	public static final String APIURL = "API_URL";
	public static final String PRODUCTS_ROOT_PARENT_NAME = "products";
	public static final String PRODUCTS_ROOT_PARENT_NAME_TITLE = "Products";
	public static final String SUBSERVICE = "anWriteService";
	public static final String HCP_SUBSERVICE = "hcpWriteService";
	public static final String DETAILEDFLAG = "true";
	public static final String NONDETAILEDFLAG = "false";
	public static final String APPROVALLOOKBACK = "false";
	public static final int PAGENUMBER = 1;
	public static final int MAXPRODUCTCOUNT = 200;
	public static final int PAGESIZE = 10;
	public static final String BRANDFAMILYNAME = "";   
	public static final String JCR_CONTENT_WITH_SLASH = "/" + JcrConstants.JCR_CONTENT;
	public static final String SEARCHRESULT_BUTTON_LABEL= "View Product Details";
	public static final String EMPTY = "";
	public static final String PATH_DELIMITER = "/";	
	public static final String PDP_SEO_TITLE= "pdpMetaTitle";
	public static final String PDP_SEO_DESCRIPTION= "pdpMetaDescription";
	public static final String CATEGORY= "category";
	public static final String ACODE= "aCode";
	public static final String BRAND_FAMILY_NAME= "brandFamilyName";
	public static final String CONTENT= "content";
	public static final String DISCONTINUED= "discontinued";
	public static final String IMAGE= "image";
	public static final String VALUE= "value";
	public static final String PRODUCTID= "productId";	
	public static final String OGTITLE= "ogTitle";	
	public static final String LISTNUMBER= "listNumber";	
	public static final String FLAVOR= "flavor";	
	public static final String REGSYMBOL= "&reg;";	
	public static final String TRADESYMBOL= "&trade;";	
	public static final String BRANDS= "Brands";	
	public static final String METABOLICS= "Metabolics";	
	public static final String INGESTION_METHOD= "Ingestion Method";
	public static final String FORM_FACTOR= "Form Factor";
	public static final String DIETTARY_RESTRICTIONS= "Dietary Restrictions";
	public static final String PATIENT_AGE= "Patient Age";
	public static final String LINE_NUMBER= "lineNumber";
	public static final String SYMBOL= "symbol";
	public static final String COMMONNAME= "commonName";
	public static final String RESPONSE= "response";
	public static final String FORMULATION_TYPE= "formulationType";
	public static final String FALSE= "false";
	public static final String AUTHOR= "authoring";	

}
