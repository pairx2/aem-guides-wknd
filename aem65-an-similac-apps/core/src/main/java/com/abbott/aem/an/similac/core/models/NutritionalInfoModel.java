package com.abbott.aem.an.similac.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import com.abbott.aem.an.similac.core.services.NutritionDataService;
import com.abbott.aem.an.similac.core.utils.CommonConstants;
import com.abbott.aem.an.similac.integration.nutrition.NutritionFacts;
import com.day.cq.wcm.api.Page;

/**
 * Nutritional Info
 * <br> 
 * The Sling Model to get the nutritional info details of a product
 * <br>
 * Version Number: 1.0
 *         
 * @author saikrishna.s, Anirudh Garg
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NutritionalInfoModel {

	/** The current page */
	@ScriptVariable
	private Page currentPage;

	/** The nutrition data service */
	@OSGiService
	private NutritionDataService nutritionDataService;
	
	/** The nutritional info json. */
	private String nutritionalInfoJson;

	/**
	 * Gets the nutritional info data from nutrition data service
	 *
	 * @return the nutritional info
	 */
	public NutritionFacts getNutritionalInfo() {
		ValueMap pageProperties = currentPage.getProperties();
		String nutritionInfoJson = null;
		if (pageProperties.containsKey(CommonConstants.NUTRITIONAL_INFO)) {
			nutritionInfoJson = pageProperties.get(CommonConstants.NUTRITIONAL_INFO, String.class);
		}

		return nutritionDataService.getNutritionFactsData(nutritionInfoJson);
	}
	
	/**
	 * Check if the product has nutritional info data
	 * 
	 * @return True if the data exists, False if it doesn't
	 */
	public boolean hasNutrionalInfoData() {
		ValueMap pageProperties = currentPage.getProperties();
		if (pageProperties.containsKey(CommonConstants.NUTRITIONAL_INFO)) {
			nutritionalInfoJson = pageProperties.get(CommonConstants.NUTRITIONAL_INFO, String.class);
		}

		return nutritionDataService.hasNutritionalFacts(nutritionalInfoJson);
	}

}
