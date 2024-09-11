package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.form.Field;

@ConsumerType
public interface Hidden extends Field {
	String getSource();
	String getDataRequest();
	String getKeepInSession();
	String getKey();
}
