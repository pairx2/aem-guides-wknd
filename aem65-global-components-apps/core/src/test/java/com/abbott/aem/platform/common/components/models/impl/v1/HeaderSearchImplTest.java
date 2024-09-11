package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;


import com.abbott.aem.platform.common.components.models.HeaderSearch;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The Class HeaderSearchImplTest.
 */
@ExtendWith(AemContextExtension.class)
class HeaderSearchImplTest {

	/**
	 * The ctx.
	 */
	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();

	/**
	 * The component.
	 */
	@InjectMocks
	private Component modeComponent;
	

	/**
	 * The api lookup service.
	 */
	@Mock
	private APILookupService apiLookupService;
	
	@Mock
	private HeaderSearchImpl headerSearchImpl;

	/**
	 * The current page.
	 */
	private Page currentPage;

	private ProxyComponentService proxyComponentService;
	private com.day.cq.wcm.api.components.Component component;

	public static final String SUGGEST_API_KEY = "querySuggest";
	public static final String SECURED_SITE_SEARCH = "securedSiteSearch";
	public static final String SECURED_QUERY_SUGGEST = "securedQuerySuggest";
	/**
	 * Sets the up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(com.day.cq.wcm.api.components.Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(HeaderSearchImpl.class);
		currentPage = Mockito.mock(Page.class);

		ctx.currentPage(currentPage);

		
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HeaderSearchImplTest.json", "/content");
		apiLookupService = Mockito.mock(APILookupService.class);
		ctx.registerService(APILookupService.class, apiLookupService);
		
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/HeaderSearchImplTest2.json", "/content");
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.addModelsForClasses(HeaderSearchImpl.class);
		ctx2.registerService(APILookupService.class, apiLookupService);
		ctx2.currentPage(currentPage);
	}

	/**
	 * Test get search title.
	 */
	@Test
	void testGetSearchTitle() {
		final String EXPECTED = "Search Text";
		ctx.currentResource("/content/headersearch");
		HeaderSearch headerSearch = ctx.request().adaptTo(HeaderSearch.class);
		String actual = headerSearch.getSearchTitle();
		assertEquals(EXPECTED, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch headerSearch2 = ctx2.request().adaptTo(HeaderSearch.class);
		String actual2 = headerSearch2.getSearchTitle();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
		
	}

	/**
	 * Test get search icon.
	 */
	@Test
	void testGetSearchIcon() {
		final String EXPECTED = "abt-icon abt-icon-search";
		ctx.currentResource("/content/headersearch");
		HeaderSearch headerSearch = ctx.request().adaptTo(HeaderSearch.class);
		String actual = headerSearch.getSearchIcon();
		assertEquals(EXPECTED, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch headerSearch2 = ctx2.request().adaptTo(HeaderSearch.class);
		String actual2 = headerSearch2.getSearchIcon();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}

	/**
	 * Test get close icon.
	 */
	@Test
	void testGetCloseIcon() {
		final String EXPECTED = "abt-icon abt-icon-cancel";
		ctx.currentResource("/content/headersearch");
		HeaderSearch headerSearch = ctx.request().adaptTo(HeaderSearch.class);
		String actual = headerSearch.getCloseIcon();
		assertEquals(EXPECTED, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch headerSearch2 = ctx2.request().adaptTo(HeaderSearch.class);
		String actual2 = headerSearch2.getCloseIcon();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}

	/**
	 * Test get filters.
	 */
	@Test
	void testGetFilters() {
		ctx.currentResource("/content/headersearch");
		HeaderSearch filtersList = ctx.request().adaptTo(HeaderSearch.class);
		assertNotNull(filtersList.getFilters());
		assertEquals(2, filtersList.getFilters().size());
		assertEquals("filter1", filtersList.getFilters().get(0).getValueMap().get("fieldName"));
		assertEquals("value1", filtersList.getFilters().get(0).getValueMap().get("fieldValue"));
		
		final List<Object> EMPTY_LIST=Collections.emptyList();
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch filtersList2 = ctx2.request().adaptTo(HeaderSearch.class);
		assertEquals(EMPTY_LIST, filtersList2.getFilters());
		
	}

	/**
	 * Test get sort order.
	 */
	@Test
	void testGetSortOrder() {
		ctx.currentResource("/content/headersearch");
		HeaderSearch filtersList = ctx.request().adaptTo(HeaderSearch.class);
		assertNotNull(filtersList.getSortOrder());
		assertEquals(2, filtersList.getSortOrder().size());
		assertEquals("sortField1", filtersList.getSortOrder().get(0).getValueMap().get("sortFieldName"));
		assertEquals("asc", filtersList.getSortOrder().get(0).getValueMap().get("sortingOrder"));
		
		final List<Object> EMPTY_LIST=Collections.emptyList();
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch filtersList2 = ctx2.request().adaptTo(HeaderSearch.class);
		assertEquals(EMPTY_LIST, filtersList2.getSortOrder());
		
		
	}
	
    @Test
	void testGetEnablePredictiveSearch(){
    	final boolean EXPECTED = true;
    	ctx.currentResource("/content/headersearch");
    	HeaderSearch SearchHeader = ctx.request().adaptTo(HeaderSearch.class);
		Boolean actual = SearchHeader.getEnablePredictiveSearch();
		assertEquals(EXPECTED, actual);
		
				
		final boolean EXPECTED_WHEN_NULL = false;
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch headerSearch2 = ctx2.request().adaptTo(HeaderSearch.class);
		boolean actual2 = false;
		if(headerSearch2==null) {
			actual2=headerSearch2.getEnablePredictiveSearch();
			assertEquals(EXPECTED_WHEN_NULL, actual2);
		}
	} 

	/**
	 * Test get search results page.
	 */
	@Test
	void testGetSearchResultsPage() {
		Resource resource = ctx.currentResource("/content/headersearch");
		Mockito.lenient().when(currentPage.adaptTo(Resource.class)).thenReturn(resource);
		HeaderSearch headerSearch = ctx.request().adaptTo(HeaderSearch.class);
		String expected = "/content/bts/global-reference/master/en/home/organisms/search-results.html";
		assertEquals(expected, headerSearch.getSearchResultsPage());
	}

	/**
	 * Test get suggest end point url.
	 */
	
	@Test
	void testGetSuggestEndPointUrl() {
		HeaderSearchImpl headerSearchImpl = Mockito.mock(HeaderSearchImpl.class);	
		final String EXPECTED=apiLookupService.getAPIEndpointForKey(SUGGEST_API_KEY);
		String actual = headerSearchImpl.getSuggestEndPointUrl();
		assertEquals(EXPECTED, actual);
	}
	
	@Test
	void TestgetSecuredSiteSearch() {
		HeaderSearchImpl headerSearchImpl = Mockito.mock(HeaderSearchImpl.class);
		apiLookupService = Mockito.mock(APILookupService.class);
		final String EXPECTED=apiLookupService.getAPIEndpointForKey(SECURED_SITE_SEARCH);
		String actual = headerSearchImpl.getSuggestEndPointUrl();
		assertEquals(EXPECTED, actual);
	}
	
	
	/**
	 * Test get suggest Search Heading.
	 */
	@Test
	void testGetSearchHeading() {
		final String EXPECTED = "Heading";
		ctx.currentResource("/content/headersearch");
		HeaderSearch SearchHeader = ctx.request().adaptTo(HeaderSearch.class);
		String actual = SearchHeader.getSearchHeading();
		assertEquals(EXPECTED, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch headerSearch2 = ctx2.request().adaptTo(HeaderSearch.class);
		String actual2 = headerSearch2.getSearchHeading();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}

	/**
	 * Test get suggest Enable Search Reset.
	 */
	@Test
	void testGetEnableSearchReset() {
		final boolean EXPECTED = true;
		ctx.currentResource("/content/headersearch");
		HeaderSearch SearchHeader = ctx.request().adaptTo(HeaderSearch.class);
		Boolean actual = SearchHeader.getEnableSearchReset();
		assertEquals(EXPECTED, actual);		
		
		final boolean EXPECTED_WHEN_NULL = false;
		ctx2.currentResource("/content/headersearchEmpty");
		HeaderSearch headerSearch2 = ctx2.request().adaptTo(HeaderSearch.class);
		boolean actual2 = false;
		if(headerSearch2==null) {
			actual2=headerSearch2.getEnableSearchReset();
			assertEquals(EXPECTED_WHEN_NULL, actual2);
		}

	}
	
}
