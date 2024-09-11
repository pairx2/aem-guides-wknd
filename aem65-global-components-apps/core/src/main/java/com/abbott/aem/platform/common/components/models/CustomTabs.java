package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Tabs;

import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CustomTabs extends Tabs {

	List<Resource> getIcons();
	List<Resource> getTabImage();
}
