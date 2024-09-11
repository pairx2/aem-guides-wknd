package com.abbott.aem.an.similac.core.models;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.an.similac.core.beans.ProductComponentBean;
import com.abbott.aem.an.similac.core.beans.ProductComponentBean.DropDownInfo;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class SearchModelTest {

	private static final String CONTENT_PATH = "/content";
	private static final String OPTION_VALUE = "optionValue";
	private static final String SEARCH_LANDING_JSON = "/com/abbott/aem/an/similac/core/models/search-landing.json";
	private static final String SORT_LABEL = "sortLabel";
	private static final String FILTER_OPTION_LABEL = "filterOptionLabel";
	private static final String OPTION_VALUE_TEXT = "Option-Value-Text";

	private SearchModel SearchModelObj;
	private AemContext context;

	@InjectMocks
	private SearchModel searchModel = new SearchModel();
	
	@InjectMocks
	private ProductComponentModel productComponentModelAlt = new ProductComponentModel();

	@Mock
	private Iterable<Resource> childResources;
	
	@Mock
	private Iterable<Resource> childResources1;
	
	@Mock
	private Iterable<Resource> grandChildResources;

	@Mock
	private Resource resource;

	@Mock
	private Node node;
	
	@Mock
	private Node nodeVal;
	
	@Mock
	private Node child;
	
	@Mock
	private Node childNode;
	
	@Mock
	private Node childNodeVal;
	
	@Mock
	private ValueMap componentProp;
	
	@Mock
	private Resource filters;
	
	@Mock
	private NodeIterator nodeIterator;
	
	@Mock
	private NodeIterator nodeItr;
	
	@Mock
	private NodeIterator childNodeItr;

	@Mock
	private Property sortOptionVal;
	
	@Mock
	private Property attributeCode;
	
	@Mock
	private Value attributeCodeText;
	
	@Mock
	private Property filterOptionLabel;
	
	@Mock
	private Value filterOptionLabelText;

	@Mock
	private Value optionValueText;

	@Mock
	private Property sortLabelVal;

	@Mock
	private Value labelValueText;

	@BeforeEach
	void setUp() {
		context.load().json(SEARCH_LANDING_JSON, CONTENT_PATH);
		context.addModelsForClasses(SearchModel.class);
	}

	@Test
	final void testGetResourceValueForSource() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(OPTION_VALUE)).thenReturn(true);
		Mockito.when(node.hasProperty(SORT_LABEL)).thenReturn(true);
		Mockito.when(node.getProperty(OPTION_VALUE)).thenReturn(sortOptionVal);
		Mockito.when(sortOptionVal.getValue()).thenReturn(optionValueText);
		Mockito.when(optionValueText.getString()).thenReturn(OPTION_VALUE_TEXT);
		Mockito.when(node.getProperty(SORT_LABEL)).thenReturn(sortLabelVal);
		Mockito.when(sortLabelVal.getValue()).thenReturn(labelValueText);
		Mockito.when(labelValueText.getString()).thenReturn("Label-Value");
		productComponentModelAlt.getResourceValue(resource);
		Assertions.assertNotNull(productComponentModelAlt.getResourceValue(resource));
	}

	private void resourceValueValidationMocking() throws RepositoryException {
		Mockito.lenient().when(resource.getChildren()).thenReturn(childResources);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(resource.adaptTo(ValueMap.class)).thenReturn(componentProp);
		Mockito.lenient().when(node.hasNode(Mockito.anyString())).thenReturn(true);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
	}
		
	private void resourceArrayValueValidationMocking() throws RepositoryException {
		Mockito.lenient().when(resource.getChildren()).thenReturn(grandChildResources);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(nodeVal);
		Mockito.lenient().when(resource.adaptTo(ValueMap.class)).thenReturn(componentProp);		
		Mockito.lenient().when(nodeVal.hasNode(Mockito.anyString())).thenReturn(true);
		Mockito.lenient().when(nodeVal.getNodes()).thenReturn(nodeItr);
		Mockito.lenient().when(nodeItr.hasNext()).thenReturn(true,false);
		Mockito.lenient().when(nodeItr.nextNode()).thenReturn(child);				
		Mockito.lenient().when(child.getNodes()).thenReturn(childNodeItr);
		Mockito.lenient().when(childNodeItr.hasNext()).thenReturn(true,false);
		Mockito.lenient().when(childNodeItr.nextNode()).thenReturn(childNodeVal);
	}

	@Test
	final void testGetResourceValueForSource2() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(OPTION_VALUE)).thenReturn(true);
		Mockito.when(node.hasProperty(SORT_LABEL)).thenReturn(false);
		Mockito.when(node.getProperty(OPTION_VALUE)).thenReturn(sortOptionVal);
		Mockito.when(sortOptionVal.getValue()).thenReturn(optionValueText);
		Mockito.when(optionValueText.getString()).thenReturn(OPTION_VALUE_TEXT);

		productComponentModelAlt.getResourceValue(resource);
		Assertions.assertNotNull(productComponentModelAlt.getResourceValue(resource));
	}

	@Test
	final void testGetResourceArray() throws RepositoryException {		
		resourceArrayValueValidationMocking();
		Mockito.when(childNodeVal.hasProperty(OPTION_VALUE)).thenReturn(true);
		Mockito.when(childNodeVal.getProperty(OPTION_VALUE)).thenReturn(sortOptionVal);
		Mockito.when(sortOptionVal.getValue()).thenReturn(optionValueText);
		Mockito.when(optionValueText.getString()).thenReturn(OPTION_VALUE_TEXT);	
		Mockito.when(childNodeVal.hasProperty(FILTER_OPTION_LABEL)).thenReturn(true);
		Mockito.when(childNodeVal.getProperty(FILTER_OPTION_LABEL)).thenReturn(filterOptionLabel);
		Mockito.when(filterOptionLabel.getValue()).thenReturn(filterOptionLabelText);
		Mockito.when(filterOptionLabelText.getString()).thenReturn("filter-Value-Text");
		searchModel.getResourceArray(nodeVal);
		Assertions.assertNotNull(searchModel.getResourceArray(nodeVal).toString());
	}
		
	@Test
	final void testEmptyGetResourceValueForSource3() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(OPTION_VALUE)).thenReturn(false);
		productComponentModelAlt.getResourceValue(resource);
		Assertions.assertEquals(productComponentModelAlt.getResourceValue(resource).toString(), "[]");
	}

	@Test
	final void testSearchJson() {
		context.currentResource(
				context.resourceResolver().getResource("/content/search/jcr:content/search_landing"));
		searchModel = context.request().adaptTo(SearchModel.class);
		ProductComponentBean bean = searchModel.getbean();
		validateSearchDetails(bean);
		validateDropDownInfo(bean);
		Assertions.assertNotNull(searchModel.getSearchJson());
		Assertions.assertNotNull(searchModel.getComponentProp());
	} 

	@Test
	final void testSearchJsonEmptyResource() {
		context.currentResource(
				context.resourceResolver().getResource("/content/emptyResource/jcr:content/search-landing"));
		SearchModelObj = context.request().adaptTo(SearchModel.class);
		ProductComponentBean ProductComponentBean = SearchModelObj.getbean();
		Assertions.assertNull(ProductComponentBean);
		Assertions.assertNull(SearchModelObj.getSearchJson());
		Assertions.assertNull(SearchModelObj.getComponentProp());
		Assertions.assertNull(SearchModelObj.getNode());
	}

	@Test
	final void testSearchJsonEmptyNode() {
		context.currentResource(
				context.resourceResolver().getResource("/content/emptyNodeProducts/jcr:content/search_landing"));
		SearchModelObj = context.request().adaptTo(SearchModel.class);
		
		ProductComponentBean ProductComponentBean = SearchModelObj.getbean();
		ProductComponentBean.DropDownInfo ddInfo = ProductComponentBean.getPageSize();
		ProductComponentBean.DropDownInfo ddInfoSort = ProductComponentBean.getSortBy();

		Assertions.assertNull(ddInfo.getOptions());
		Assertions.assertNull(ddInfoSort.getOptions());
	}

	private void validateSearchDetails(ProductComponentBean bean) {
		Assertions.assertNotNull(bean);
		Assertions.assertNotNull(bean.getSearchLabel());
		Assertions.assertNotNull(bean.getSearchResultsLabel());
		Assertions.assertNotNull(bean.getClearAllLabel());
		Assertions.assertNotNull(bean.getFiltersLabel());
		Assertions.assertNotNull(bean.getNoResultLabel());
		Assertions.assertNotNull(bean.getResetLabel());
		Assertions.assertNotNull(bean.getResultsLabel());
		Assertions.assertNotNull(bean.getShowLessLabel());
		Assertions.assertNotNull(bean.getShowMoreLabel());
		Assertions.assertNotNull(bean.getPageSize());
	}

	private void validateDropDownInfo(ProductComponentBean dropdownInfo) {
		ProductComponentBean.DropDownInfo ddInfo = dropdownInfo.getPageSize();
		Assertions.assertNotNull(dropdownInfo.getPageSize());
		Assertions.assertNotNull(ddInfo.getDefaultLabel());
		Assertions.assertNotNull(ddInfo.getDefaultValue());
		Assertions.assertNotNull(ddInfo.getLabel());
		Assertions.assertNotNull(ddInfo.getOptions());		
	}
}
