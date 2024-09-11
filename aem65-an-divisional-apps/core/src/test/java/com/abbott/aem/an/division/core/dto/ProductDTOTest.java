package com.abbott.aem.an.division.core.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;

import jdk.internal.joptsimple.internal.Strings;

class ProductDTOTest {

	ProductDTO product = new ProductDTO();

	@Test
	void testLearnMore() {
		product.setLearnMore("Learn More");
        assertEquals("Learn More",product.getLearnMore());
	}
	
	@Test
	void testProductImageList() {
		List<String> list = Collections.emptyList();
		product.setProductImageList(list);
		assertEquals(Collections.EMPTY_LIST,product.getProductImageList());
	}
	
	@Test
	void testFormulationTypeandflavor() {
		List<String> list = Collections.emptyList();
		product.setFormulationTypeandflavor(list);
		assertEquals(Collections.EMPTY_LIST,product.getFormulationTypeandflavor());
	}
	
	@Test
	void testApprovalDate() throws ParseException {
		String dateString = "12-11-2022";
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		Date date = formatter.parse(dateString);
		product.setApprovalDate(date);
		assertEquals(date, product.getApprovalDate());
		
	}
	
	@Test
	void testProductRefrenceValue() {
		List<String> list = Collections.emptyList();
		product.setProductRefrenceValue(list);
		assertEquals(Collections.EMPTY_LIST,product.getProductRefrenceValue());
	}
	
	@Test
	void testLastmodifiedTime() {
		product.setLastmodifiedTime("Dec-11-2022:1:38");
		assertEquals("Dec-11-2022:1:38", product.getLastmodifiedTime());
		
	}
	
	@Test
	void testFormulationType() {
		List<String> list = Collections.emptyList();
		product.setFormulationType(list);
		assertEquals(Collections.EMPTY_LIST,product.getFormulationType());
	}
	
	@Test
	void testFlavour() {
		List<String> list = Collections.emptyList();
		product.setFlavor(list);
		assertEquals(Collections.EMPTY_LIST,product.getFlavor());
	}
	
	@Test
	void testProductPageName() {
		product.setProductPageName("ANDOTCOM");
		assertEquals("ANDOTCOM", product.getProductPageName());
		
	}
	
	@Test
	void testProductPageTitle() {
		product.setProductPageTitle("Home");
		assertEquals("Home", product.getProductPageTitle());
		
	}
	
	@Test
	void testProductID() {
		product.setProductID("Product ID");
		assertEquals("Product ID", product.getProductID());
		
	}
	
	@Test
	void testProductDetails () {
		product.equals(null);
		product.setProductPageTitle("Home");
		product.equals("");
		product.equals(product);
    	
		
    	assertEquals("Home",product.getProductPageTitle());
    	product.hashCode();
    	product.compareTo(product);
    	
    	product.setProductPageTitle(null);
    	product.hashCode();
	}
	
	@Test
	void testBusinessUnit() {
		product.setBusinessUnit("AN Division");
		assertEquals("AN Division", product.getBusinessUnit());
		
	}
	
	@Test
	void testCommonName() {
		product.setCommonName("Common");
		assertEquals("Common", product.getCommonName());
		
	}
	
	@Test
	void testDescription() {
		product.setDescription("product is good");
		assertEquals("product is good", product.getDescription());
		
	}
	
	@Test
	void testProductBrand() {
		product.setProductBrands("Similac");
		assertEquals("Similac", product.getProductBrands());
	}	
	
	@Test
	void testSkuContainer() {
		List<String> list = Collections.emptyList();
		product.setFlavor(list);
		assertEquals(Collections.EMPTY_LIST,product.getFlavor());
	}
	
	@Test
	void testSkuServingSizeId() {
		List<String> list = Collections.emptyList();
		product.setSkuServingSizeId(list);
		assertEquals(Collections.EMPTY_LIST,product.getSkuServingSizeId());
	}
	
	@Test
	void testFormulationCode() {
		List<String> list = Collections.emptyList();
		product.setFormulationCode(list);
		assertEquals(Collections.EMPTY_LIST,product.getFormulationCode());
	}
	
	@Test
	void testProductDefaultformualtionCode() {
		product.setProductDefaultformualtionCode("AX1");
		assertEquals("AX1", product.getProductDefaultformualtionCode());
	}
	
	@Test
	void testProductPatientAge() {
		product.setProductPatientAge("15");
		assertEquals("15", product.getProductPatientAge());
	}
	
	@Test
	void testProductDietaryRestriction() {
		product.setProductDietaryRestriction("N/A");
		assertEquals("N/A", product.getProductDietaryRestriction());
	}
	
	@Test
	void testProductFormFactor() {
		product.setProductFormFactor("N/A");
		assertEquals("N/A", product.getProductFormFactor());
	}
	
	@Test
	void testProductIngestionMethod() {
		product.setProductIngestionMethod("N/A");
		assertEquals("N/A", product.getProductIngestionMethod());
	}
	
	@Test
	void testProductMetabolics() {
		product.setProductMetabolics("N/A");
		assertEquals("N/A", product.getProductMetabolics());
	}
	
	@Test
	void testListNumber() {
		product.setListNumber("N/A");
		assertEquals("N/A", product.getListNumber());
	}
	
	@Test
	void testSkuServingSize() {
		List<String> list = Collections.emptyList();
		product.setSkuServingSize(list);
		assertEquals(Collections.EMPTY_LIST,product.getSkuServingSize());
	}
	
	@Test
	void testSkuContainerSize() {
		List<String> list = Collections.emptyList();
		product.setSkuContainerSize(list);
		assertEquals(Collections.EMPTY_LIST,product.getSkuContainerSize());
	}
	
	@Test
	void testActiveProduct() {
		product.setActiveProduct(false);
		assertEquals(false,product.isActiveProduct());
	}
	
	@Test
	void testCommonImage() {
		product.setCommonImage("N/A");
		assertEquals("nullN/A", product.getCommonImage());
	}
	
	@Test
	void testProductSku() {
		String [] productsku = new String[] {"test1", "test2"};
		product.setProductSku(productsku);
		String [] slu = product.getProductSku();
	    
	    product.setProductSku(null);
	}
	
	@Test
	void testProductImage() {
		String [] productsku = new String[] {"test1", "test2"};
		product.setProductImage(productsku);
		String [] slu = product.getProductImage();
	    
	    product.setProductImage(null);
	}
}