package com.abbott.aem.an.similac.core.models;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import com.abbott.aem.an.similac.core.beans.ProductComponentBean;
import com.abbott.aem.an.similac.core.utils.ProductsConstants;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class ProductComponentModelTest {

	private static final String CATEGORY_VALUE = "categoryValue";
	private static final String CONTENT_PATH = "/content";
	private static final String OPTION_VALUE = "optionValue";
	private static final String PRODUCT_LANDING_JSON = "/com/abbott/aem/an/similac/core/models/product-landing.json";
	private static final String SORT_LABEL = "sortLabel";

	private ProductComponentModel productComponentModel;

	private AemContext context;

	@InjectMocks
	private ProductComponentModel productComponentModelAlt = new ProductComponentModel();

	@Mock
	private Iterable<Resource> childResources;

	@Mock
	private Resource resource;

	@Mock
	private Node node;

	@Mock
	private NodeIterator nodeIterator;

	@Mock
	private Property sortOptionVal;

	@Mock
	private Value optionValueText;

	@Mock
	private Property sortLabelVal;

	@Mock
	private Value labelValueText;

	@Mock
	private Property categoryVal;

	@Mock
	private Value categoryValText;

	@BeforeEach
	void setUp() {
		context.load().json(PRODUCT_LANDING_JSON, CONTENT_PATH);
		context.addModelsForClasses(ProductComponentModel.class);
	}

	@Test
	final void testGetResourceValueForSource() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(OPTION_VALUE)).thenReturn(true);
		Mockito.when(node.hasProperty(SORT_LABEL)).thenReturn(true);

		Mockito.when(node.getProperty(OPTION_VALUE)).thenReturn(sortOptionVal);
		Mockito.when(sortOptionVal.getValue()).thenReturn(optionValueText);
		Mockito.when(optionValueText.getString()).thenReturn("Option-Value-Text");
		Mockito.when(node.getProperty(SORT_LABEL)).thenReturn(sortLabelVal);
		Mockito.when(sortLabelVal.getValue()).thenReturn(labelValueText);
		Mockito.when(labelValueText.getString()).thenReturn("Label-Value");

		productComponentModelAlt.getResourceValue(resource);
		Assertions.assertNotNull(productComponentModelAlt.getResourceValue(resource));
	}

	private void resourceValueValidationMocking() throws RepositoryException {
		Mockito.lenient().when(resource.getChildren()).thenReturn(childResources);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.hasNode(Mockito.anyString())).thenReturn(true);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);

	}

	@Test
	final void testGetResourceValueForSource2() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(OPTION_VALUE)).thenReturn(true);
		Mockito.when(node.hasProperty(SORT_LABEL)).thenReturn(false);
		Mockito.when(node.getProperty(OPTION_VALUE)).thenReturn(sortOptionVal);
		Mockito.when(sortOptionVal.getValue()).thenReturn(optionValueText);
		Mockito.when(optionValueText.getString()).thenReturn("Option-Value-Text");

		productComponentModelAlt.getResourceValue(resource);
		Assertions.assertNotNull(productComponentModelAlt.getResourceValue(resource));
	}

	@Test
	final void testEmptyGetResourceValueForSource2() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(OPTION_VALUE)).thenReturn(false);
		productComponentModelAlt.getResourceValue(resource);
		Assertions.assertEquals(productComponentModelAlt.getResourceValue(resource).toString(), "[]");
	}

	@Test
	final void testGetResourceValueForSource3() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(CATEGORY_VALUE)).thenReturn(true);
		Mockito.when(node.getProperty(CATEGORY_VALUE)).thenReturn(categoryVal);
		Mockito.when(categoryVal.getValue()).thenReturn(categoryValText);
		Mockito.when(categoryValText.getString()).thenReturn("Category-Value-Text");

		productComponentModelAlt.getResourceList(resource,ProductsConstants.CATEGORY_TYPE_VAL);
		Assertions.assertNotNull(productComponentModelAlt.getResourceList(resource,ProductsConstants.CATEGORY_TYPE_VAL));
	}

	@Test
	final void testEmptyGetResourceValueForSource3() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(CATEGORY_VALUE)).thenReturn(false);
		productComponentModelAlt.getResourceList(resource,ProductsConstants.CATEGORY_TYPE_VAL);
		Assertions.assertEquals(productComponentModelAlt.getResourceList(resource,ProductsConstants.CATEGORY_TYPE_VAL).toString(), "[]");
	}

	@Test
	final void testProductJson() {
		context.currentResource(
				context.resourceResolver().getResource("/content/products/jcr:content/product-landing"));
		productComponentModel = context.request().adaptTo(ProductComponentModel.class);
		ProductComponentBean productComponentBean = productComponentModel.getProductBean();
		validateProductDetails(productComponentBean);
		validateDropDwonInfo(productComponentBean);
		validatePopUpInfo(productComponentBean);
		Assertions.assertNotNull(productComponentModel.getProductJson());
		Assertions.assertNotNull(productComponentModel.getComponentProp());

	}

	@Test
	final void testProductJsonEmptyResource() {
		context.currentResource(
				context.resourceResolver().getResource("/content/emptyResource/jcr:content/product-landing"));
		productComponentModel = context.request().adaptTo(ProductComponentModel.class);
		ProductComponentBean productComponentBean = productComponentModel.getProductBean();
		Assertions.assertNull(productComponentBean);
		Assertions.assertNull(productComponentModel.getProductJson());
		Assertions.assertNull(productComponentModel.getComponentProp());
		Assertions.assertNull(productComponentModel.getNode());

	}

	@Test
	final void testProductJsonEmptyNode() {
		context.currentResource(
				context.resourceResolver().getResource("/content/emptyNodeProducts/jcr:content/product-landing"));
		productComponentModel = context.request().adaptTo(ProductComponentModel.class);
		ProductComponentBean productComponentBean = productComponentModel.getProductBean();

		ProductComponentBean.DropDownInfo ddInfo = productComponentBean.getPageSize();
		ProductComponentBean.DropDownInfo ddInfoSort = productComponentBean.getSortBy();

		Assertions.assertNull(ddInfo.getOptions());
		Assertions.assertNull(ddInfoSort.getOptions());
	}

	private void validateProductDetails(ProductComponentBean productBean) {
		Assertions.assertNotNull(productBean);
		Assertions.assertNotNull(productBean);
		Assertions.assertNotNull(productBean.getCategoryId());
		Assertions.assertNotNull(productBean.getAddToCartLabel());
		Assertions.assertNotNull(productBean.getSearchLabel());
		Assertions.assertNotNull(productBean.getSearchResultsLabel());
		Assertions.assertNotNull(productBean.getBackOrderLabel());
		Assertions.assertNotNull(productBean.getCategoryId());
		Assertions.assertNotNull(productBean.getClearAllLabel());
		Assertions.assertNotNull(productBean.getFiltersLabel());
		Assertions.assertNotNull(productBean.getFindRetailerLabel());
		Assertions.assertNotNull(productBean.getNoResultLabel());
		Assertions.assertNotNull(productBean.getOutOfStockLabel());
		Assertions.assertNotNull(productBean.getResetLabel());
		Assertions.assertNotNull(productBean.getResultsLabel());
		Assertions.assertNotNull(productBean.getShowLessLabel());
		Assertions.assertNotNull(productBean.getShowMoreLabel());
		Assertions.assertNotNull(productBean.getImgRendition_319());
		Assertions.assertNotNull(productBean.getRetailerURL());
		Assertions.assertNotNull(productBean.getCallToOrderLabel());
		Assertions.assertNotNull(productBean.getLearnMoreLabel());
		Assertions.assertNotNull(productBean.getPageName());
		Assertions.assertNotNull(productBean.getPopUp());
		Assertions.assertNotNull(productBean.getRequiredMax());
		Assertions.assertNotNull(productBean.getRequiredMin());
		Assertions.assertNotNull(productBean.getReturnLabel());
		Assertions.assertNotNull(productBean.getSelectLabel());
		Assertions.assertNotNull(productBean.getRegularPriceLabel());
	}

	private void validateDropDwonInfo(ProductComponentBean dropdownInfo) {
		ProductComponentBean.DropDownInfo ddInfo = dropdownInfo.getPageSize();
		Assertions.assertNotNull(dropdownInfo.getPageSize());
		Assertions.assertNotNull(ddInfo.getDefaultLabel());
		Assertions.assertNotNull(ddInfo.getDefaultValue());
		Assertions.assertNotNull(ddInfo.getLabel());
		Assertions.assertNotNull(ddInfo.getOptions());
	}
	
	private void validatePopUpInfo(ProductComponentBean popUpInfo) {
		ProductComponentBean.PopUpInfo popupInfo = popUpInfo.getPopUp();
		Assertions.assertNotNull(popupInfo.getConfirm());
		Assertions.assertNotNull(popupInfo.getCancel());
		Assertions.assertNotNull(popupInfo.getEachPrice());
		Assertions.assertNotNull(popupInfo.getPriceHelperText());
		Assertions.assertNotNull(popupInfo.getTitle());
	}

}