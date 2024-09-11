package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class})
public class NexGenCarouselModelTest  extends BaseModelTest<NexGenCarouselModel> {
    
	@InjectMocks
	private NexGenCarouselModel model;

    @BeforeEach
	void setup() {
		model = loadModel(NexGenCarouselModel.class);
	}

    @Test
	public void getCardTitle() {
		Assert.assertEquals("Card 1", model.getCards().get(0).getCardTitle());
	}

	@Test
	public void getCardImage() {
		Assert.assertEquals("/content/dam/adc/freestylelibrede/de/de/Abbott_header_logo.svg", model.getCards().get(0).getCardImage());
	}

	@Test
	public void getHtmlText() {
		Assert.assertEquals("<h1>Hello</h1>", model.getCards().get(0).getHtmlText());
	}

	@Test
	public void getCTAText(){
		Assert.assertEquals("Card 1 CTA ", model.getCards().get(0).getCta().getText());
	}

	@Test
	public void getCTAType(){
		Assert.assertEquals("primary", model.getCards().get(0).getCta().getType());
	}
/* 
	@Test
	public void getCTALink(){
		Assert.assertEquals("/content/adc/freestylelibrede/de/de/v3/homepage.html", model.getCards().get(0).getCta().getLink());
	}
*/
	@Test
	public void getCTAAction(){
		Assert.assertEquals("_blank", model.getCards().get(0).getCta().getAction());
	}
	
}
