package com.abbott.aem.adc.freestylelibrede.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class FAQSearchModelTest extends BaseModelTest<FAQSearchModel> {

	@InjectMocks
	private FAQSearchModel model;

	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {
		context.addModelsForClasses(FAQSearchModel.class);

	}

	@Test
	public void getHeading() {
		model = loadModel(FAQSearchModel.class);
		Assert.assertEquals("Heading", model.getHeading());

	}

	@Test
	public void getDescription() {
		model = loadModel(FAQSearchModel.class);
		Assert.assertEquals("Description", model.getDescription());
	}

	@Test
	public void getImage() {
		model = loadModel(FAQSearchModel.class);
		Assert.assertEquals("Image", model.getImage());
	}

	@Test
	public void getShowAllStyle() {
		model = loadModel(FAQSearchModel.class);
		Assert.assertEquals("All Styles", model.getShowAllStyle());
	}

	@Test
	public void getResultPage() {
		model = loadModel(FAQSearchModel.class);
		Assert.assertEquals("/content/page/result", model.getResultPage());
	}

	@Test
	public void getSearchRootPath() {
		model = loadModel(FAQSearchModel.class);
		Assert.assertEquals("/content/page/root", model.getSearchRootPath());

	}

}
