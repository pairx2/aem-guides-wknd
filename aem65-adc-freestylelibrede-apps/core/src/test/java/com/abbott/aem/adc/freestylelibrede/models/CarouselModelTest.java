package com.abbott.aem.adc.freestylelibrede.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class CarouselModelTest extends BaseModelTest<CarouselModel> {
	public final AemContext context = new AemContext();

	@Mock
	ModelFactory modelFactory;

	@InjectMocks
	private CarouselModel model;

	private SampleModel innerModel = new SampleModel();

	@BeforeEach
	void setUp() {

		when(modelFactory.getModelFromResource(any())).thenReturn(innerModel);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
		model = loadModel(CarouselModel.class);
	}

	@Test
	void getChildren() {
		Assert.assertEquals(innerModel, model.getChildren().get(0));
	}

	@Test
	void getCarouselType() {
		Assert.assertEquals("carousel", model.getCarouselType());
	}

	@Test
	public void getCtaText() {
		Assert.assertEquals("CtaText", model.getCtaText());
	}

	@Test
	public void getCtaStyling() {
		Assert.assertEquals("CtaStyling", model.getCtaStyling());
	}
	
	@Test
	public void getCtaAction() {
		Assert.assertEquals("CtaAction", model.getCtaAction());
	}

	@Test
	public void getSectionHeading() {
		Assert.assertEquals("SectionHeading", model.getSectionHeading());
	}
	
	@Test 
	public void getHeading() {
		Assert.assertEquals("Heading", model.getHeading());
	}

	public static class SampleModel {
		private String field = "sample value";

		public String getField() {
			return this.field;
		}

	}
}