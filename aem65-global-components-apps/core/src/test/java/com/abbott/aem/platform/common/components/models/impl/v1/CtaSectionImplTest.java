package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.CtaSection;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CtaSection;

@ExtendWith(AemContextExtension.class)
public class CtaSectionImplTest {

	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);

		ctx.addModelsForClasses(CtaSectionImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CtaSectionImplTest.json", "/content/abbott");
	}

	@Test
	void testGetTitle() {
		final String expected = "Large Heading";
		ctx.currentResource("/content/abbott/ctasection");
		CtaSection ctaSection = ctx.request().adaptTo(CtaSection.class);
		String actual = ctaSection.getTitle();
		assertEquals(expected, actual);

		assert StringUtils.isBlank(ctaSection.getBackgroundColor());
		CtaSection obj1 = new CtaSectionImpl();
		CtaSection obj2 = new CtaSectionImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetSubTitle() {
		final String expected = "Medium Heading";
		ctx.currentResource("/content/abbott/ctasection");
		CtaSection ctaSection = ctx.request().adaptTo(CtaSection.class);
		String actual = ctaSection.getSubTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDescription() {
		final String expected = "Lorem Ipsum is simply dummy text for the printing and the type setting industry";
		ctx.currentResource("/content/abbott/ctasection");
		CtaSection ctaSection = ctx.request().adaptTo(CtaSection.class);
		String actual = ctaSection.getDescription();
		assertEquals(expected, actual);
	}

	@Test
	void testGetListOfButtons() {
		final List<String> expected = new ArrayList<>();
		expected.add("button-0");
		expected.add("button-1");
		ctx.currentResource("/content/abbott/ctasection");
		CtaSection ctaSection = ctx.request().adaptTo(CtaSection.class);
		List<String> actual = ctaSection.getListOfButtons();
		assertEquals(expected, actual);

	}
}
