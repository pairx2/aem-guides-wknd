package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.SocialMedia;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class SocialMediaImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { SocialMedia.class },
	   resourceType = { SocialMediaImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)

@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class SocialMediaImpl implements SocialMedia {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/socialmedia/v1/socialmedia";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String socialMediaTitle;

	@ChildResource(name = "socialMediaIcons")
	@Setter(AccessLevel.NONE)
	private List<Resource> socialMediaIcons;

	@Override
	public boolean isEmpty() {
		return StringUtils.isBlank(socialMediaTitle);
	}
}
