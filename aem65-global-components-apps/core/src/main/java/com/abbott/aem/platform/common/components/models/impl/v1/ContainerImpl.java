package com.abbott.aem.platform.common.components.models.impl.v1;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Container;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.LayoutContainer;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@EqualsAndHashCode
@ToString
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { Container.class },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
	   resourceType = ContainerImpl.RESOURCE_TYPE)
public class ContainerImpl implements Container {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/container/v1/container";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = LayoutContainer.class)
	private LayoutContainer layoutContainer;
	
	
	@ValueMapValue
	@Getter
	private String backgroundImageReference;
	
	@ValueMapValue
	@Getter
	private boolean decorative;	
	
	@ValueMapValue
	@Getter
	private String alt;
	
	@ValueMapValue
	@Getter
	private boolean hideImgOnMobile;
	
	@ValueMapValue
	@Getter
	private String startColor;
	
	@ValueMapValue
	@Getter
	private String startColorPosition;
	
	@ValueMapValue
	@Getter
	private String endColor;
	
	@ValueMapValue
	@Getter
	private String endColorPosition;

}