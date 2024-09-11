package com.abbott.aem.adc.freestylelibrede.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.abbott.aem.adc.freestylelibrede.services.ExternalizerService;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BaseComponentPropertiesImpl implements BaseComponentProperties {

	@Self
	private Resource resource;
	
	@Inject
	private ExternalizerService externalizerService;

	@Override
	public String getPath() {
		PageManager pageManager = resource.getResourceResolver().adaptTo(PageManager.class);
		return externalizerService.externalizeIfNecessary(pageManager.getContainingPage(resource).getPath(),
				resource.getResourceResolver());
	}

}
