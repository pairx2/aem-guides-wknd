package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;

@ExtendWith(AemContextExtension.class)
class CardModelTest extends BaseModelTest<CardModel> {

	private final AemContext context = new AemContext();

	CardModel model;

	@BeforeEach
	void setup() {
		model = loadModel(CardModel.class);
	}

	@Test
	void getCardTitle() {
		Assert.assertEquals("Card Title", model.getCardTitle());
	}

	@Test
	void getImagePosition() {
		Assert.assertEquals("Card Image Position", model.getImagePosition());
	}

	@Test
	void getImage() {
		Assert.assertEquals("Card Image", model.getImage());
	}

	@Test
	void getImageAltText() {
		Assert.assertEquals("Card Image Alt Text", model.getImageAltText());
	}

	@Test
	void getDescription() {
		Assert.assertEquals("Card Description", model.getDescription());
	}

	@Test
	void getCtaLabel() {
		Assert.assertEquals("Card CTA Label", model.getCtaLabel());
	}
	
	@Test
	void getShowCta() {
		Assert.assertTrue(model.getShowCta());
	}

	@Test
	void getCtaAction() {
		Assert.assertEquals("Card CTA Action", model.getCtaAction());
	}

	@Test
	public void getCtaStyling() {
		Assert.assertEquals("CtaStyling", model.getCtaStyling());
	}

	@Test
	public void getSecondaryCtaStyling() {
		Assert.assertEquals("SecondaryCtaStyling", model.getSecondaryCtaStyling());
	}

	@Test
	public void getSecondaryCtaLabel() {
		Assert.assertEquals("SecondaryCtaLabel", model.getSecondaryCtaLabel());
	}


	@Test
	public void getSecondaryCtaAction() {
		Assert.assertEquals("SecondaryCtaAction", model.getSecondaryCtaAction());
	}

}