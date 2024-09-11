package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.day.cq.wcm.api.Page;


/**
 *  ProductDescriptionModel show the product descrption on the product page.
 * 
 */

@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class },resourceType = { "an/similac/components/content/products/product-description"}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class ProductDescriptionModel {
	
	/** The Current Page Declaration */
	@ScriptVariable
	private Page currentPage;

	/** The description. */
	private String description;

	/**
	 * Init method to get description from page properties of a product page.
	 */
	@PostConstruct
	protected void init() {
		ValueMap pageProperties = ValueMap.EMPTY;
		if (currentPage.getContentResource() != null) {
			pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		}
		if (pageProperties.containsKey(CommonConstants.DESCRIPTION)) {
			description = pageProperties.get(CommonConstants.DESCRIPTION, String.class);
		}
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

}
