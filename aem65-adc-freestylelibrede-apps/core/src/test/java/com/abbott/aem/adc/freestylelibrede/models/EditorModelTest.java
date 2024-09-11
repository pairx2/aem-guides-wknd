package com.abbott.aem.adc.freestylelibrede.models;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.EditorItemFactory;
import com.abbott.aem.platform.common.components.models.GenericList;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class EditorModelTest extends BaseModelTest<EditorModel> {

	@Mock
	private SlingHttpServletRequest request;
	@Mock
	private Resource container;
	@Mock
	private PageManager pageManager;
	@Mock
	private EditorItemFactory editorItemFactory;
	@Mock
	private List<EditorItem> items;
	@Mock
	private GenericList genericList;

	@InjectMocks
	EditorModel model;

	@BeforeEach
	void setUp() throws IOException {	
	}

	@Override
	protected AemContext getContext() {
		return context;
	}

	@Test
	public void iconslist() {
		try {
			
			Field canonicalUrlFieldContainer = model.getClass().getDeclaredField("container");
			canonicalUrlFieldContainer.setAccessible(true);
			canonicalUrlFieldContainer.set(model, container);
			
			Field canonicalUrlFieldItems = model.getClass().getDeclaredField("items");
			canonicalUrlFieldItems.setAccessible(true);
			canonicalUrlFieldItems.set(model, items);
			
			Field canonicalUrlFieldGenericList = model.getClass().getDeclaredField("genericList");
			canonicalUrlFieldGenericList.setAccessible(true);
			canonicalUrlFieldGenericList.set(model, genericList);
			
		} catch (NoSuchFieldException | IllegalAccessException e) {
			Assert.fail("Exception occurred in requestString" + e.getMessage());
		}
		Assert.assertTrue(true);
	}

}