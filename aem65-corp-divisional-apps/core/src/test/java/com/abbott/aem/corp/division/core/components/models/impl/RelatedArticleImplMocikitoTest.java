package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.wcm.api.Page;

@ExtendWith(MockitoExtension.class)
class RelatedArticleImplMocikitoTest {

	@InjectMocks
	RelatedArticleImpl relatedArticle;

	@Mock
	ResourceResolver resourceResolver;

	@Mock
	Resource imageResource, pageResource;

	@Mock
	Page page;

	@Mock
	Iterator<Resource> resnodes;

	@Mock
	Resource child;

	@Mock
	ValueMap valuemap;

	@BeforeEach
	public void setUp() {
		relatedArticle = Mockito.spy(new RelatedArticleImpl());
		MockitoAnnotations.openMocks(this);
	}
	//test case for if else

	@Test
	void testGetArticleDescription() {
		String response = relatedArticle.getArticleDescription();
		assertEquals("", response);
	}

	@Test
	void testGetArticleImagePath() {
		List<Resource> resources = new ArrayList<Resource>();
		resources.add(child);
		Mockito.when(resourceResolver.getResource("null/jcr:content/root")).thenReturn(pageResource);
		Mockito.when(child.getName()).thenReturn("childcontainer");
		Mockito.when(child.getPath()).thenReturn("childpath");
		Mockito.when(pageResource.listChildren()).thenReturn(resources.iterator());
		Mockito.when(resourceResolver.getResource("childpath/image")).thenReturn(imageResource);
		Mockito.when(imageResource.getValueMap()).thenReturn(valuemap);
		Mockito.when(valuemap.get("fileReference", "")).thenReturn("value");
		String response = relatedArticle.getArticleImagePath();
		assertEquals("value", response);
	}

	@Test
	void testGetArticleImagePath2() {
		Mockito.when(resourceResolver.getResource("null/jcr:content/root")).thenReturn(null);
		String response = relatedArticle.getArticleImagePath();
		assertEquals("", response);
	}

	@Test
	void testGetArticleImagePath3() {
		List<Resource> resources = new ArrayList<Resource>();
		Mockito.when(resourceResolver.getResource("null/jcr:content/root")).thenReturn(pageResource);
		Mockito.when(pageResource.listChildren()).thenReturn(resources.iterator());
		String response = relatedArticle.getAltText();
		assertEquals("", response);
	}

	@Test
	void testGetArticleImagePath4() {
		List<Resource> resources = new ArrayList<Resource>();
		resources.add(child);
		Mockito.when(resourceResolver.getResource("null/jcr:content/root")).thenReturn(pageResource);
		Mockito.when(child.getName()).thenReturn("childcontainer");
		Mockito.when(child.getPath()).thenReturn("childpath");
		Mockito.when(pageResource.listChildren()).thenReturn(resources.iterator());
		Mockito.when(resourceResolver.getResource("childpath/image")).thenReturn(null);
		String response = relatedArticle.getAltText();
		assertEquals("", response);
	}

	@Test
	void testGetArticleImagePath5() {
		List<Resource> resources = new ArrayList<Resource>();
		resources.add(child);
		Mockito.when(resourceResolver.getResource("null/jcr:content/root")).thenReturn(pageResource);
		Mockito.when(child.getName()).thenReturn("childcont");
		Mockito.when(pageResource.listChildren()).thenReturn(resources.iterator());
		String response = relatedArticle.getAltText();
		assertEquals("", response);
	}

}
