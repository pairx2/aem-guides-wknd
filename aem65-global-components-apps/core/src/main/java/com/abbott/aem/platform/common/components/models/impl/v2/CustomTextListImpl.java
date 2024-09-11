package com.abbott.aem.platform.common.components.models.impl.v2;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.CustomTextList;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CustomTextList.class, ComponentExporter.class },
	   resourceType = { CustomTextListImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CustomTextListImpl extends com.abbott.aem.platform.common.components.models.impl.v1.CustomTextListV1Impl {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/customtextlist/v2/customtextlist";
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private String iconSize;

}