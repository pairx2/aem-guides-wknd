package com.abbott.aem.bts.cybersecurity.components.model.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.bts.cybersecurity.components.model.ArcherProp;
import com.abbott.aem.bts.cybersecurity.constants.SchedulerConstants;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Setter;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { ArcherProp.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ArcherPropImpl implements ArcherProp{

	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	List<String> productTypes;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	List<String> categories;

	@PostConstruct
	public void init() {

		Resource productResource = resourceResolver.getResource(SchedulerConstants.PRODUCTS_RESOURCE);
		if (null != productResource) {
			String productType = productResource.getValueMap().get(SchedulerConstants.PRODUCT_TYPES, String.class);
			this.productTypes = Stream.of(productType.split(",", -1)).collect(Collectors.toList());
		}

		/* setting categories from service */
		List<String> serviceCategories = new ArrayList<>();

		serviceCategories.add(SchedulerConstants.CARDIOVASCULAR);
		serviceCategories.add(SchedulerConstants.DIABETES);
		serviceCategories.add(SchedulerConstants.DIAGNOSTICS);
		serviceCategories.add(SchedulerConstants.NEUROMODULATION);
		this.categories = serviceCategories;

	}

	public List<String> getCategories() {
		return categories;
	}

	public List<String> getProductTypes() {
		return productTypes;
	}

}
