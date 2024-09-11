package com.abbott.aem.ardx.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ComponentProxy {
	
    public String getTitleProxyPath();

    public String getTilelistProxyPath();
	
	public String getButtonProxyPath();
}
