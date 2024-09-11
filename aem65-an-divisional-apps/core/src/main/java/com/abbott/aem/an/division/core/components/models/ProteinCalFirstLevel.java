package com.abbott.aem.an.division.core.components.models;


import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = { SlingHttpServletRequest.class },
	   adapters = { ProteinCalFirstLevel.class },
	   resourceType = { ProteinCalFirstLevel.RESOURCE_TYPE },
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		  extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProteinCalFirstLevel {

	public static final String RESOURCE_TYPE = "an/globals/components/content/calorieProteinCalculator";
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String lessProteinDescription;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String equalProteinDescription;

	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String moreProteinDescription;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinCalHeading;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinCalGender;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinCalAge;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinCalHeight;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinCalWeight;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinCalActivities;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinActivityVeryLight;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinActivityLight;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinActivityModerate;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinActivityHigh;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinActivityVeryHigh;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinFieldsRequired;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinSubmitButton;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinSupply;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinResults;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinTotalRequirement;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinTotalConsumption;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinQuery;
	
	@ValueMapValue
	@Setter(AccessLevel.NONE)
	private String proteinTotal;



}
