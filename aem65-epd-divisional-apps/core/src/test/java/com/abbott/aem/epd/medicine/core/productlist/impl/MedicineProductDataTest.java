package com.abbott.aem.epd.medicine.core.productlist.impl;

import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;


import com.adobe.cq.dam.cfm.FragmentData;
import com.day.cq.tagging.TagManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junitx.util.PrivateAccessor;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class MedicineProductDataTest {

	private static final Logger LOGGER = LoggerFactory.getLogger(MedicineProductData.class);

	@InjectMocks
	MedicineProductData productData;
	@Mock
	public Resource resource;
	@Mock
	public ResourceResolver resourceResolver;
	@Mock
	ContentFragment contentFragment;
	@Mock
	TagManager tagManager;


	@BeforeEach
	public void setUp() {
		resource = mock(Resource.class);
		contentFragment=mock(ContentFragment.class);
		tagManager=mock(TagManager.class);
		try {
			PrivateAccessor.setField(productData, "title", "titleText");
			PrivateAccessor.setField(productData, "image", "image");
			PrivateAccessor.setField(productData, "detailLink", "detailLink");
			PrivateAccessor.setField(productData, "description", "description");
			PrivateAccessor.setField(productData, "categories[0]", "categories1");

		} catch (NoSuchFieldException e) {
			LOGGER.error("Error in MedicineProductDataTest");
		}

	}

	@Test
	void testValues() {
		assertNotNull(productData.getTitle());
		assertNotNull(productData.getImage());
		assertNotNull(productData.getDetailLink());
		assertNotNull(productData.getDescription());
	}
	@Test
	public void testInit() {
		// Mock ContentFragment
		Resource resource = mock(Resource.class);
		ContentFragment contentFragment = mock(ContentFragment.class);
		productData.setResource(resource);
		lenient().when(resource.adaptTo(ContentFragment.class)).thenReturn(contentFragment);

		// Assertions
		assertEquals("titleText", productData.getTitle());
		assertEquals("image", productData.getImage());
		assertEquals("description", productData.getDescription());
		assertEquals("detailLink", productData.getDetailLink());

	}
	@Test
	public void testInitTitle(){
		String title="prodtitle";
		String image="prodImageRef";
		String description="proddescription";
		String detailLink="prodpath";
		String pageUrl="prodpath";
		String[] categories={"tagvalue"};
		ContentElement contentElement = mock(ContentElement.class);
		FragmentData fragmentData = mock(FragmentData.class);
		MedicineProductData productData=new MedicineProductData();
		when(contentFragment.getElement(title)).thenReturn(contentElement);
		when(contentFragment.getElement(image)).thenReturn(contentElement);
		when(contentFragment.getElement(description)).thenReturn(contentElement);
		when(contentFragment.getElement(detailLink)).thenReturn(contentElement);
		when(contentFragment.getElement(categories[0])).thenReturn(contentElement);

		when(contentFragment.getElement(title).getValue()).thenReturn(fragmentData);
		when(contentFragment.getElement(image).getValue()).thenReturn(fragmentData);
		when(contentFragment.getElement(description).getValue()).thenReturn(fragmentData);
		when(contentFragment.getElement(detailLink).getValue()).thenReturn(fragmentData);
		when(contentFragment.getElement(categories[0]).getValue()).thenReturn(fragmentData);

		when(contentFragment.getElement(title).getValue().getValue(String.class)).thenReturn(title);
		when(contentFragment.getElement(image).getValue().getValue(String.class)).thenReturn(image);
		when(contentFragment.getElement(description).getValue().getValue(String.class)).thenReturn(description);
		when(contentFragment.getElement(detailLink).getValue().getValue(String.class)).thenReturn(detailLink);
		when(contentFragment.getElement(categories[0]).getValue().getValue(String[].class)).thenReturn(categories);

		lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(resource.getResourceResolver().map(pageUrl + ".html")).thenReturn("prodpath.html");
		lenient().when(resource.getResourceResolver().adaptTo(TagManager.class)).thenReturn(tagManager);

		productData.setResource(resource);
		productData.setContentFragment(contentFragment);
		lenient().when(resource.adaptTo(ContentFragment.class)).thenReturn(contentFragment);
		productData.init();
	}
	
	@Test
	public void testObtainFragmentElement(){
		String elementName="prodpath";
		String expected="prodpath";
		ContentElement contentElement = mock(ContentElement.class);
		FragmentData fragmentData = mock(FragmentData.class);
		MedicineProductData productData=new MedicineProductData();
		when(contentFragment.getElement(elementName)).thenReturn(contentElement);
		when(contentFragment.getElement(elementName).getValue()).thenReturn(fragmentData);
		when(contentFragment.getElement(elementName).getValue().getValue(String.class)).thenReturn(elementName);
		productData.setContentFragment(contentFragment);
		String actual=productData.obtainFragmentElement(elementName, String.class);
		assertEquals(expected,actual);
	}

	@Test
	public void testMapPageUrl(){
		String expected="SamplePageURL.html";
		String pageUrl="SamplePageURL";
		productData.setResource(resource);
		lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(resource.getResourceResolver().map(pageUrl + ".html")).thenReturn("SamplePageURL.html");
		String actual=productData.mapPageUrl(pageUrl);
		assertEquals(expected,actual);
	}
	@Test
	public void testObtainTagNames(){
		String[] tagvalues={"tagValue1",null};
		lenient().when(resource.getResourceResolver()).thenReturn(resourceResolver);
		lenient().when(resource.getResourceResolver().adaptTo(TagManager.class)).thenReturn(tagManager);
		productData.setResource(resource);
		String[] actaul=productData.obtainTagNames(tagvalues);
		assertNotNull(actaul);
	}
}
