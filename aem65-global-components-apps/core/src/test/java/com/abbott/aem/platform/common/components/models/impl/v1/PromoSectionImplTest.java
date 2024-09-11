package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.PromoSection;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.PromoSection;

@ExtendWith(AemContextExtension.class)
public class PromoSectionImplTest {

	private static final String PATH = "/content/promoSection";
	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(ChipsListImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PromoSectionImplTest.json", "/content");
	}

	@Test
	void testGetButtonCount() {
		ctx.currentResource(PromoSectionImplTest.PATH);
		PromoSection promoSection = ctx.request().adaptTo(PromoSection.class);
		assertEquals(2, promoSection.getButtonCount());
	}

	@Test
	void testGetBadgeRequired() {
		ctx.currentResource(PromoSectionImplTest.PATH);
		PromoSection promoSection = ctx.request().adaptTo(PromoSection.class);
		assertEquals(true, promoSection.isBadgeRequired());
	}

	@Test
	void testGetButtonLength() {
		ctx.currentResource(PromoSectionImplTest.PATH);
		PromoSection promoSection = ctx.request().adaptTo(PromoSection.class);
		assertArrayEquals(new String[2], promoSection.getButtonLength());

		//assert StringUtils.isNotBlank(promoSection.getId());
		PromoSection obj1 = new PromoSectionImpl();
		PromoSection obj2 = new PromoSectionImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

}
