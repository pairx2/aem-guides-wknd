package com.abbott.aem.bts.cybersecurity.components.model.impl;

import com.abbott.aem.bts.cybersecurity.components.model.CybersecurityPage;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.util.PageUtil;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@ToString
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { CybersecurityPage.class }, resourceType = {
		CybersecurityPageImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class CybersecurityPageImpl implements CybersecurityPage {

	private static final Logger log = LoggerFactory.getLogger(CybersecurityPageImpl.class);

	protected static final String RESOURCE_TYPE = "bts/cybersecurity/components/structure/page";

	@Inject
	private Resource resource;

	@SlingObject
	ResourceResolver resolver;

	@ValueMapValue
	@Getter
	private String signInPage;

	@ValueMapValue
	@Getter
	private String homePage;

	@ValueMapValue
	@Getter
	private String vsiPage;

	@ValueMapValue
	@Getter
	private String infoPage;
	
	@ValueMapValue
	@Getter
	private String productPage;

	@ValueMapValue
	@Getter
	private String productId;
	
	@OSGiService
	private APILookupService apiLookupService;
	
	protected static final String TABLE_BODY_PARAMS ="listUserPermission";


	protected static final String HOME_PAGE = "homePage";

	protected static final String SIGN_IN = "signIn";

	protected static final String VSI_PAGE = "vsiPage";

	protected static final String INFO_PAGE = "infoPage";
	
	protected static final String PRODUCT_PAGE = "productPage";

	protected static final String PRODUCT_ID = "productId";

	private String getProperty(String propertyName, Resource resource) {
		InheritanceValueMap ivm = new HierarchyNodeInheritanceValueMap(resource);
		String inheritedValueMyCustomProperty = ivm.getInherited(propertyName, String.class);
		if (StringUtils.isNotEmpty(inheritedValueMyCustomProperty)) {
			return inheritedValueMyCustomProperty;
		} else {
			return "";
		}

	}

	@Override
	public String getApiEndPoint() {
		return apiLookupService.getRequestEndpoint("");
	}
	
	@Override
	public String getTableBodyParams() {
		return TABLE_BODY_PARAMS;
	}

	@PostConstruct
	public void init() {
		if (null != resource) {
			PageUtil pageUtil = new PageUtil();
			Externalizer externalizer = resolver.adaptTo(Externalizer.class);
			signInPage = pageUtil.getExternalUrl(getProperty(SIGN_IN, resource), resolver, externalizer, false, false);
			log.debug("Sign In Pages URL---> {} ", signInPage);
			homePage = pageUtil.getExternalUrl(getProperty(HOME_PAGE, resource), resolver, externalizer, false, false);
			vsiPage = pageUtil.getExternalUrl(getProperty(VSI_PAGE, resource), resolver, externalizer, false, false);
			infoPage = pageUtil.getExternalUrl(getProperty(INFO_PAGE, resource), resolver, externalizer, false, false);
			productPage = pageUtil.getExternalUrl(getProperty(PRODUCT_PAGE, resource), resolver, externalizer, false, false);

			log.debug("infoPage Page URL--->  {} ", infoPage);
			productId = pageUtil.getExternalUrl(getProperty(PRODUCT_ID, resource), resolver, externalizer, false, false);

		}
		else{
			log.debug("Resource is null.");
		}
	}
}
