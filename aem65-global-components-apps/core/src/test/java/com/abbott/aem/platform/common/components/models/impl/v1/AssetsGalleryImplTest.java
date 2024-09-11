package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.models.AssetsGalleryItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import com.abbott.aem.platform.common.components.models.AssetsGallery;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class AssetsGalleryImplTest {
    
    private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	@Mock
	private List<AssetsGalleryItem> productImageList;


	@BeforeEach
	void setUp() throws Exception {
		ctx.addModelsForClasses(AssetsGalleryImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/AssetsGalleryImplTest.json",
				"/content");
		ctx.currentResource("/content/assetsgallery");
	}

	@Test
	void testThumnailPosition() {
		final String expected = "bottom";
		AssetsGallery assets = ctx.request().adaptTo(AssetsGallery.class);
		String actual = assets.getThumbnailPosition();
		assertEquals(expected, actual);
	}

	@Test
	void testGetProductImageList() {
		MockitoAnnotations.initMocks(this);
		AssetsGalleryImpl assetsGallery = new AssetsGalleryImpl();
		assetsGallery.productImageList = productImageList;
		List<AssetsGalleryItem> actualSectionItems = assetsGallery.getProductImageList();
		assertEquals(productImageList, actualSectionItems);
	}

}