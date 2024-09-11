package com.abbott.aem.platform.common.components.models.impl.v1;

import static junit.framework.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.TermsSections;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@ExtendWith(AemContextExtension.class)
class TermsSectionsImplTest {

	private static final String PATH = "/content/termsSectionsList";
	private final AemContext ctx = new AemContext();

	@InjectMocks
	TermsSectionsImpl termsSectionsImpl;
	@Spy
	Resource resource;
	@Spy
	Page currentPage;
	@Mock
	private Page page;
	@Mock
	private ResourceResolver resourceResolver;

	@BeforeEach
	void setUp() throws Exception {
//        ctx.addModelsForClasses(TermsSectionsImpl.class);
//        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TermsSectionsImplTest.json", "/content");
//        ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/TermsSectionsPage.json","/mycontent");
//        ctx.currentResource("/content/termsSections");
//        ctx.currentPage("/mycontent/page");
		//Resource pageResource = ctx.resourceResolver().getResource("/content/page");
		//Page page = pageResource.adaptTo(Page.class);
		//ctx.currentPage(page);
		//resource = Mockito.mock(Resource.class);
		//resourceResolver = Mockito.mock(ResourceResolver.class);
		//page = Mockito.mock(Page.class);

		page = ctx.create().page("/content/abbott");
		Map<String, Object> properties = new HashMap<>();
		properties.put("sling:resourceType", "nt:unstructured");
		properties.put("text", "icon");
		properties.put("listText", "QTest");
		properties.put("link", "/content/dam/abc");
		properties.put("icon", "icon");
		properties.put("external", "true");
		Resource resource = ctx.create().resource(page, "item", properties);
	}

	@Test
	void testGetTermsSections() {
		//ctx.currentResource(TermsSectionsImplTest.PATH);
		//ctx.currentPage(page);

		//Resource res2 =ctx.request().getResource().getChild("jcr:content/termsSections");
		//ctx.currentResource(res2);
		//TermsSections termsSections = ctx.request().getResource().getChild("jcr:content/termsSections").adaptTo(TermsSectionsImpl.class);
		TermsSections termsSections = ctx.request().adaptTo(TermsSectionsImpl.class);
		//termsSections.getTermsSections();
	}

	@Test
	void testLoadTermsSections() {
		when(resource.getResourceResolver()).thenReturn(resourceResolver);
		when(resourceResolver.getResource(any())).thenReturn(resource);
		when(resource.listChildren()).thenReturn(Arrays.asList(resource).iterator());
		termsSectionsImpl.init();
		assertTrue(termsSectionsImpl.getTermsSections().size() > 0);
	}

}