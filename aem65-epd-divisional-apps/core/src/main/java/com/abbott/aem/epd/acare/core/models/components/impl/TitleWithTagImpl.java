package com.abbott.aem.epd.acare.core.models.components.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import com.abbott.aem.epd.acare.core.models.components.TitleWithTag;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * The Class EmailTagImpl.
 */

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TitleWithTag.class }, resourceType = {
		TitleWithTagImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TitleWithTagImpl extends BodyTextWithTagImpl implements TitleWithTag {
	
	/** The Constant RESOURCE_TYPE. */
	public static final String RESOURCE_TYPE = "epd/acare/components/email/title-with-tag";	
}
