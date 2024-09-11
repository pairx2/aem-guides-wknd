package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class PrescriptionReminderModelTest  extends BaseModelTest<PrescriptionReminderModel> {
    
	@InjectMocks
	private PrescriptionReminderModel model;

    @BeforeEach
	void setup() {
		model = loadModel(PrescriptionReminderModel.class);
	}

	@Test
	public void rendition() {
		Assert.assertEquals("account-overview", model.getRendition());
	}

    @Test
	public void getHeading() {
		Assert.assertEquals("Test Heading", model.getHeading());
	}

	@Test
	public void getCTAText(){
		Assert.assertEquals("CTA Button", model.getCta().getText());
	}

	@Test
	public void getReminderWindowStartDays(){
		Assert.assertEquals(60, model.getReminderWindowStartDays());
	}

	@Test
	public void getReminderWindowStopDays(){
		Assert.assertEquals(30, model.getReminderWindowStopDays());
	}

	@Test
	public void getReminderWindowBannerStartDays(){
		Assert.assertEquals(60, model.getReminderWindowBannerStartDays());
	}

	@Test
	public void getReminderWindowBannerStopDays(){
		Assert.assertEquals(30, model.getReminderWindowBannerStopDays());
	}
	
}
