package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class ProductPageModelTest extends BaseModelTest<ProductPageModel> {

	private ProductPageModel model;

	@Mock
	ExternalizerService externalizerService;

	@BeforeEach
	void setup() {

		Mockito.lenient().when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("www.freestylelibre.de/page");
		context.registerService(ExternalizerService.class, externalizerService);
		model = loadModel(ProductPageModel.class);

	}

	@Test
	public void getProductUrl(){
		Assert.assertEquals("www.freestylelibre.de/page",model.getProductUrl());
	}
	@Test
	public void getLabel(){
		Assert.assertEquals("Test Label",model.getLabel());
	}
	@Test
	public void getProductDescription() {
		Assertions.assertEquals("Product_Description", model.getProductDescription());
	}
	
	@Test
	public void getQuantityOrder() {
		Assertions.assertEquals("QuantityOrder", model.getQuantityOrder());
	}

	@Test
	public void getCommonImage() {
		Assertions.assertEquals("CommonImage", model.getCommonImage());
	}

	@Test
	public void getProductList() {
		Assertions.assertEquals("FreestyleLibre 2", model.getProductList().get(0).getLabel());
		Assertions.assertEquals("2-71988-01", model.getProductList().get(0).getSku());
		Assertions.assertEquals("Test Heading", model.getProductList().get(0).getVariantHeading());
		Assertions.assertEquals("Test Description", model.getProductList().get(0).getVariantDescription());
		Assertions.assertEquals("Test Description 2", model.getProductList().get(1).getVariantDescription());
		Assertions.assertEquals("Test Heading 2", model.getProductList().get(1).getVariantHeading());
		Assertions.assertEquals("FreestyleLibre 3", model.getProductList().get(1).getLabel());
		Assertions.assertEquals("2-72114-01", model.getProductList().get(1).getSku());

	}

	@Test
	public void validatev2RenidtionFields() {
		Assert.assertEquals("multiproductv2",model.getTemplateType());
		Assert.assertEquals("sensor",model.getLayoutType());
		Assert.assertEquals("product badge",model.getProductBadgev2());
		Assert.assertEquals("product headline",model.getProductHeadlinev2());
		Assert.assertEquals("product description",model.getProductDescriptionv2());
		Assert.assertEquals("selection subline",model.getSelectionSublinev2());
		Assert.assertEquals("variant headline",model.getProductList().get(0).getVariantHeadlinev2());
		Assert.assertEquals("variant description",model.getProductList().get(0).getVariantDescriptionv2());
		Assert.assertEquals("variant badge",model.getProductList().get(0).getVariantBadgev2());
		Assert.assertEquals("variant subline v2",model.getProductList().get(0).getVariantPriceSublinev2());
		Assert.assertEquals("variant price description",model.getProductList().get(0).getVariantPriceDescriptionv2());
		Assert.assertEquals("variant button label",model.getProductList().get(0).getVariantButtonLabelv2());
		Assert.assertEquals("variant button util",model.getProductList().get(0).getVariantButtonUrlv2());
	}
}
