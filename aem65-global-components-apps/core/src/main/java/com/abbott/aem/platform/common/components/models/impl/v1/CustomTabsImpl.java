package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.CustomTabs;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Tabs;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@EqualsAndHashCode
@ToString
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { CustomTabs.class, Tabs.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
	   resourceType = {CustomTabsImpl.RESOURCE_TYPE, CustomTabsImpl.RESOURCE_TYPE_CARDS_TAB} )
public class CustomTabsImpl implements CustomTabs {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/tabs/v1/tabs";
	public static final String RESOURCE_TYPE_CARDS_TAB = "abbott-platform/components/content/molecules/cardstab/v1/cardstab";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Tabs.class)
	private Tabs tabs;

	@ChildResource
	@Getter
	private List<Resource> icons;
	
	@ChildResource
	@Getter
	private List<Resource> tabImage;
	

}
