package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.PlatformEmbed;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Embed;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * @author Sambasivaraja
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { PlatformEmbed.class, ComponentExporter.class },
	   resourceType = { PlatformEmbedImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PlatformEmbedImpl implements PlatformEmbed {

	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/embed/v1/embed";

	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Embed.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Embed embed;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String iframe;


}
