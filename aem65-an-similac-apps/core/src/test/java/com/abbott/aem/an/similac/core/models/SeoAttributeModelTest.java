package com.abbott.aem.an.similac.core.models;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.services.StoreConfigService;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class SeoAttributeModelTest {

	private static final String CURRENT_RESOURCE = "/content/an/similac/us/en/products/jcr:content";

	private final AemContext ctx = new AemContext();

	@Mock
	private StoreConfigService storeService;

	@Mock
	private transient Externalizer externalizer;
	
	private SeoAttributeModel seoModel;

	@BeforeEach
	void setUp() {
		ctx.addModelsForClasses(SeoAttributeModel.class);
		ctx.registerService(StoreConfigService.class, storeService);
		ctx.registerService(Externalizer.class, externalizer);
		Mockito.lenient().when(storeService.getDomainName()).thenReturn("https://www.similac.com");
		Mockito.lenient().when(externalizer.externalLink(Mockito.any(ResourceResolver.class), Mockito.any(String.class),
				Mockito.any(String.class))).thenReturn("https://www.similac.com");
		ctx.load().json("/com/abbott/aem/an/similac/core/models/seoAttributeModel.json", "/content/an/similac");
		ctx.load().json("/com/abbott/aem/an/similac/core/models/seoAttributeModel-conf.json", "/conf/an/similac");
	}

	@Test
	void testConfHreflang() {
		ctx.currentResource("/conf/an/similac/us/en/products/jcr:content");
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		Assertions.assertNull(seoModel.getHreflang());
	}
	
	@Test
	void testConfHreflangNegative() {
		ctx.currentResource("/conf/an/similac/ca/en/products/jcr:content");
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		Assertions.assertNull(seoModel.getHreflang());
	}

	@Test
	void testOgDescription() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "Products page";
		String actual = seoModel.getFbdescription();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testRobots() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String[] expected = { "noindex", "nofollow" };
		String[] actual = seoModel.getRobotseo();
		Assertions.assertArrayEquals(expected, actual);
	}

	@Test
	void testFbSitename() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "Similac Store";
		String actual = seoModel.getFbsitename();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testFbPixelId() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "1234";
		String actual = seoModel.getFbpixelid();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testOgImage() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "https://www.similac.com/content/dam/an/similac/image.png";
		String actual = seoModel.getOgimage();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testOgImageHeight() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "100";
		String actual = seoModel.getOgImageHeight();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testOgImageWidth() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "100";
		String actual = seoModel.getOgImageWidth();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testOgType() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "image/png";
		String actual = seoModel.getOgImageType();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testFbType() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "website";
		String actual = seoModel.getFbtype();
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testCanonical() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String actual = seoModel.getCanonical();
		Assertions.assertNotNull(actual);
	}

	@Test
	void testHrefLang() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "en-us";
		String actual = seoModel.getHreflang();
		Assertions.assertEquals(expected, actual);
	}
	
	@Test
	void testHreflangMap() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		Map<String,String> expected = new HashMap<>();
		expected.put("en-us", "https://www.similac.com");
		Map<String,String> actual = seoModel.getHreflangMap();
		Assertions.assertEquals(expected,actual);
	}
	
	@Test
	void testGenerateHreflangMapNegative() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		Map<String,String> expected = new HashMap<>();
		Map<String,String> actual = seoModel.generateHreflangMap(expected);
		Assertions.assertEquals(expected, actual);
	}
	
	@Test
	void testGetItemsNegative() {
		ctx.currentResource(CURRENT_RESOURCE);
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		Map<String,String> expected = new HashMap<>();
		Map<String,String> actual = seoModel.getItems(ctx.currentPage());
		Assertions.assertEquals(expected, actual);
	}

	@Test
	void testNonOgTitle() {
		ctx.currentResource("/content/an/similac/us/en/baby-feeding/jcr:content");
		SeoAttributeModel seoModel2 = ctx.request().adaptTo(SeoAttributeModel.class);
		String expected = "Baby Feeding!";
		String actual = seoModel2.getFbtitle();
		Assertions.assertEquals(expected, actual);
	}
	
	@Test
	void testGetLocalisedPage() {
		ctx.currentResource("/conf/an/similac/us/en/products/jcr:content");
		ctx.currentPage("/conf/an/similac/us/en/products");
		Page root = ctx.pageManager().getPage("/content/an/similac/us");
		SeoAttributeModel seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		
		Map<String,String> actual= seoModel.getItems(root);
		Map<String,String> expected = new HashMap<>();
		expected.put("en-us", "https://www.similac.com");
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetLocalisedPage2() {
		ctx.currentResource("/conf/an/similac/us/en/jcr:content");
		ctx.currentPage("/conf/an/similac/us/en");
		Page root = ctx.pageManager().getPage("/content/an/similac/us");
		SeoAttributeModel seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		
		Map<String,String> actual= seoModel.getItems(root);
		Map<String,String> expected = new HashMap<>();
		expected.put("en-us", "https://www.similac.com");
		assertEquals(expected, actual);
	}
	
	@Test
	void testGetLocalisedPage3() {
		ctx.currentResource("/conf/an/similac/us/jcr:content");
		ctx.currentPage("/conf/an/similac/us");
		Page root = ctx.pageManager().getPage("/content/an/similac/us");
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		
		Map<String,String> actual= seoModel.getItems(root);
		Map<String,String> expected = new HashMap<>();
		expected.put("en-us", "https://www.similac.com");
		assertEquals(expected, actual);
	}
 	
	@Test
	void testGetLocalisedPage4() {
		ctx.currentResource("/conf/an/similac/us/en/products/jcr:content");
		ctx.currentPage("/conf/an/similac/us/en/products");
		Page root = ctx.pageManager().getPage("/content/an/similac/us");
		seoModel = ctx.request().adaptTo(SeoAttributeModel.class);
		
		Map<String,String> actual= seoModel.getItems(root);
		Map<String,String> expected = new HashMap<>();
		expected.put("en-us", "https://www.similac.com");
		assertEquals(expected, actual);
	}
}
