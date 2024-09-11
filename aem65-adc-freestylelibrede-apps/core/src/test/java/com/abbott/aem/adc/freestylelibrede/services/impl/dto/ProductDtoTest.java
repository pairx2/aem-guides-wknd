package com.abbott.aem.adc.freestylelibrede.services.impl.dto;

import java.io.IOException;
import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import com.abbott.aem.adc.freestylelibrede.dto.ProductDto;
import com.abbott.aem.adc.freestylelibrede.dto.VideoList;

import junitx.framework.Assert;

public class ProductDtoTest {

	@InjectMocks
	ProductDto productDto;

	@BeforeEach
	void setup() throws IOException {
		productDto = new ProductDto();
		productDto.setProductDescription("productDescription");
		productDto.setCommonImage("commonImage");
		String[] productImage = {"ProductImage"};
		String[] productSku = {"productSku"};
		productDto.setProductImage(productImage);
		productDto.setProductSku(productSku);
		productDto.setProductUrl("productUrl");
		productDto.setQuantityOrder("quantityOrder");
		productDto.setVideoList(new ArrayList<VideoList>());
		productDto.setProductBadgev2("product badge");
		productDto.setProductHeadlinev2("product headline");
		productDto.setProductDescriptionv2("product description");
		productDto.setSelectionSublinev2("selection subline");
		productDto.setVariantHeadlinev2("variant headline");
		productDto.setVariantDescriptionv2("variant description");
		productDto.setVariantBadgev2("variant badge");
		productDto.setVariantPriceSublinev2("variant subline v2");
		productDto.setVariantPriceDescriptionv2("variant price description");
		productDto.setVariantButtonLabelv2("variant button label");
		productDto.setVariantButtonUrlv2("variant button util");

	}

	@Test
	void testProductDescription() {
		Assert.assertEquals("productDescription", productDto.getProductDescription());	
	}
	@Test
	void testCommonImage() {
		Assert.assertEquals("commonImage", productDto.getCommonImage());
	}
	@Test
	void testProductImage() {		
		Assert.assertFalse(productDto.getProductImage() == null);
	}
	@Test
	void testProductSku() {
		Assert.assertFalse(productDto.getProductSku() == null);
	}
	@Test
	void testProductUrl() {
		Assert.assertEquals("productUrl", productDto.getProductUrl());		
	}
	@Test
	void testQuantityOrder() {
		Assert.assertEquals("quantityOrder", productDto.getQuantityOrder());	
	}
	@Test
	void testVideoList() {
		Assert.assertFalse(productDto.getVideoList() == null);
	}

	@Test
	void getProductBadgev2() {
		Assert.assertEquals("product badge",productDto.getProductBadgev2());
	}
	@Test
	void getProductHeadlinev2() {
		Assert.assertEquals("product headline",productDto.getProductHeadlinev2());
	}
	@Test
	void getProductDescriptionv2() {
		Assert.assertEquals("product description",productDto.getProductDescriptionv2());
	}
	@Test
	void getSelectionSublinev2() {
		Assert.assertEquals("selection subline",productDto.getSelectionSublinev2());
	}
	@Test
	void getVariantHeadlinev2() {
		Assert.assertEquals("variant headline",productDto.getVariantHeadlinev2());
	}
	@Test
	void getVariantDescriptionv2() {
		Assert.assertEquals("variant description",productDto.getVariantDescriptionv2());
	}
	@Test
	void getVariantBadgev2() {
		Assert.assertEquals("variant badge",productDto.getVariantBadgev2());
	}
	@Test
	void getVariantPriceSublinev2() {
		Assert.assertEquals("variant subline v2",productDto.getVariantPriceSublinev2());
	}
	@Test
	void getVariantPriceDescriptionv2() {
		Assert.assertEquals("variant price description",productDto.getVariantPriceDescriptionv2());
	}
	@Test
	void getVariantButtonLabelv2() {
		Assert.assertEquals("variant button label",productDto.getVariantButtonLabelv2());
	}
	@Test
	void getVariantButtonUrlv2() {
		Assert.assertEquals("variant button util",productDto.getVariantButtonUrlv2());
	}
		
	
}
