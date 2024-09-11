package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.ContentSection;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ContentSection.class, ComponentExporter.class },
	   resourceType = { ContentSectionImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ContentSectionImpl extends ComponentProxyImpl implements ContentSection {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organisms/contentsection/v1/contentsection";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ChildResource
	@Setter(AccessLevel.NONE)
	@Getter
	private List<Resource> contentText;

}