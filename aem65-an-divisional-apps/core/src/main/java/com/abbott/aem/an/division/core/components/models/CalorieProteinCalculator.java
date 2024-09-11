package com.abbott.aem.an.division.core.components.models;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { CalorieProteinCalculator.class },
	   resourceType = { CalorieProteinCalculator.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CalorieProteinCalculator {
	
public static final String RESOURCE_TYPE = "an/globals/components/content/calorieProteinCalculator";
	
	@Self
	@Delegate(types = Component.class)
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	private Component component;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String rteDescription;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String rteTitle;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String rteNote;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieCalHeading;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieCalGender;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieCalActivities;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieActivityVeryLight;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieActivityLight;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieActivityModerate;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieActivityHigh;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieActivityVeryHigh;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieFieldsRequired;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieClearFields;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieViewResult;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieResult;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieStaticResult;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieKiloCalories;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieRecommendationHeading;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String calorieProductRecommendation;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String caloriePDF;


}
