package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Cards;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
/**
 * @author Pawan.Namagiri
 */
@ExtendWith(AemContextExtension.class)

public class CardsImplTest {

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
		
		ctx.addModelsForClasses(FieldsImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CardsImplTest.json", "/content");
		ctx.currentResource("/content/cards");
	}

	@Test
	void testGetCtaOne() {
		final String expected = "Learn More";
		ctx.currentResource("/content/cards");
		Cards cards = ctx.request().adaptTo(Cards.class);
		String actual = cards.getCtaOne();
		assertEquals(expected, actual);

		assertEquals(true, cards.isClickable());
		assertEquals("/cardlink", cards.getCardLink());
		assertEquals("open in new window", cards.getAction());
		assertEquals("true", cards.getExternal());
		assertEquals("/content/experience-fragments/corp/abbott/en-sg/Video-ef", cards.getExpFragPathVideo());
		assertEquals("hoverText", cards.getHoverText());
		assertEquals("icon_sample", cards.getModalIcon());
		assert StringUtils.isNotBlank(cards.toString());
	}

	@Test
	void testGetCtaTwo() {
		final String expected = "Download";
		ctx.currentResource("/content/cards");
		Cards cards = ctx.request().adaptTo(Cards.class);
		String actual = cards.getCtaTwo();
		assertEquals(expected, actual);
		assertEquals(expected, actual);
	}

}
