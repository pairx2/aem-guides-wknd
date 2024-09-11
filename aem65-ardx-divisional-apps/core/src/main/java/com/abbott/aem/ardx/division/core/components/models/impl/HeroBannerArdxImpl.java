package com.abbott.aem.ardx.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.abbott.aem.ardx.division.core.components.models.HeroBannerArdx;
import com.abbott.aem.platform.common.components.models.HeroBanner;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { HeroBannerArdx.class }, resourceType = {
		HeroBannerArdxImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class HeroBannerArdxImpl implements HeroBannerArdx {
	
	protected static final String RESOURCE_TYPE = "ardx/division/components/content/herobanner";
	
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = HeroBanner.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	public HeroBanner heroBanner;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String preTitleColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String titleColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String subTitleColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String descriptionColor;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	public String backgroundColor;
	
}
