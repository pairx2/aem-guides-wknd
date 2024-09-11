package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Footer;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.Footer;

/**
 * JUnit test verifying the FooterImpl
 */

/**
 * @author santosh.vadakattu
 */
@ExtendWith(AemContextExtension.class)
public class FooterImplTest {

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

		ctx.addModelsForClasses(FooterImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FooterImplTest.json", "/content");
	}

	@Test
	void testGetLinkStackCount() {
		final int expected = 3;
		ctx.currentResource("/content/footer");
		Footer footer = ctx.request().adaptTo(Footer.class);
		int actual = footer.getLinkStackCount();
		assertEquals(expected, actual);

		Footer obj1 = new FooterImpl();
		Footer obj2 = new FooterImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testCopyRightText() {
		final String expected = "Copy Rights Reserved";
		ctx.currentResource("/content/footer");
		Footer footer = ctx.request().adaptTo(Footer.class);
		String actual = footer.getCopyrightText();
		assertEquals(expected, actual);
	}

	@Test
	void testDisclaimerCount() {
		final int expected = 3;
		ctx.currentResource("/content/footer");
		Footer footer = ctx.request().adaptTo(Footer.class);
		int actual = footer.getDisclaimerLinksCount();
		assertEquals(expected, actual);
	}

	@Test
	void testGetLinkStackList() {
		final List<String> expected = new ArrayList<String>();
		expected.add("linkstack-0");
		expected.add("linkstack-1");
		expected.add("linkstack-2");
		ctx.currentResource("/content/footer");
		Footer footer = ctx.request().adaptTo(Footer.class);
		List<String> actual = footer.getListOfLinkStack();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDisclaimerList() {
		final List<String> expected = new ArrayList<String>();
		expected.add("disclaimer-0");
		expected.add("disclaimer-1");
		expected.add("disclaimer-2");
		ctx.currentResource("/content/footer");
		Footer footer = ctx.request().adaptTo(Footer.class);
		List<String> actual = footer.getListOfDisclaimer();
		assertEquals(expected, actual);
	}

}
