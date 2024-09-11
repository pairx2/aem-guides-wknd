package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.EmailPage;
import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@EqualsAndHashCode(callSuper = false)
@ToString
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
		adapters = { EmailPage.class, ContainerExporter.class },
		resourceType = EmailPageImpl.RESOURCE_TYPE,
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EmailPageImpl extends PlatformPageImpl implements EmailPage {

	/** The Constant ASSET_PREFIX_DOMAIN */
	protected static final String ASSET_PREFIX_DOMAIN = "assetPrefixDomain";
	
	protected static final String RESOURCE_TYPE = "abbott-platform/components/structure/emailpage/v1/emailpage";

	@ValueMapValue
	@Getter
	private String align;

	@Getter
	@ValueMapValue
	private String assetPrefixDomain;

	@PostConstruct
	protected void init() {
		super.init();
		if (null != currentPage) {
			assetPrefixDomain = this.setInheritedPageValues(ASSET_PREFIX_DOMAIN, currentPage.getContentResource());
		}
	}
}