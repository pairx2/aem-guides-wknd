package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.CustomTextItem;
import com.abbott.aem.platform.common.components.models.CustomTextList;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CustomTextList.class, ComponentExporter.class },
	   resourceType = { CustomTextListV1Impl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CustomTextListV1Impl implements CustomTextList {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/customtextlist/v1/customtextlist";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String listType;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String headerTitle;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String textAboveList;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String textBelowList;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String iconSize;

	@ChildResource
	@Setter(AccessLevel.NONE)
	@Getter
	public List<CustomTextItem> customLists;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String startColor;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String startColorPosition;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String endColor;
	
	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String endColorPosition;

	
}