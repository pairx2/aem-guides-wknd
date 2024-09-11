package com.abbott.aem.platform.common.components.models.impl.v1;


import com.abbott.aem.platform.common.components.models.MaskedContainer;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.inject.Inject;

@EqualsAndHashCode
@ToString
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { MaskedContainer.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
	   resourceType = MaskedContainerImpl.RESOURCE_TYPE)
public class MaskedContainerImpl implements MaskedContainer {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/maskedcontainer/v1/maskedcontainer";

	@Inject
	private Page currentPage;

	@SlingObject
	protected ResourceResolver resourceResolver;

	@Override
	public String getLoginFormFragmentPath() {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(currentPage.getContentResource());
		String path = inheritedProperties.getInherited(PlatformPageImpl.PN_LOGIN_FORM_FRAG_PATH, String.class);
		if (null != path) {
			Resource resource = resourceResolver.getResource(path + "/" + JcrConstants.JCR_CONTENT);
			if (null != resource && !ResourceUtil.isNonExistingResource(resource)) {
				return resource.getPath();
			}
		}
		return path;
	}

	@ValueMapValue
	@Getter
	private boolean disableMaskingInAuthor;		
}
