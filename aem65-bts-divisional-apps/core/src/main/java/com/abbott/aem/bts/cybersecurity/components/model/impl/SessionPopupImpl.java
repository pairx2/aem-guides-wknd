package com.abbott.aem.bts.cybersecurity.components.model.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.bts.cybersecurity.components.model.SessionPopup;
import com.abbott.aem.bts.cybersecurity.services.SessionConfigService;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.components.Component;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { SessionPopup.class, ComponentExporter.class },
	   resourceType = { SessionPopupImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SessionPopupImpl implements SessionPopup {

	public static final String RESOURCE_TYPE = "bts/cybersecurity/components/content/sessionpopup";
	
    @OSGiService
	SessionConfigService sessionConfigService;

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String inactivityTimeoutMessage;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String timeoutAlertPrefix;
	
	@Override
	public Boolean isTimeoutEnabled() {
		return sessionConfigService.isTimeoutEnabled();
	}
	
	@Override
	public String getInactivityTimeoutMessage() {
		return this.inactivityTimeoutMessage;
	}
	
	@Override
	public String getTimeoutAlertPrefix() {
		return this.timeoutAlertPrefix;
	}
   
	@Override
	public Integer getInactivityTimeoutLimit() {
		return sessionConfigService.getInactivityTimeoutLimit();
	}

	@Override
	public Integer getTimerLimit() {
		return sessionConfigService.getPopupTimer();
	}

}