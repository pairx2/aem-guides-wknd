package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.ProductSection;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.ProductSection;

/**
 * Test class to test product section implementation
 *
 * @author sanjucta.s
 */
@ExtendWith(AemContextExtension.class)
class ProductSectionImplTest {

	private final AemContext ctx = new AemContext();

	private final AemContext ctx2 = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(ProductSectionImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductSectionImplTest.json", "/content/abc");
		ctx.currentResource("/content/abc/productsection");
	}

	@Test
	void testGetTitle() {
		final String expected = "Test Title";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetDescription() {
		final String expected = "Test Description";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getDescription();
		assertEquals(expected, actual);
		assert StringUtils.isNotBlank(productSection.getId());
		ProductSection obj1 = new ProductSectionImpl();
		ProductSection obj2 = new ProductSectionImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetProductSectionType() {
		final String expected = "image";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getProductSectionType();
		assertEquals(expected, actual);
	}

	@Test
	void testGetImageSize() {
		final String expected = "small";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getImageSize();
		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonCount() {
		final int expected = 1;
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		int actual = productSection.getButtonCount();
		assertEquals(expected, actual);
	}

	@Test
	void testGetButtonList() {
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		assertNotNull(productSection.getButtonList());
		assertEquals(1, productSection.getButtonList().size());

		ctx2.addModelsForClasses(ProductSectionImpl.class);
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductSectionImplTest2.json", "/content/xyz");
		ctx2.currentResource("/content/xyz/productsection");
		ProductSection productSection2 = ctx2.request().adaptTo(ProductSection.class);
		assertNotNull(productSection2.getButtonList());
		assertEquals(0, productSection2.getButtonList().size());
	}

	@Test
	void testIsBadgeChecked() {
		final boolean expected = true;
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		boolean actual = productSection.isBadgeChecked();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get start color.
	 */
	@Test
	void testGetStartColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getStartColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get end color.
	 */
	@Test
	void testGetEndColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getEndColor();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetStartColorPosition() {
		final String expected = "0";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getStartColorPosition();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetEndColorPosition() {
		final String expected = "100";
		ProductSection productSection = ctx.request().adaptTo(ProductSection.class);
		String actual = productSection.getEndColorPosition();
		assertEquals(expected, actual);
		
	}
	

}
