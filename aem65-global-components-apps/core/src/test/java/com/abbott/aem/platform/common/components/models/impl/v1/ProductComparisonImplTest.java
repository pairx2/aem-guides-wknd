package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Product;
import com.abbott.aem.platform.common.components.models.ProductComparison;
import com.abbott.aem.platform.common.components.models.ProductFeature;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class ProductComparisonImplTest {

	private static final String PATH = "/content/abc/productcomparison";
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
		ctx.addModelsForClasses(ProductComparisonImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductComparisonImplTest.json", "/content/abc");
	}

	@Test
	void testGetFeatures() {
		ctx.currentResource(ProductComparisonImplTest.PATH);
		ProductComparison comparison = ctx.request().adaptTo(ProductComparison.class);
		assertNotNull(comparison.getFeatures());
		assertEquals(4, comparison.getFeatures().size());
		assertEquals("Feature 1", comparison.getFeatures().get(0).getFeatureName());
		assert StringUtils.isNotBlank(comparison.getId());
		ProductComparison obj1 = new ProductComparisonImpl();
		ProductComparison obj2 = new ProductComparisonImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetProducts() {
		ctx.currentResource(ProductComparisonImplTest.PATH);
		ProductComparison comparison = ctx.request().adaptTo(ProductComparison.class);
		assertNotNull(comparison.getProducts());
		assertEquals(3, comparison.getProducts().size());
		assertEquals("Product 1", comparison.getProducts().get(0).getProductTitle());
		for (Product product : comparison.getProducts()) {
			assertNotNull(product.getBadgePosition());
			assertNotNull(product.getProductAltText());
			assertNotNull(product.getProductId());
			assertNotNull(product.getProductImage());
			assertNotNull(product.getProductTitle());
		}
	}

	@Test
	void testIsTableHeadingRequired() {
		ctx.currentResource(ProductComparisonImplTest.PATH);
		ProductComparison comparison = ctx.request().adaptTo(ProductComparison.class);
		assertTrue(comparison.isTableHeadingRequired());
	}

	@Test
	void testIsTableHeadingRequired2() {
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductComparisonImplTest2.json", "/content/xyz");

		ctx.currentResource("/content/xyz/productcomparison");
		ProductComparison comparison = ctx.request().adaptTo(ProductComparison.class);
		assertTrue(comparison.isTableHeadingRequired());
	}

	@Test
	void testIsTableHeadingRequired3() {
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/ProductComparisonImplTest3.json", "/content/xyz");

		ctx.currentResource("/content/xyz/productcomparison");
		ProductComparison comparison = ctx.request().adaptTo(ProductComparison.class);
		assertFalse(comparison.isTableHeadingRequired());
		List<ProductFeature> featurelist = comparison.getFeatures();
		assert featurelist.size() > 0;
		for (ProductFeature feature : featurelist) {
			assert StringUtils.isNotBlank(feature.getFeatureId());
			assert StringUtils.isNotBlank(feature.getFeatureName());
		}
	}

	@Test
	void testIsTableLinkRequired() {
		ctx.currentResource(ProductComparisonImplTest.PATH);
		ProductComparison comparison = ctx.request().adaptTo(ProductComparison.class);
		assertTrue(comparison.isTableLinkRequired());
	}
}
