package com.abbott.aem.adc.freestylelibrede.models;

import static org.mockito.ArgumentMatchers.eq;

import java.lang.reflect.Field;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.spi.Injector;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.ProductPageService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ MockitoExtension.class, AemContextExtension.class })
public class StickyAddToCartCTAModelTest extends BaseModelTest<StickyAddToCartCTAModel> {

	@Mock
	ProductPageService productPageService;
	private final AemContext context = new AemContext();
	@InjectMocks
	StickyAddToCartCTAModel model;
	@Mock
	ExternalizerService externalizerService;
	@Mock
	Resource currentResource;
	@InjectMocks
	private ExternalizeInjector injector = new ExternalizeInjector();
	@InjectMocks
	private ProductPageModel productPageModel;

	@BeforeEach
	void setup() {

		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void getAddToCart() {

		String addToCart = "Add to Cart";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("addToCart");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, addToCart);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in getAddToCart" + e.getMessage());
		}
		Assert.assertEquals("Add to Cart",model.getAddToCart());
	}
	
	@Test
	public void getSubsOrder() {
		
		String subsOrder = "Sub Order";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("subsOrder");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, subsOrder);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in getSubsOrder" + e.getMessage());
		}
		Assert.assertEquals("Sub Order",model.getSubsOrder());
		
	}


	@Test
	public void getPrescriptionOrderPageUrl() {

		String prescriptionOrderPageUrl = "https://account-overview.com";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("prescriptionOrderPageUrl");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, prescriptionOrderPageUrl);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in getPrescriptionOrderPageUrl" + e.getMessage());
		}
		Assert.assertEquals("https://account-overview.com",model.getPrescriptionOrderPageUrl());

	}

	@Test
	public void getLoginPageUrl() {

		String loginPageUrl = "https://login.adc.com";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("loginPageUrl");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, loginPageUrl);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in getLoginPageUrl" + e.getMessage());
		}
		Assert.assertEquals("https://login.adc.com",model.getLoginPageUrl());

	}
	
	@Test
	public void getProductPageModel() {		
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("productPageModel");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, productPageModel);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in productPageModel" + e.getMessage());
		}
						
	    Assert.assertNotNull(model.getProductPageModel());
        
    }	
	
}
