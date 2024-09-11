package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.platform.common.components.models.SearchResults;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(MockitoExtension.class)
@ExtendWith(AemContextExtension.class)
class SearchResultsImplTest {

	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();

	@InjectMocks
	SearchResultsImpl searchResultsmock;

	@Spy
	private APILookupService apiLookupService;
	private ProxyComponentService proxyComponentService;
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {

		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(SearchResultsImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SearchResultsImplTest.json", "/content");
		
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.addModelsForClasses(SearchResultsImpl.class);
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/SearchResultsImplTest2.json", "/content");
	}

	@Test
	void testGetSearchResultsHeading() {
		final String expected = "Search Results";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getSearchResultsHeading();
		assertEquals(expected, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getSearchResultsHeading();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}

	@Test
	void testGetNoSearchResultsText() {
		final String expected = "No Search Results Found";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getNoSearchResultsText();
		assertEquals(expected, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getNoSearchResultsText();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}

	@Test
	void testGetSearchResultsPerPage() {
		final String expected = "10";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getSearchResultsPerPage();
		assertEquals(expected, actual);
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getSearchResultsPerPage();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
		
		assertEquals("searchType", searchResults.getSearchType());
		assertEquals(true, searchResults.isShowResultCount());
		assertEquals(true, searchResults.isEnableStickyFilter());
		
	}
	@Test
	void testGetSearchType() {
		final String expected = "searchType";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getSearchType();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getSearchType();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}

	@Test
	void testGetSearchEndPtUrl() {
		apiLookupService = Mockito.mock(APILookupService.class);
		//doReturn("search").when(apiLookupService).getAPIEndpointForKey(any());
		String actual = searchResultsmock.getSearchEndPtUrl();
		assertEquals(null, actual);
		assert StringUtils.isNotBlank(searchResultsmock.toString());
	}
	
	@Test
	void testEnableStaticContent() {
		final String expected = "true";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.isEnableStaticContent();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "false";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.isEnableStaticContent();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	
	@Test
	void testGetAscendingLabel() {
		final String expected = "Ascending Label";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getAscendingLabel();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getAscendingLabel();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	@Test
	void testGetBestMatchLabel() {
		final String expected = "Match Label";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getBestMatchLabel();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getBestMatchLabel();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	@Test
	void testGetDefaultSortingOrder() {
		final String expected = "Sorting Order";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getDefaultSortingOrder();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getDefaultSortingOrder();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	@Test
	void testGetDescendingLabel() {
		final String expected = "Descending Label";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getDescendingLabel();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getDescendingLabel();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	@Test
	void testOnSuccessSearch() {
		final String expected = "Success";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getOnSuccess();
		assertEquals(expected, actual);
			
	}
	
	@Test
	void testGetSortFiltersProperties() {	
		ctx.currentResource("/content/searchresults");
		assertNotNull(searchResultsmock.getSortFiltersProperties());			
	}
	
	@Test
	void testGetSearchFiltersProperties() {	
		ctx.currentResource("/content/searchresults");
		assertNotNull(searchResultsmock.getSearchFiltersProperties());			
	}
	
	@Test
	void testGetShowTitle() {
		final String expected = "Test Results";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getShowTitle();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getShowTitle();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	@Test
	void testGetPageTitle() {
		final String expected = "Page Title";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getPageTitle();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getPageTitle();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}
	
	@Test
	void testGetSearchPredictive() {
		final String expected = "Search Predictive";
		ctx.currentResource("/content/searchresults");
		SearchResults searchResults = ctx.request().adaptTo(SearchResults.class);
		String actual = searchResults.getSearchPredictive();
		assertEquals(expected, actual);	
		
		final String EXPECTED_WHEN_NULL = "";
		ctx2.currentResource("/content/searchResultsEmpty");
		SearchResults SearchResults2 = ctx2.request().adaptTo(SearchResults.class);
		String actual2 = SearchResults2.getSearchPredictive();
		assertEquals(EXPECTED_WHEN_NULL, actual2);
	}	

}