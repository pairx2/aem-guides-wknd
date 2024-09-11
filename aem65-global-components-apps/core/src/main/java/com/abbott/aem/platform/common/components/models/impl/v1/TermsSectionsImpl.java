package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import com.abbott.aem.platform.common.components.models.TermsSection;
import com.abbott.aem.platform.common.components.models.TermsSections;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@EqualsAndHashCode(callSuper = false)
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class },
	   adapters = { TermsSections.class },
	   resourceType = { TermsSectionsImpl.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TermsSectionsImpl implements TermsSections {
	public static final String RESOURCE_TYPE = "abbott-platform/components/content/organism/termssection/v1/termssection";
	protected static final String TERMS_SECTION = "termsSections";
	@Inject
	private Resource resource;

	@Inject
	private Page currentPage;

	@Getter
	private List<TermsSection> termsSections;

	@PostConstruct
	public void init() {
		loadTermsSections();
	}

	private void loadTermsSections() {
		ResourceResolver resolver = resource.getResourceResolver();
		String termsNode = currentPage.getPath() + "/" + JcrConstants.JCR_CONTENT + "/" + TERMS_SECTION;
		Resource termsResource = resolver.getResource(termsNode);

		if (termsResource != null) {
			termsSections = new ArrayList<>();
			Iterator<Resource> children = termsResource.listChildren();
			while (children.hasNext()) {
				termsSections.add(children.next().adaptTo(TermsSection.class));
			}
		}
	}
}