package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.TilesWithBackgroundImage;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The Class TilesWithBackgroundImage Impl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { TilesWithBackgroundImage.class, ComponentExporter.class },
	   resourceType = { TilesWithBackgroundImageImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class TilesWithBackgroundImageImpl extends ComponentProxyImpl implements TilesWithBackgroundImage {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/tileswithbackgroundimage/v1" + "/tileswithbackgroundimage";

	/**
	 * The container.
	 */
	@Self
	@Delegate(types = Image.class)
	@Via(type = ResourceSuperType.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Image image;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	@Getter
	private boolean sectionTitleRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String id;


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
