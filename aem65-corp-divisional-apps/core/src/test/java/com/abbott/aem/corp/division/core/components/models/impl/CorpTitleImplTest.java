package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

@ExtendWith(MockitoExtension.class)
class CorpTitleImplTest {
	
	@InjectMocks
	CorpTitleImpl corpTitle;
	
	@Mock
	Page currentPage, tempCurrentPage;
	
	@Mock
	ValueMap parentPageProperties;
	
	@BeforeEach
	public void setUp() {
		corpTitle = Mockito.spy(new CorpTitleImpl());
		MockitoAnnotations.openMocks(this);
	}

	
	@Test
	void testArticleTitleWithValue() {
		Mockito.doReturn("category").when(corpTitle).getArticleType();
		Mockito.when(currentPage.getParent()).thenReturn(tempCurrentPage);
		Mockito.when(tempCurrentPage.getProperties()).thenReturn(parentPageProperties);
		Mockito.when(parentPageProperties.get(JcrConstants.JCR_TITLE, String.class)).thenReturn("title");
		String response = corpTitle.getArticleTitle();
		assertEquals("title", response);
	}
	
	@Test
	void testArticleTitleWihtoutValue() {
		Mockito.doReturn("Category").when(corpTitle).getArticleType();
		String response = corpTitle.getArticleTitle();
		assertEquals(StringUtils.EMPTY, response);
	}
	
	@Test
	void testArticleDescriptionWithValue() {
		Mockito.doReturn("description").when(corpTitle).getArticleType();
		Mockito.when(currentPage.getProperties()).thenReturn(parentPageProperties);
		Mockito.when(parentPageProperties.get(JcrConstants.JCR_DESCRIPTION, String.class)).thenReturn("desc");
		String response = corpTitle.getArticleDescription();
		assertEquals("desc", response);
	}
	
	@Test
	void testArticleDescriptionWihtoutValue() {
		Mockito.doReturn("Description").when(corpTitle).getArticleType();
		String response = corpTitle.getArticleDescription();
		assertEquals(StringUtils.EMPTY, response);
	}
	
	@Test
	void testArticleType() {
		String response = corpTitle.getArticleType();
		assertNull(response);
	}
	
	@Test
	void testAuthoredDateValidDate() {
		Mockito.when(currentPage.getProperties()).thenReturn(parentPageProperties);
		Mockito.when(parentPageProperties.get("authoredDate", String.class)).thenReturn("2023-03-01T10:30:10");
		String response = corpTitle.getAuthoredDate();
		assertEquals("Mar.01, 2023", response);
	}
	
	@Test
	void testAuthoredDateInvalidFormat() {
		Mockito.when(currentPage.getProperties()).thenReturn(parentPageProperties);
		Mockito.when(parentPageProperties.get("authoredDate", String.class)).thenReturn("2023-03-01'T'10:30:10");
		String response = corpTitle.getAuthoredDate();
		assertNotNull(response);
	}
	
	@Test
	void testGetText() {
		String response = corpTitle.getText();
		assertNull(response);
	}
	
	@Test
	void testArticleHeadLineWithValue() {
		Mockito.doReturn("headline").when(corpTitle).getArticleType();
		Mockito.when(currentPage.getTitle()).thenReturn("title");
		String response = corpTitle.getArticleHeadline();
		assertEquals("title", response);
	}
	
	@Test
	void testArticleHeadLineWihtoutValue() {
		Mockito.doReturn("Headline").when(corpTitle).getArticleType();
		String response = corpTitle.getArticleHeadline();
		assertEquals(StringUtils.EMPTY, response);
	}
	

}