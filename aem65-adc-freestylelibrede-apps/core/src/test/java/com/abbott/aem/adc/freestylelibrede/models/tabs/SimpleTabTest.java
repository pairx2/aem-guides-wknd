package com.abbott.aem.adc.freestylelibrede.models.tabs;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class SimpleTabTest extends BaseModelTest<SimpleTab> {

	private SimpleTab model;
	private final AemContext context = new AemContext();

	@BeforeEach
	void setup() {

		model = loadModel(SimpleTab.class);

	}

	@Test
	public void getHeading() {
		Assert.assertEquals("Heading", model.getHeading());
	}

	@Test
	public void getImage() {
		Assert.assertEquals("Image", model.getImage());
	}

	@Test
	public void isDisplayThumbnail() {
		Assert.assertEquals(true, model.isDisplayThumbnail());
	}

	@Test
	public void getThumbnailImage() {
		Assert.assertEquals("ThumbnailImage", model.getThumbnailImage());
	}

	@Test
	public void isProductTab() {
		Assert.assertEquals(false, model.isProductTab());
	}
	
	@Test
	public void getDeepLinkTarget() {
		Assert.assertEquals("DeepLinkTarget", model.getDeepLinkTarget());
	}

}
