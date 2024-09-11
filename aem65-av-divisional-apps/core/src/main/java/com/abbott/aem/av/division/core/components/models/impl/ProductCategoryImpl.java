package com.abbott.aem.av.division.core.components.models.impl;


import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.abbott.aem.av.division.core.components.models.ProductCategory;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ProductCategory.class,
		ComponentExporter.class }, resourceType = {
				ProductCategoryImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class ProductCategoryImpl implements ProductCategory {

	public static final String RESOURCE_TYPE = "av/division/components/content/productcategory";
	
	
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;
	
	
	 @Inject 
	 private APILookupService config;
	 
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String showMoreDesktop;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String showMoreTablet;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String showMoreMobile;
	
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String showMoreDesktopSubCategory;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String showMoreTabletSubCategory;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String showMoreMobileSubCategory;
	
	
	@Setter(AccessLevel.NONE)
	private String eslEndPoint;
	

	 @PostConstruct
	 protected void init() { eslEndPoint = config.getAPIEndpointForKey("siteSearch"); }
	 

	 @Override 
	 public String getEslEndPoint() { return eslEndPoint; }
	 
}
