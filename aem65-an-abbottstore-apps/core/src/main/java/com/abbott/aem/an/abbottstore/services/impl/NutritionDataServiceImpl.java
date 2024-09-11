package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.constants.CommonConstants;
import com.abbott.aem.an.abbottstore.integration.nutrition.Flavors;
import com.abbott.aem.an.abbottstore.integration.nutrition.NutritionFacts;
import com.abbott.aem.an.abbottstore.integration.nutrition.NutritionalInfo;
import com.abbott.aem.an.abbottstore.integration.nutrition.ServingSizes;
import com.abbott.aem.an.abbottstore.services.NutritionDataService;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author saikrishna.s
 * 
 *         NutritionDataServiceImpl - This service interface will provide
 *         methods to get product data.
 *
 */
@Component(immediate = true, enabled = true, service = NutritionDataService.class)
@Designate(ocd = NutritionDataServiceImpl.Config.class)
public class NutritionDataServiceImpl implements NutritionDataService {

	/** The log. */
	private final Logger log = LoggerFactory.getLogger(NutritionDataServiceImpl.class);

	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Product Data Service", description = "Product Data Service will retrieve related product data from abbott and save the same data in to JCR.")
	public static @interface Config {
		@AttributeDefinition(name = "Nutrition Data path")
		String nutritionpath() default "https://an-api-tridion.abbottnutrition.com/api/ProductBySku/";

		@AttributeDefinition(name = "Time Out")
		int timeout() default 60000;

		@AttributeDefinition(name = "Resource Property Map")
		String[] resourcepropertymap() default { "abbott/components/content/product-description=description",
				"abbott/components/content/more-information=product_flavor,case_of_product,product_form,case_x,case_y",
				"abbott/components/content/nutritionalinfo=nutritional-info",
				"abbott/components/content/subscription-description=subscription_info" };

	}

	/** The nutrition web service url. */
	private String nutritionWebServiceUrl;

	/** The time out. */
	private int timeOut;

	/** The resource property map. */
	private String[] resourcePropertyMap;
	
	/*
	 * Return time out.
	 * 
	 * @see com.abbott.aem.core.services.NutritionDataService#getTimeOut()
	 */
	@Override
	public int getTimeOut() {
		return timeOut;
	}

	/**
	 * Gets the nutrition web service url.
	 *
	 * @return the nutrition web service url
	 */
	@Override
	public String getNutritionWebServiceUrl() {
		return nutritionWebServiceUrl;
	}

	@Activate
	protected void activate(final Config config) {
		log.info(":: Inside ProductDataServiceImpl activate method :: ");
		nutritionWebServiceUrl = config.nutritionpath();
		timeOut = config.timeout();
		resourcePropertyMap = config.resourcepropertymap();
	}

	/*
	 * This method is used to read the json data stored as property in product pages
	 * and gets all the Nutrition Facts data.
	 * 
	 * @see
	 * com.abbott.aem.core.services.NutritionDataService#getNutritionFactsData(java.
	 * lang.String)
	 */
	@Override
	public NutritionFacts getNutritionFactsData(String nutritionalInfoJson) {
		log.info("\n\n::::: Start of getNutritionFactsData method :::::\n\n");

		Gson gson = new Gson();
		NutritionFacts nutritionFacts = null;
		if (StringUtils.isNotEmpty(nutritionalInfoJson)) {
			nutritionFacts = gson.fromJson(nutritionalInfoJson, NutritionFacts.class);
			for (Flavors flavor : nutritionFacts.getFlavors()) {
				for (ServingSizes servingSizes : flavor.getServingSizes()) {
					NutritionalInfo[] nutritionalInfo = servingSizes.getNutritionalInfo();
					servingSizes.handleNutrintionaInfo(nutritionalInfo);
				}
			}
		}
		return nutritionFacts;
	}

	/*
	 * This method is used get property values by splitting strings.
	 * 
	 * @see
	 * com.abbott.aem.core.services.NutritionDataService#getResourceProperties()
	 */
	@Override
	public Map<String, List<String>> getResourceProperties() {
		Map<String, List<String>> propertiesMap = new HashMap<>();
		for (String properties : resourcePropertyMap) {
			if (properties.indexOf(CommonConstants.DELIMITTER_EQUALS) > -1) {
				propertiesMap.put(properties.split(CommonConstants.DELIMITTER_EQUALS)[0],
						Arrays.asList(properties.split(CommonConstants.DELIMITTER_EQUALS)[1]
								.split(CommonConstants.DELIMITTER_COMMA)));
			}
		}
		return propertiesMap;
	}

	public boolean hasNutritionalFacts(String nutritionalInfoJson) {
		Gson gson = new Gson();
		NutritionFacts nutritionFacts = null;
		if (StringUtils.isNotEmpty(nutritionalInfoJson)) {
			nutritionFacts = gson.fromJson(nutritionalInfoJson, NutritionFacts.class);
			for (Flavors flavor : nutritionFacts.getFlavors()) {
				for (ServingSizes servingSizes : flavor.getServingSizes()) {
					NutritionalInfo[] nutritionalInfo = servingSizes.getNutritionalInfo();
					if(nutritionalInfo.length > 0 ) {
						return true;
					}
				}
			}
		}
		return false;
	}

}
