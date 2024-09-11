package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

import com.abbott.aem.platform.common.components.models.PromoSection;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { PromoSection.class },
	   resourceType = { PromoSectionImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PromoSectionImpl extends ComponentProxyImpl implements PromoSection {

	/**
	 * The constant RESOURCE_TYPE.
	 */
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/promosection/v1/promosection";

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private int buttonCount;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private boolean badgeRequired;

	@Override
	public String[] getButtonLength() {
		return new String[buttonCount];
	}

}
