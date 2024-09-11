package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.integration.nutrition.NutritionFacts;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

/**
 *
 * @author saikrishna.s
 * 
 *         Nutritional Info
 * 
 *         Nutritional Info is the SlingModel to hold the details of individual
 *         Nutritional Info
 * 
 *         Version Number: 1.0
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NutritionalInfoModel {

	/** The current page. */
	@ScriptVariable
	private Page currentPage;

	/** The nutrition data service. */
	@OSGiService
	private NutritionDataService nutritionDataService;

	/** The nutritional info json. */
	private String nutritionalInfoJson;


	/**
	 * Gets the nutritional info data from nutrition data service.
	 *
	 * @return the nutritional info
	 */
	public NutritionFacts getNutritionalInfo() {
		ValueMap pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		if (pageProperties.containsKey(CommonConstants.NUTRITIONAL_INFO)) {
			nutritionalInfoJson = pageProperties.get(CommonConstants.NUTRITIONAL_INFO, String.class);
		}

		return nutritionDataService.getNutritionFactsData(nutritionalInfoJson);
	}

	public boolean hasNutrionalInfoData() {
		ValueMap pageProperties = currentPage.getContentResource().adaptTo(ValueMap.class);
		if (pageProperties.containsKey(CommonConstants.NUTRITIONAL_INFO)) {
			nutritionalInfoJson = pageProperties.get(CommonConstants.NUTRITIONAL_INFO, String.class);
		}

		return nutritionDataService.hasNutritionalFacts(nutritionalInfoJson);
	}
}
