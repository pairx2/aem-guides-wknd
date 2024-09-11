package com.abbott.aem.an.division.core.components.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.an.division.core.models.dynamicproduct.Product;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.utils.Utils;
import com.adobe.cq.wcm.core.components.models.Component;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { DynamicProductDetail.class }, resourceType = {
		DynamicProductDetail.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class DynamicProductDetail {

	public static final String RESOURCE_TYPE = "an/division/components/content/dynamic-product-detail";
	public static final String NOT_APPLICABLE = "Not Applicable";

	@Self
	private SlingHttpServletRequest request;

	@OSGiService
	private PIMConfigurationService pimConfigs;

	@SlingObject
	private ResourceResolver resourceResolver;

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String productStaticArea;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String productLocatorLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String productLocatorUrl;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String downloadGuideLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String downloadGuideCss;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String contactRepLabel;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String contactRepUrl;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String contactMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String disclaimerMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String addProductInformationMarkup;

	@ChildResource
	@Setter(AccessLevel.NONE)
	private List<TabInformation> tabInformation;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String institutionalMessage;

	@Inject
	private String productId;

	@Inject
	private String defaultFormulationCode;

	public Product getProduct() {		
		Utils objUtils = new Utils();
		return objUtils.getProductFromPIM(this.productId, pimConfigs);
	}

}
