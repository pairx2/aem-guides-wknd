package com.abbott.aem.bts.cybersecurity.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.bts.cybersecurity.services.AEMFieldsMappingService;

@Component(service = AEMFieldsMappingService.class,immediate = true)
@Designate(ocd = AEMFieldsMappingServiceImpl.Config.class)
public class AEMFieldsMappingServiceImpl implements AEMFieldsMappingService {
	
	private final Logger log = LoggerFactory.getLogger(AEMFieldsMappingServiceImpl.class);

	AEMFieldsMappingServiceImpl.Config config;
	
	String[] diagnosticsCategory = null;
	String[] cvCategory = null;
	String[] diabetesCategory = null;
	String[] neuroModulationCategory = null;

	@Activate
	@Modified
	void configure(Config config) {
		log.info("Inside AEMFieldsMappingServiceImpl >>");
		this.diagnosticsCategory = config.diagnostics();
		this.cvCategory = config.cardiovascular();
		this.diabetesCategory = config.diabetesCare();
		this.neuroModulationCategory = config.neuromodulation();
	}

	@ObjectClassDefinition(name = "Abbott CyberSecurity AEM Fields Mapping")
	public @interface Config {
		@AttributeDefinition(name = "Diagnostics Categories ", description = "This set of properties for category", type = AttributeType.STRING)
		String[] diagnostics() default { "Immunoassay / Clinical Chemistry" };
		
		@AttributeDefinition(name = "Cardiovascular Categories ", description = "This set of properties for category", type = AttributeType.STRING)
		String[] cardiovascular() default { "Point of Care", "EP Capital Equipment", "Heart Failure"};

		@AttributeDefinition(name = "Diabetes Care Categories ", description = "This set of properties for category", type = AttributeType.STRING)
		String[] diabetesCare() default { "" };

		@AttributeDefinition(name = "NeuroModulation properties", description = "This set of properties are category", type = AttributeType.STRING)
		String[] neuromodulation() default { "Prod Tech" };
	}

	@Override
	public String[] getDiagnosticsCategory() {

		return diagnosticsCategory;
	}

	@Override
	public String[] getCvCategory() {

		return cvCategory;
	}

	@Override
	public String[] getDiabetesCategory() {

		return diabetesCategory;
	}

	@Override
	public String[] getNeuroModulationCategory() {

		return neuroModulationCategory;
	}
}
