package com.abbott.aem.adc.freestylelibrede.constants;

import java.util.HashMap;
import java.util.Map;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.BaseModelTest;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class SalesforceConstantsTest extends BaseModelTest<SalesforceConstants> {

	public static final String COMPANY = "Company";
	private static final Map<String, String> SALESFORCE_FORM_FIELD_MAP = new HashMap();
	@InjectMocks
	private SalesforceConstants model;

	@BeforeEach
	void setup() {
		model = (SalesforceConstants) loadModel(SalesforceConstants.class);
		SALESFORCE_FORM_FIELD_MAP.put(COMPANY, COMPANY);

	}

	@Test
	void hasMappingKey() {
		Assert.assertTrue("Company", SalesforceConstants.hasMappingKey(COMPANY));
	}

	@Test
	void getMappingValue() {
		Assert.assertEquals("Company", SalesforceConstants.getMappingValue(COMPANY));
	}
}
