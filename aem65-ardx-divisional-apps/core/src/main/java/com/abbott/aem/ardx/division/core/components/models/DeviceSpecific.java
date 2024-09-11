package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType

public interface DeviceSpecific extends Component {
	public String getMobile();

	public String getTablet();

	public String getDesktop();

}