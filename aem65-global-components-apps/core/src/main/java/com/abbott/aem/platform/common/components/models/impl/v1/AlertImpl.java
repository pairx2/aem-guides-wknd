package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Alert;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Alert.class, ComponentExporter.class },
	   resourceType = { AlertImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AlertImpl extends ComponentProxyImpl implements Alert {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/alert/v1/alert";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String alertType;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private int time;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String expiryDate;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean closeButton;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String icon;

}