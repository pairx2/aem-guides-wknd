package com.abbott.aem.adc.freestylelibrede.models;

import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.via.ChildResource;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, resourceType = "adc/freestylelibrede/components/content/panel-list")
public interface PanelListModel {

	@Inject
	String getImage();
	
	@Inject
	String getBgColor();

	@Inject
	String getTitle();

	@Inject
	String getHeadingType();
	
	@Inject
	String getHeadingTextColor();
	
	@Inject
	String getSubHeading();
	
	@Inject
	String getSubHeadingType();
	
	@Inject
	String getSubHeadingTextColor();
	
	@Inject
	String getPanelType();
	
	@Inject
    String getDeepLinkText();
	
	@Inject
    String getDeepLinkTarget();
    
	@Externalize
    String getDeepLink();
    
	@Inject
	@Via(type = ChildResource.class)
	List<PanelList> getPanelList();

	@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
	interface PanelList {
		@Inject
		String getIcon();

		@Inject
		String getSectionTitle();

		@Inject
		String getSectionTitleColor();
		
		@Inject
		String getSectionDescription();
		
		@Inject
		String getSectionDescriptionColor();

		@Inject
		String getPhoneNumber();
		
		@Inject
		String getPhoneTextColor();

		@Inject
		String getCtaLabel();

		@Externalize
		String getCtaLink();

		@Inject
		String getCtaAction();

		@Inject
		String getCtaStyling();


	}
}