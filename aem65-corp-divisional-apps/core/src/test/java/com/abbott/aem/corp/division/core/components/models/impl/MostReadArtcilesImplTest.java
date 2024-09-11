package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.MostReadArticles;
import com.abbott.aem.corp.division.core.components.models.MostReadArticlesModal;
import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPull;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.script.Bindings;

@ExtendWith(AemContextExtension.class)
public class MostReadArtcilesImplTest {
	
	private final AemContext ctx = new AemContext();
	private final AemContext ctx1 = new AemContext();
	MostReadArticles mostReadArticles;
	
	@Mock
	PageManager pageManager;
	
	@Mock
	Page page;
	
	@Mock
	Node node;
	
	@Mock
	Resource resource;
	
	@Mock
	ResourceResolver resurceResolver;
	
	@BeforeEach
	public void setUp() throws Exception {
				
		MockitoAnnotations.initMocks(this);
		ctx.addModelsForClasses(MostReadArticlesImpl.class);
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/MostReadArtcilesImplTest.json", "/content/corp/abbott/us/en/corpnewsroom/diabetes-care/how-to-be-your-own-best-diabetes-care-advocate");
		ctx.currentResource("/content/corp/abbott/us/en/corpnewsroom/diabetes-care/how-to-be-your-own-best-diabetes-care-advocate/mostread");
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/MostReadArtcilesImplTest2.json", "/content/corp/abbott/us/en/corpnewsroom/jcr:content");
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/MostReadArtcilesImplTestItem0.json", "/content/corp/abbott/us/en/corpnewsroom/diabetes-care/4-ways-to-keep-kids-with-diabetes-healthy-and-active");
		mostReadArticles = ctx.request().adaptTo(MostReadArticles.class);
	
	}

	@Test
    void testGetMostReadArticles() {
		 
        final String mostReadExpected = "/content/corp/abbott/us/en/corpnewsroom";
        String mostReadActual = mostReadArticles.getMostReadArticles();
        assertEquals(mostReadExpected, mostReadActual);
    }
	
	@Test
	void testGetTotalResults() {
		
		final String totalResultsExpected = "0";
		String totalResultsActual = mostReadArticles.getTotalResults();
		assertEquals(totalResultsExpected, totalResultsActual);
	}
	
	@Test
    void testGetDisplayType() {
	
        final String displayTypeExpected = "mostreadarticles";
        String displayTypeActual = mostReadArticles.getDisplayType();
        assertEquals(displayTypeExpected, displayTypeActual);
    }
	
	
	@Test
    void testArticleMoreReults() {
		ctx1.load().json("/com/abbott/aem/corp/division/core/components/models/impl/MostReadArtcilesImplTest3.json", "/content/corp/abbott/us/en/corpnewsroom/diabetes-care/how-to-be-your-own-best-diabetes-care-advocate");
		ctx1.currentResource("/content/corp/abbott/us/en/corpnewsroom/diabetes-care/how-to-be-your-own-best-diabetes-care-advocate/mostread");
    }
	
}
