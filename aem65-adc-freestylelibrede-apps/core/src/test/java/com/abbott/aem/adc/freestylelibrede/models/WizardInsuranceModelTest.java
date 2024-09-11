package com.abbott.aem.adc.freestylelibrede.models;

import java.lang.reflect.Field;

import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.injector.ExternalizeInjector;
import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.abbott.aem.adc.freestylelibrede.services.SickFundService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ MockitoExtension.class, AemContextExtension.class })
public class WizardInsuranceModelTest extends BaseModelTest<WizardInsuranceModel> {

	@Mock
	SickFundService sickFundService;
	private final AemContext context = new AemContext();
	@InjectMocks
	WizardInsuranceModel model;
	@Mock
	ExternalizerService externalizerService;
	@Mock
	Resource currentResource;
	@InjectMocks
	private ExternalizeInjector injector = new ExternalizeInjector();
	
	@BeforeEach
	void setup() {

		MockitoAnnotations.initMocks(this);
		try {
			String pdfRootPath ="pdfRootPath";
			Field canonicalUrlField = model.getClass().getDeclaredField("pdfRootPath");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, pdfRootPath);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in heading" + e.getMessage());
		}
		
		model.init();
	}

	@Test
	public void getHeading() {

		String heading = "heading";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("heading");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, heading);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in heading" + e.getMessage());
		}
		Assert.assertEquals("heading",model.getHeading());
	}
	
	@Test
	public void getInfoIcon() {

		String infoIcon = "infoIcon";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("infoIcon");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, infoIcon);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in infoIcon" + e.getMessage());
		}
		Assert.assertEquals("infoIcon",model.getInfoIcon());
	}
	
	@Test
	public void getNoInsuranceHeading() {

		String noInsuranceHeading = "noInsuranceHeading";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("noInsuranceHeading");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, noInsuranceHeading);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in noInsuranceHeading" + e.getMessage());
		}
		Assert.assertEquals("noInsuranceHeading",model.getNoInsuranceHeading());
	}
	
	@Test
	public void getNoInsuranceDescription() {

		String noInsuranceDescription = "noInsuranceDescription";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("noInsuranceDescription");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, noInsuranceDescription);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in noInsuranceDescription" + e.getMessage());
		}
		Assert.assertEquals("noInsuranceDescription",model.getNoInsuranceDescription());
	}
	
	@Test
	public void getNoInsuranceIcon() {

		String noInsuranceIcon = "noInsuranceIcon";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("noInsuranceIcon");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, noInsuranceIcon);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in noInsuranceIcon" + e.getMessage());
		}
		Assert.assertEquals("noInsuranceIcon",model.getNoInsuranceIcon());
	}
	
	@Test
	public void getSecureDataMessage() {

		String secureDataMessage = "secureDataMessage";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("secureDataMessage");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, secureDataMessage);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in secureDataMessage" + e.getMessage());
		}
		Assert.assertEquals("secureDataMessage",model.getSecureDataMessage());
	}
	
	@Test
	public void getSecureIcon() {

		String secureIcon = "secureIcon";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("secureIcon");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, secureIcon);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in secureIcon" + e.getMessage());
		}
		Assert.assertEquals("secureIcon",model.getSecureIcon());
	}
	
	@Test
	public void getContentFragmentRootPath() {

		String contentFragmentRootPath = "contentFragmentRootPath";
		try {
			Field canonicalUrlField = model.getClass().getDeclaredField("contentFragmentRootPath");
			canonicalUrlField.setAccessible(true);
			canonicalUrlField.set(model, contentFragmentRootPath);
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in contentFragmentRootPath" + e.getMessage());
		}
		Assert.assertEquals("contentFragmentRootPath",model.getContentFragmentRootPath());
	}
	
	
}

