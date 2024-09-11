package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import com.abbott.aem.platform.common.components.models.CustomTable;

import org.mockito.Mock;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.day.cq.wcm.api.components.Component;
import org.mockito.MockitoAnnotations;

import java.util.List;

@ExtendWith(AemContextExtension.class)
class CustomTableImplTest {

	private final AemContext ctx = new AemContext();

	private ProxyComponentService proxyComponentService;
	private Component component;
	@Mock
	private List<Resource> customTableList;


	@BeforeEach
	void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(CustomTable.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CustomTableImplTest.json", "/content");
	}

	
	@Test
	final void testEnableLink() {
		final Boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnableLink();
		assertEquals(expected, actual);
	}

	@Test
	final void testEnableDownloadButton() {
		final Boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnableDownloadButton();
		assertEquals(expected, actual);
	}

	@Test
	final void testDownloadDataSource() {
		final String expected = "/api/public/lookup/referencedata?referenceType=serviceslist";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getDownloadDataSource();
		assertEquals(expected, actual);
	}

	@Test
	final void testEnableSearch() {
		final Boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnableSearch();
		assertEquals(expected, actual);
		
	}
	
	@Test
	final void testSearchLabelText() {
		final String expected = "Search or Filter by Keyword";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getSearchLabelText();
		assertEquals(expected, actual);
		
	}
	@Test
	final void testNoTableDataFoundText() {
		final String expected = "noTableDataFoundText";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getNoTableDataFoundText();
		assertEquals(expected, actual);

	}
	
	
	@Test
	final void testTableRowCount() {
		final String expected = "12";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getTableRowCount();
		assertEquals(expected, actual);
		
	}
	
	@Test
	final void testEnablePagination() {
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnablePagination();
		assertEquals(expected, actual);
	}
	
	@Test
	final void testEnablePrimaryButton() {
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnablePrimaryButton();
		assertEquals(expected, actual);
	}
	
	@Test
	final void testEditTableRowResult() {
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEditTableRowResult();
		assertEquals(expected, actual);
	}
	
	@Test
	final void testDeleteTableRowResult() {
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getDeleteTableRowResult();
		assertEquals(expected, actual);
	}
	
	@Test
	final void testColumnKey() {
		final String expected = "email";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getColumnKey();
		assertEquals(expected, actual);
		
	}
	
	@Test
	final void testColumnLabel() {
		final String expected = "Email ID";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getColumnLabel();
		assertEquals(expected, actual);
		
	}
	
	 @Test
		final void testInvalidCoulumnKeyText() {
			final String expected = "The input field authored is incorrect. Please re-author the same.";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getInvalidCoulumnKeyText();
			assertEquals(expected, actual);
		}
		
	 @Test
		final void testJsonPath() {
		 final String expected = "/content/dam/assetpath.json";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getJsonPath();
			assertEquals(expected, actual);
		}
	 
	 @Test
		final void testDataSourceType() {
			final String expected = "jsonDataSource";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getDataSourceType();
			assertEquals(expected, actual);
		}
	 
	 @Test
		final void testTableDataSource() {
			final String expected = "/api/private/products";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getTableDataSource();
			assertEquals(expected, actual);
		}
	 
	 @Test
		final void testEnableColFilter(){
		 final boolean expected = false;
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			Boolean actual = customTable.getEnableColFilter();
			assertEquals(expected, actual);
		}
	 
	 @Test
		final void testFilterLabelText() {
			final String expected = "All Products";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getFilterLabelText();
			assertEquals(expected, actual);
		}

	@Test
		final void testEnableRangeFilter(){
		 final boolean expected = false;
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			Boolean actual = customTable.getEnableRangeFilter();
			assertEquals(expected, actual);
	}

	@Test
		final void testRangeFilterLabelText(){
		 final String expected = "Date Published";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getRangeFilterLabelText();
			assertEquals(expected, actual);
		}

	@Test
		final void testRangeFilterType(){
		 final String expected = "field";
			ctx.currentResource("/content/table");
			CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
			String actual = customTable.getRangeFilterType();
			assertEquals(expected, actual);
		}

	@Test
	final void testEnableHiddenColFilter(){
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnableHiddenColFilter();
		assertEquals(expected, actual);
	}

	@Test
	final void testEnableReset(){
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnableReset();
		assertEquals(expected, actual);
	}

	@Test
	final void testResetText() {
		final String expected = "Reset";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getResetText();
		assertEquals(expected, actual);
	}

	@Test
	final void testMinRangeLabelText() {
		final String expected = "Minimum Range";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getMinRangeLabelText();
		assertEquals(expected, actual);
	}

	@Test
	final void testMaxRangeLabelText() {
		final String expected = "Maximum Range";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getMaxRangeLabelText();
		assertEquals(expected, actual);
	}

	@Test
	final void testCloseText() {
		final String expected = "Close";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getCloseText();
		assertEquals(expected, actual);
	}



	@Test
	void testGetUpdateCreatedRow() {
		final String expected = "check";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getUpdateCreatedRow();
		assertEquals(expected, actual);

	}

	@Test
	void testGetUpdateRequest() {
		final String expected = "check";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getUpdateRequest();
		assertEquals(expected, actual);
	}

	@Test
	final void testEnableBulkSelect(){
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getEnableBulkSelect();
		assertEquals(expected, actual);
	}
	@Test
	final void testBulkSelectLabelText() {
		final String expected = "Mark All as Read";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getBulkSelectLabelText();
		assertEquals(expected, actual);
	}

	@Test
	final void testDisableDefaultSorting(){
		final boolean expected = false;
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		Boolean actual = customTable.getDisableDefaultSorting();
		assertEquals(expected, actual);
	}

	@Test
	void testGetUpdateResponse() {
		final String expected = "check";
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		String actual = customTable.getUpdateResponse();
		assertEquals(expected, actual);
	}
	@Test
	final void testIncrementColIndex() {
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		customTable.incrementColIndex();
		assertEquals(2, customTable.getColIndex());
	}

	@Test
	final void testIncrementColIndexForRangeFilter() {
		ctx.currentResource("/content/table");
		CustomTable customTable = ctx.request().adaptTo(CustomTable.class);
		customTable.incrementColIndexForRangeFilter();
		assertEquals(2, customTable.getRangeFilterColIndex());
	}

	@Test
	final void testCustomTableKeyValue() {
		ctx.currentResource("/content/table");
		CustomTableImpl customTableImpl = (CustomTableImpl) ctx.request().adaptTo(CustomTable.class);
		customTableImpl.customTableKeyValue();
		assertEquals("/api/private/products", customTableImpl.getTableDataSource());
		assertEquals("POST", customTableImpl.getEslDataSourceMethodAction());
	}

	@Test
	void TestGetTableColumnlist() {
		MockitoAnnotations.initMocks(this);
		CustomTableImpl customTableImpl = new CustomTableImpl();
		customTableImpl.tableColumnlist = customTableList;
		List<Resource> actualSectionItems = customTableImpl.getTableColumnlist();
		assertEquals(customTableList, actualSectionItems);
	}

}
