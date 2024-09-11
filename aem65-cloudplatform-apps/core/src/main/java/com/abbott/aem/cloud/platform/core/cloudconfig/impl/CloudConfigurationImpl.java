package com.abbott.aem.cloud.platform.core.cloudconfig.impl;

import java.util.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.cloud.platform.core.cloudconfig.CloudConfiguration;

import lombok.Getter;

@Getter
@Model(adaptables = Resource.class, adapters = { CloudConfiguration.class })
public class CloudConfigurationImpl implements CloudConfiguration {

	@Self
	Resource resource;
	
	private String configPath;
	private String itemPath;
	
	

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Named("jcr:content/jcr:title")
	private String title;
	
	@PostConstruct
	protected void init() {
		itemPath = resource.getPath();
		configPath = Optional.ofNullable(resource.getParent()).map(Resource::getParent).map(Resource::getPath)
				.orElse("");
	}

	
}
