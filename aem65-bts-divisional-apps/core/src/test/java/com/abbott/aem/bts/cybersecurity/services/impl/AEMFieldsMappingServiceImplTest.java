package com.abbott.aem.bts.cybersecurity.services.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;
import java.lang.UnsupportedOperationException;

import org.apache.sling.testing.mock.osgi.MockOsgi;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import com.abbott.aem.bts.cybersecurity.services.AEMFieldsMappingService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith(AemContextExtension.class)
class AEMFieldsMappingServiceImplTest {

	AemContext ctx = new AemContext();

	AEMFieldsMappingService fieldMapping;
	Map<String, Object> map = new HashMap<String, Object>();

	@BeforeEach
	public void setUp() throws Exception {
		fieldMapping = new AEMFieldsMappingServiceImpl();
		ctx.addModelsForClasses(AEMFieldsMappingServiceImpl.class);
		map.put("diagnostics", "Immunoassay / Clinical Chemistry");
		map.put("cardiovascular", "Point of Care");
		map.put("diabetesCare", "");
		map.put("neuroModulation", "Prod Tech");
		ctx.registerService(AEMFieldsMappingService.class, fieldMapping);
		MockOsgi.activate(fieldMapping, ctx.bundleContext(), map);

	}

	@Test
	void testGetDiagnosticsCategory() {

		assertEquals("Immunoassay / Clinical Chemistry", fieldMapping.getDiagnosticsCategory()[0]);

	}

	@Test
	void testGetCvCategory() {

		assertEquals("Point of Care", fieldMapping.getCvCategory()[0]);

	}

	@Test
	void testGetDiabetesCategory() {

		assertEquals("", fieldMapping.getDiabetesCategory()[0]);

	}

	@Test
	void testGetNeuroModulationCategory() {

		assertEquals("Prod Tech", fieldMapping.getNeuroModulationCategory()[0]);

	}

}
