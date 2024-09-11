package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/image")
public interface ImageOverlayModel {

	@Inject
	String getFileReference();
	
	@Inject
	String getTitle();

	@Inject
	String getSubTitle();

	@Inject
	String getTextColor();	
	
	@Externalize
	String getDeepLink();
	
	@Inject
	String getDeepLinkText();
	
	@Inject
	String getDeepLinkTarget();
	
	@Inject
	@Via(type = ChildResource.class)
	List<CtaList> getCtaList();
}
