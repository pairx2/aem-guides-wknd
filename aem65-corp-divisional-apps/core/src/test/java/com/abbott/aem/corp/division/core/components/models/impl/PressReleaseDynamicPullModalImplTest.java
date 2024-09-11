package com.abbott.aem.corp.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Iterator;

import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.script.Bindings;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.osgi.service.component.annotations.Reference;

import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPull;
import com.abbott.aem.corp.division.core.components.models.PressReleaseDynamicPullModal;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class PressReleaseDynamicPullModalImplTest {
	
	private final AemContext ctx = new AemContext();
	PressReleaseDynamicPullModal pressReleaseDynamicPullModal;
	
	/*
	 * @Mock PageManager pageManager;
	 */
	  @Mock
	  Page page;
	 
	
	@Mock
	ResourceResolver resourceResolver;
	
	 
	@Reference
	ResourceResolverFactory resourceResolverFactory;
	
	@Mock
	Iterator<Resource> countriesList;

	@Mock
	Resource countryResource;
	
	@Mock
	Resource childResource;
	
	@Mock
	Iterator<Page> pressPage;
	
	@Mock
    Resource resource;
	
	@Mock
    Resource pageResource;
	
	@Mock
	Page childPage, parentPage;

	String path = "/content/corp/abbott/latam/es/media-center/press-releases";
	
	@BeforeEach
	public void setUp() throws Exception {
		
		MockitoAnnotations.initMocks(this);
		ctx.addModelsForClasses(PressReleaseDynamicPullModalImpl.class);
		ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
		ctx.currentResource("/content/pressRelease");
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases");
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-1");
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-2");
	    Bindings bindings = Mockito.mock(Bindings.class);
	    PageManager pageManager = Mockito.mock(PageManager.class);
	    Mockito.lenient().when(bindings.get("pageManager")).thenReturn(pageManager);
	    Mockito.lenient().when(pageManager.getPage(Mockito.anyString())).thenReturn(page);
	    Mockito.lenient().when(page.listChildren()).thenReturn(pressPage);
        Mockito.lenient().when(pressPage.hasNext()).thenReturn(true);
        Mockito.lenient().when(pressPage.next()).thenReturn(childPage);
		pressReleaseDynamicPullModal = ctx.request().adaptTo(PressReleaseDynamicPullModal.class);
	   
	}
	
	@Test
    void testGetInitialCount() {
        final String initialCountExpected = "0";
        final AemContext ctx1 = new AemContext();
        ctx1.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx1.currentResource("/content/pressRelease");
		pressReleaseDynamicPullModal = ctx1.request().adaptTo(PressReleaseDynamicPullModal.class);
        String initialCountActual = pressReleaseDynamicPullModal.getInitialCount();
        assertEquals(initialCountExpected, initialCountActual);
    }
	
	@Test
    void testGetTotalResults() {
        final String totalResultsExpected = "2";
        final AemContext ctx2 = new AemContext();
        ctx2.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx2.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx2.request().adaptTo(PressReleaseDynamicPullModal.class);
        String totalResultsActual = pressReleaseDynamicPullModal.getTotalResults();
        assertEquals(totalResultsExpected, totalResultsActual);
    }
	
	@Test
    void testGetPressReleaseRootPath() {
        final String pressReleasePathExpected = "/content/corp/abbott/latam/es/media-center/press-releases";
        final AemContext ctx3 = new AemContext();
        ctx3.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx3.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx3.request().adaptTo(PressReleaseDynamicPullModal.class);
        String pressReleasePathActual = pressReleaseDynamicPullModal.getPressReleaseRootPath();
        assertEquals(pressReleasePathExpected, pressReleasePathActual);
    }
	
	@Test
    void testGetErrorMsg() {
        final String errorMsgExpected = "Zero results";
        final AemContext ctx4 = new AemContext();
        ctx4.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx4.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx4.request().adaptTo(PressReleaseDynamicPullModal.class);
        String errorMsgActual = pressReleaseDynamicPullModal.getErrorMsg();
        assertEquals(errorMsgExpected, errorMsgActual);
    }
	
	@Test
    void testGetShowMoreText() {
        final String showMoreTextExpected = "ShowMore";
        final AemContext ctx4 = new AemContext();
        ctx4.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx4.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx4.request().adaptTo(PressReleaseDynamicPullModal.class);
        String showMoreTextActual = pressReleaseDynamicPullModal.getShowMoreText();
        assertEquals(showMoreTextExpected, showMoreTextActual);
    }
	
	@Test
    void testGetPaginationText() {
        final String paginationTextExpected = "Showing";
        final AemContext ctx5 = new AemContext();
        ctx5.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx5.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx5.request().adaptTo(PressReleaseDynamicPullModal.class);
        String paginationTextActual = pressReleaseDynamicPullModal.getPaginationText();
        assertEquals(paginationTextExpected, paginationTextActual);
    }
	
	@Test
    void testSortListByResultCount() {
		List<PressReleaseDynamicPull> pressPages = new ArrayList<PressReleaseDynamicPull>();
		PressReleaseDynamicPull obj = new PressReleaseDynamicPullImpl();
		pressPages.add(obj);
		pressPages.add(obj);
		pressPages.add(obj);
		PressReleaseDynamicPullModalImpl model = new PressReleaseDynamicPullModalImpl();
		model.sortListByResultCount(pressPages);
		model.sortListByResult(pressPages);
    }
	@Test
    void testSortListByResultCountZero() {
		List<PressReleaseDynamicPull> pressPages = new ArrayList<PressReleaseDynamicPull>();
		PressReleaseDynamicPull obj = new PressReleaseDynamicPullImpl();
		PressReleaseDynamicPullModalImpl model = new PressReleaseDynamicPullModalImpl();
		model.sortListByResultCount(pressPages);
    }
	
	@Test
    void testGetDisplayType() {
        final String displayTypeExpected = "executiveteam";
        final AemContext ctx6 = new AemContext();
        ctx6.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImplExec.json", "/content");
        ctx6.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx6.request().adaptTo(PressReleaseDynamicPullModal.class);
        String displayTypeActual = pressReleaseDynamicPullModal.getDisplayType();
        assertEquals(displayTypeExpected, displayTypeActual);
    }
	
	@Test
    void testPreparePressPageList() {
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-1");
		ctx.create().page("/content/corp/abbott/latam/es/media-center/press-releases/pre-release-2");
	    Bindings bindings = Mockito.mock(Bindings.class);
	    PageManager pageManager = Mockito.mock(PageManager.class);
	    Mockito.lenient().when(bindings.get("pageManager")).thenReturn(pageManager);
	    Mockito.lenient().when(pageManager.getPage(Mockito.anyString())).thenReturn(page);
	    Mockito.lenient().when(page.listChildren()).thenReturn(pressPage);
        Mockito.lenient().when(pressPage.hasNext()).thenReturn(true);
        Mockito.lenient().when(pressPage.next()).thenReturn(childPage);
			
      }
	
	@Test
    void testViewAllLink() {
        final AemContext ctx = new AemContext();
        ctx.load().json("/com/abbott/aem/corp/division/core/components/models/impl/PressReleaseDynamicPullModalImpl.json", "/content");
        ctx.currentResource("/content/pressRelease");
        pressReleaseDynamicPullModal = ctx.request().adaptTo(PressReleaseDynamicPullModal.class);
        assertNotNull(pressReleaseDynamicPullModal.getViewAllLink());
        assertNotNull(pressReleaseDynamicPullModal.getSeeAllText());
        assertNotNull(pressReleaseDynamicPullModal.getReadMore());
    }
	

}
