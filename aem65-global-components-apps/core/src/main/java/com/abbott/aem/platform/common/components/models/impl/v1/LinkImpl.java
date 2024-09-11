package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

import com.abbott.aem.platform.common.components.models.Link;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Button;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

/**
 * The Class LinkImpl.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { Link.class, ComponentExporter.class },
	   resourceType = { LinkImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LinkImpl implements Link {
	/**
	 * The Constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/link/v1/link";
	/**
	 * The pop up url.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	protected String popUpUrl;
	/**
	 * The button.
	 */
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(excludes = ExcludeButton.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Button button;
	/**
	 * The action.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String action;
	/**
	 * The is external.
	 */
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean external;

	@ValueMapValue
	@Default(booleanValues = true)
	@Setter(AccessLevel.NONE)
	private boolean redirectConfirm;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String modalIcon;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String modalTitle;

	@SuppressWarnings("squid:CallToDeprecatedMethod")
	public String getLink() {
		return PlatformUtil.addHttpsIfRequired(button.getLink());
	}

	private interface ExcludeButton {
		String getLink();
	}

}
