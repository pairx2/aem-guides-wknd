package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.EmailPage;
import com.abbott.aem.platform.common.components.models.HeaderImage;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Image;
import com.day.cq.wcm.api.Page;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * This class implements the HeaderImage model.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { HeaderImage.class,
		ComponentExporter.class }, resourceType = {
				HeaderImageImpl.RESOURCE_TYPE }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderImageImpl implements HeaderImage, Image {

	public static final String RESOURCE_TYPE = "abbott-platform/components/email/headerimage/v1/headerimage";

	@Inject
	@Setter(AccessLevel.NONE)
	private String imageUrl;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private String assetPrefixDomain;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private SlingHttpServletRequest request;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Page currentPage;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String fileReference;

	public String getImageUrl() {
		EmailPage emailPage = currentPage.adaptTo(EmailPage.class);
		assetPrefixDomain = emailPage.getAssetPrefixDomain();
		StringBuilder sb = new StringBuilder();
		sb.append(assetPrefixDomain);
		sb.append(fileReference);
		imageUrl = sb.toString();
		return imageUrl;
	}
}
