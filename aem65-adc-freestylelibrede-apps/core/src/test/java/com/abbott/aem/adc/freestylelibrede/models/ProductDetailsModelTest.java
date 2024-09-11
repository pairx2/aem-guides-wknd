package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.any;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.ProductPageService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class ProductDetailsModelTest extends BaseModelTest<ProductDetailsModel> {

	private ProductDetailsModel model;

	@InjectMocks
	ExternalizeInjector externalizeInjector = new ExternalizeInjector();
	@Mock
	ExternalizerService externalizerService;

	@Mock
	private Resource mockResource;

	@Mock
	private ProductPageService mockProductPageService;

	@Mock
	private ProductPageModel productPageModel;

	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {
		Mockito.when(externalizerService.externalizeIfNecessary(any(), any())).thenReturn("www.freestylelibre.de/page");
		context.registerService(Injector.class, externalizeInjector);
		context.registerService(ExternalizerService.class, externalizerService);
		context.registerService(ProductPageService.class, mockProductPageService);
		Mockito.when(mockProductPageService.getProductPageModel(any())).thenReturn(productPageModel);
		Mockito.when(productPageModel.getProductList()).thenReturn(null);
		model = loadModel(ProductDetailsModel.class);

	}

	@Test
	public void getShippingText() {
		Assert.assertEquals("Shipping Text", model.getShippingText());

	}

	@Test
	public void getQuantityOrder() {
		Assert.assertEquals("100", model.getQuantityOrder());

	}

	@Test
	public void getErrorMessage() {
		Assert.assertEquals("Error", model.getErrorMessage());
	}

	@Test
	public void getWizardSelectorUrl() {
		Assert.assertEquals("www.freestylelibre.de/page", model.getWizardSelectorUrl());
	}

	@Test
	public void getLoginPageUrl() {
		Assert.assertEquals("www.freestylelibre.de/page", model.getLoginPageUrl());
	}

}
