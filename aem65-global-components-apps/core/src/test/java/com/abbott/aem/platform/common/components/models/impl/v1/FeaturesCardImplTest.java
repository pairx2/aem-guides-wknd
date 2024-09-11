package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.FeaturesCard;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


/**
 * @author Pawan.Namagiri
 */
@ExtendWith(AemContextExtension.class)
class FeaturesCardImplTest {

	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(FeaturesCardImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FeaturesCardTest.json", "/content");

	}

	@Test
	void testGetLargeFormatNumber() {
		final String expected = "28k";
		ctx.currentResource("/content/featurescard");
		FeaturesCard featuresCard = ctx.request().adaptTo(FeaturesCard.class);
		String actual = featuresCard.getLargeFormatNumber();
		assertEquals(expected, actual);

		FeaturesCard obj1 = new FeaturesCardImpl();
		FeaturesCard obj2 = new FeaturesCardImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetButtonRequired() {
		final boolean expected = true;
		ctx.currentResource("/content/featurescard");
		FeaturesCard featuresCard = ctx.request().adaptTo(FeaturesCard.class);
		boolean actual = featuresCard.isButtonRequired();
		assertEquals(expected, actual);
	}

	@Test
	void testGetBadgeRequired() {
		final boolean expected = false;
		ctx.currentResource("/content/featurescard");
		FeaturesCard featuresCard = ctx.request().adaptTo(FeaturesCard.class);
		boolean actual = featuresCard.isBadgeRequired();
		assertEquals(expected, actual);
	}

	@Test
	void testGetFeatureStyle() {
		final String expected = "number";
		ctx.currentResource("/content/featurescard");
		FeaturesCard featuresCard = ctx.request().adaptTo(FeaturesCard.class);
		String actual = featuresCard.getFeatureStyle();
		assertEquals(expected, actual);
	}
}
