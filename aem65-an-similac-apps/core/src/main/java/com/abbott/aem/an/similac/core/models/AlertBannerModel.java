package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;


@Model(adaptables = { SlingHttpServletRequest.class },
	   	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
		  
public class AlertBannerModel  {

	public static final String RESOURCE_TYPE = "an/similac/components/content/alertbanner";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String alertMessage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String displayText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String buttonText;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String collapseText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String expandText;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String id;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String icon;
	
	public String getAlertMessage() {
		// 1000 Auto-generated method stub
		return alertMessage;
	}
    
	public String getDisplayText() {
		// 1000 Auto-generated method stub
		return displayText;
	}
	
	public String getButtonText() {
		// 1000 Auto-generated method stub
		return buttonText;
	}
	public String getCollapseText() {
		// 1000 Auto-generated method stub
		return collapseText;
	}
	public String getExpandText() {
		// 1000 Auto-generated method stub
		return expandText;
	}
	public String getId() {
		// 1000 Auto-generated method stub
		return id;
	}
	public String getIcon() {
		// 1000 Auto-generated method stub
		return icon;
	}	
}