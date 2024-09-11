package com.abbott.aem.cloud.platform.core.redirects.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import lombok.Data;

@Data
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class },
		adapters = { HeaderMatch.class },
		resourceType = HeaderMatch.RESOURCE_TYPE,
		defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderMatch {
	
	public static final String RESOURCE_TYPE = "abbott-platform/urlredirect/header/match";

	@ValueMapValue
    @Default(values = "")
	private String headerValue;

	@ValueMapValue(injectionStrategy = InjectionStrategy.REQUIRED)
	private String matchType;

	@ValueMapValue(injectionStrategy = InjectionStrategy.REQUIRED)
	private String targetUrl;

	@ValueMapValue
	@Default(intValues = 0)
	private Integer order;

}
