package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.TermsSection;
import com.adobe.cq.dam.cfm.ContentFragment;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { TermsSection.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TermsSectionImpl implements TermsSection {
	protected static final String TERMS_PROPERTY = "terms";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String symbol;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String termsSectionPath;

	@Inject
	private ResourceResolver resourceResolver;

	private String content;

	// This method will return the disclaimer content
	@Override
	public String getContent() {
		if (null != termsSectionPath && null == content) {
			Resource fragmentResource = resourceResolver.getResource(termsSectionPath);
			if (fragmentResource != null) {
				ContentFragment fragment = fragmentResource.adaptTo(ContentFragment.class);
				if (fragment != null) {
					content = fragment.getElement(TERMS_PROPERTY).getContent();
				}
			}
		}

		return content;
	}
}