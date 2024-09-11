package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;
import org.apache.commons.lang3.StringUtils;
import com.abbott.aem.platform.common.components.models.InformationSectionPanel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * The Class InformationSectionPanel Impl.
 */
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { InformationSectionPanel.class, ComponentExporter.class },
	   resourceType = { InformationSectionPanelImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class InformationSectionPanelImpl extends ComponentProxyImpl implements InformationSectionPanel {

	protected static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/informationsectionpanel/v1/informationsectionpanel";

	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean sectionTitleRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private boolean ctaLinkRequired;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String leftContentText;

	@Setter(AccessLevel.NONE)
	@Getter
	@ValueMapValue
	private String rightContentText;
	
	@Setter(AccessLevel.NONE)
	@ValueMapValue
	private boolean showHideMobileImage;
	
	@Override
	public boolean isSectionTitleRequired() {
	
		return this.sectionTitleRequired;
	}

	@Override
	public boolean isCtaLinkRequired() {
		return this.ctaLinkRequired;
	}

	@Override
	public String getLeftContentText() {
		if(this.leftContentText!=null) {
		return this.leftContentText;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public String getRightContentText() {
		if(this.rightContentText!=null) {
		return this.rightContentText;
		}
		return StringUtils.EMPTY;
	}

	@Override
	public boolean getShowHideMobileImage() {
		return this.showHideMobileImage;
	}

}
