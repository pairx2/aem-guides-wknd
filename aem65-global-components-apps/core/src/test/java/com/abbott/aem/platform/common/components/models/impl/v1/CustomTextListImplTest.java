package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.abbott.aem.platform.common.components.models.CustomTextItem;
import com.abbott.aem.platform.common.components.models.CustomTextList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.Page;
import org.mockito.Mock;
import org.mockito.Mockito;
import java.util.List;
import org.mockito.MockitoAnnotations;

@ExtendWith(AemContextExtension.class)
class CustomTextListImplTest {

	private final AemContext ctx = new AemContext();

	@Mock
	private List<CustomTextItem> mockCustomTextLists;

	/**
	 * The current page.
	 */
	private Page currentPage;

	private ProxyComponentService proxyComponentService;
	private com.day.cq.wcm.api.components.Component component;


	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(com.day.cq.wcm.api.components.Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);

		currentPage = Mockito.mock(Page.class);

		ctx.currentPage(currentPage);

		ctx.addModelsForClasses(CustomTextListV1Impl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CustomTextListImplTest.json", "/content");
	}

	@Test
	void testGetListType() {
		final String expected = "icon";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getListType();
		assertEquals(expected, actual);
	}

	@Test
	void testGetHeaderTitle() {
		final String expected = "Test";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getHeaderTitle();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTextAboveList() {
		final String expected = "test text";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getTextAboveList();
		assertEquals(expected, actual);
	}

	@Test
	void testGetTextBelowList() {
		final String expected = "test text";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getTextBelowList();
		assertEquals(expected, actual);
	}

	@Test
	void testGetIconSize() {
		final String expected = "icon";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getIconSize();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get start color.
	 */
	@Test
	void testGetStartColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getStartColor();
		assertEquals(expected, actual);		
	}
	
	/**
	 * Test get end color.
	 */
	@Test
	void testGetEndColor() {
		final String expected = "rgba(127,239,127,0.55)";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getEndColor();
		assertEquals(expected, actual);		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetStartColorPosition() {
		final String expected = "0";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getStartColorPosition();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test get start color position.
	 */
	@Test
	void testGetEndColorPosition() {
		final String expected = "100";
		ctx.currentResource("/content/customlist");
		CustomTextList customTextList = ctx.request().adaptTo(CustomTextList.class);
		String actual = customTextList.getEndColorPosition();
		assertEquals(expected, actual);
		
	}

	@Test
	void TestGetCustomLists(){
		MockitoAnnotations.initMocks(this);
		CustomTextListV1Impl customTextItem = new CustomTextListV1Impl();
		customTextItem.customLists = mockCustomTextLists;
		List<CustomTextItem> actualCustomTextItem = customTextItem.getCustomLists();
		assertEquals(mockCustomTextLists,actualCustomTextItem);
	}
}
