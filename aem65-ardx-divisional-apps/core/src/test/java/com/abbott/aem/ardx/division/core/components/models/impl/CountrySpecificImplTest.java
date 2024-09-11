
package com.abbott.aem.ardx.division.core.components.models.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class CountrySpecificImplTest {

	private final AemContext ctx = new AemContext();

	CountrySpecificImpl model;

	@Mock
	Resource countryResource;
	CountrySpecificImpl countrymodel;

	@BeforeEach
	void setUp() throws Exception {

		ctx.addModelsForClasses(CountrySpecificImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/CountrySpecificImplTest.json",
				"/content");
		countryResource = ctx.resourceResolver().getResource("/content/countryspecific");
		countrymodel = ctx.getService(ModelFactory.class).createModel(countryResource, CountrySpecificImpl.class);
		ctx.currentResource("/content/countryspecific");

	}

	@Test
	void testGetCountry() {
		assertEquals("[en, us]", countrymodel.getCountryCode());
	}
}
