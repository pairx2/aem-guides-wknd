package com.abbott.aem.an.abbottstore.services;

import com.abbott.aem.an.abbottstore.integration.nutrition.NutritionFacts;

import java.util.List;
import java.util.Map;

/**
 * @author saikrishna.s
 * 
 *         ProductDataService - This OSGI service interface will provide methods
 *         to get product data from abbott and store the same in JCR.
 *
 */
public interface NutritionDataService {

	/**
	 * Gets the nutrition facts data.
	 *
	 * @param nutritionalInfoJson the nutritional info json
	 * @return the nutrition facts data
	 */
	public NutritionFacts getNutritionFactsData(String nutritionalInfoJson);

	/**
	 * Gets the nutrition web service url.
	 *
	 * @return the nutrition web service url
	 */
	public String getNutritionWebServiceUrl();

	/**
	 * Gets the time out.
	 *
	 * @return the time out
	 */
	public int getTimeOut();

	/**
	 * Gets the resource properties.
	 *
	 * @return the resource properties
	 */
	public Map<String, List<String>> getResourceProperties();

	public boolean hasNutritionalFacts(String nutritionalInfoJson);
}
