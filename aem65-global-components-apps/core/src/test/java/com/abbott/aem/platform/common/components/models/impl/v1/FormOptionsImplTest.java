package com.abbott.aem.platform.common.components.models.impl.v1;

import static junit.framework.Assert.assertEquals;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CustomOptionItem;
import com.abbott.aem.platform.common.components.models.FormOptions;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.HttpMethod;
import com.abbott.aem.platform.common.components.services.impl.HttpServiceImpl;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import org.mockito.Mockito;

@ExtendWith(AemContextExtension.class)
public class FormOptionsImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;	

	private APILookupService apiLookupService;

	private Page currentPage;

	private PageManager pageManager;

	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(FormContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FormOptionsImplTest.json", "/content");

		pageManager = Mockito.mock(PageManager.class);
		currentPage = Mockito.mock(Page.class);
		ctx.currentPage(currentPage);

	}

	@Test
	void testGetCustomItems() throws IOException,HttpException {
		List<CustomOptionItem> expected = new ArrayList<>();
		apiLookupService = Mockito.mock(APILookupService.class);
		ctx.registerService(APILookupService.class, apiLookupService);

		Mockito.lenient().when(apiLookupService.processRequest(currentPage, "end", HttpMethod.POST, null)).thenReturn("hello");
		ctx.currentResource("/content/formOptions");
		FormOptions options = ctx.request().adaptTo(FormOptions.class);
		List<CustomOptionItem> actual = options.getCustomItems();

		Mockito.lenient().when(apiLookupService.processRequest(currentPage, "end", HttpMethod.POST, null)).thenThrow(new IOException());

		FormOptions obj1 = new FormOptionsImpl();
		FormOptions obj2 = new FormOptionsImpl();
		assertEquals(obj1, obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetRequiredMessage() throws IOException,HttpException {
		final String expected = "This is a required field";
		apiLookupService = Mockito.mock(APILookupService.class);
		ctx.registerService(APILookupService.class, apiLookupService);
		Mockito.lenient().when(apiLookupService.processRequest(currentPage, "end", HttpMethod.POST, null)).thenReturn("hello");
		ctx.currentResource("/content/formOptions");
		FormOptions options = ctx.request().adaptTo(FormOptions.class);
		String actual = options.getRequiredMessage();
		assertEquals(expected, actual);
	}
}
