package com.abbott.aem.add.molecular.core.productlist.impl;

import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.dam.cfm.FragmentData;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
class ProductFilterDataTest {

	private static final String PATH = "/content/productFilterData";
	private final AemContext ctx = new AemContext();
	
	private ProductFilterData filter;
	
	ContentFragment contentFragment;
	
	TagManager tagManager;

	Tag tag;
	
	@BeforeEach
	public void setUp() throws Exception {
		
		
		
		ctx.addModelsForClasses(ProductFilterData.class);
		ctx.load().json("/com/abbott/aem/add/division/core/components/models/impl/ProductFilterDataTest.json", "/content");
		// load resource
		Resource myResource = ctx.resourceResolver().getResource(PATH);	
		setContentFragment();
		setTagmanager();
		filter= ctx.getService(ModelFactory.class).createModel(myResource, ProductFilterData.class);
		
	}
	
	
	private void setContentFragment() {
		contentFragment=Mockito.mock(ContentFragment.class);
		ctx.registerAdapter(Resource.class, ContentFragment.class, contentFragment);
		ContentElement element=Mockito.mock(ContentElement.class);
		when(contentFragment.getElement(Mockito.anyString())).thenReturn(element);
		FragmentData data=Mockito.mock(FragmentData.class);
		when(element.getValue()).thenReturn(data);
		when(data.getValue(String.class)).thenReturn("h2");
		when(data.getValue(String[].class)).thenReturn(new String[] {"h3"});		
	}


	private void setTagmanager() throws Exception {
		tagManager = ctx.resourceResolver().adaptTo(TagManager.class);
		tag=tagManager.createTag("tag1", "Tag 1 title", "Tag 1 desc");
		ctx.registerAdapter(Resource.class, TagManager.class, tagManager);
	}
	
	@Test
	void testObtainTagNames() throws Exception {
		Assertions.assertNotNull(filter.obtainTagNames(new String[]{"tag1"}));
		Assertions.assertArrayEquals(new String[] {"tag1"}, filter.obtainTagNames(new String[]{"tag1"}));
	}
	
	@Test
	void testmapPageUrl()  {
	
		Assertions.assertNotNull(filter);
		Assertions.assertNotNull(filter.mapPageUrl("pageURL"));
		Assertions.assertEquals("pageURL.html", filter.mapPageUrl("pageURL"));
	}
}
