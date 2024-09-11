package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.PlatformTitle;
import com.adobe.cq.wcm.core.components.models.Title;
import com.day.cq.commons.jcr.JcrConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { PlatformTitle.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PlatformTitleImpl extends ComponentProxyImpl implements PlatformTitle {
	protected static final String RESOURCE_TYPE_V2 = "core/wcm/components/title/v2/title";
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(excludes = DelegationExclusion.class)
	private Title delegate;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private com.day.cq.wcm.api.Page currentPage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean useDefaultImplementation;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL,
				   name = JcrConstants.JCR_TITLE)
	private String title;
	

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String enableTooltip;

	@Override
	public String getText() {

		if (useDefaultImplementation) {
			return delegate.getText();
		}

		return title;
	}

	private interface DelegationExclusion {
		String getText();
	}
}
