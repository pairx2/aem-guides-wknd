package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.corp.division.core.components.models.MostReadArticlesModal;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import javax.script.Bindings;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class MostReadArticlesModalImplTest {
	
	private final AemContext ctx = new AemContext();
	
	MostReadArticlesModal mostReadArticlesModal;
	
	@Mock
	private PageManager pageManager;
	
	@Mock
	Page page, parentPage;
	
	@Mock
	private ResourceResolver resourceResolver;
	
	@BeforeEach
	public void setUp() throws Exception {
				
		ctx.addModelsForClasses(MostReadArticlesModalImpl.class);
		page = mock(Page.class);
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/MostReadArticlesModalImplTest.json", "/content/corp/abbott/latam/es/media-center/press-releases/pre-release-1");
		ctx.currentResource("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-1");
		Page parentArticlePage = ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases");
		String pageURL = "/content/corp/abbott/latam/es/media-center/press-releases/pre-release-2";
		Page empPage = ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-2");
	    Bindings bindings = Mockito.mock(Bindings.class);
	    PageManager pageManager = Mockito.mock(PageManager.class);
	    Resource resoure = Mockito.mock(Resource.class);
	    Mockito.lenient().when(bindings.get("pageManager")).thenReturn(pageManager);
		Mockito.lenient().when(bindings.get("currentResource")).thenReturn(resoure);
		mostReadArticlesModal = ctx.request().adaptTo(MostReadArticlesModal.class);
	}

	@Test
    void testGetTitle() {	
        final String titleExpected = "10 Tips to Manage Diabetes";
        String titleActual = mostReadArticlesModal.getArticleTitle();
        assertEquals(titleExpected, titleActual);
    }
	
	@Test
    void testGetDescription() {
        final String descriptionExpected = "Diabetes doesn't have to get in the way of living a full life";
        String descriptionActual = mostReadArticlesModal.getArticleDescription();
        assertEquals(descriptionExpected, descriptionActual);
    }
	
	@Test
    void testGetArticleDate() {
        final String articleDateExpected = "Nov. 13, 2018";
        String articleDateActual = mostReadArticlesModal.getArticleDate();
        System.out.println("articleDateActual "+articleDateActual);
        assertEquals(articleDateExpected, articleDateActual);
    }
	
	@Test
    void testGetArticleImage() {
        final String articleImgExpected = "/content/dam/corp/abbott/en-us/hub/436366.jpg";
        String articleImgActual = mostReadArticlesModal.getArticleImage();
        assertEquals(articleImgExpected, articleImgActual);
    }
		
}
