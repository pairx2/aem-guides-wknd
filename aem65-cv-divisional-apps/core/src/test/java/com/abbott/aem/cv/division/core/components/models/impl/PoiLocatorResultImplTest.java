package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.PoiLocatorResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;


@ExtendWith(AemContextExtension.class)
class PoiLocatorResultImplTest {

    private final AemContext ctx = new AemContext();
    private static final String PATH = "/content/POILocatorResult";

    @BeforeEach
    public void setUp() {
        ctx.addModelsForClasses(PoiLocatorResult.class);
        ctx.load().json("/com/abbott/aem/cv/division/core/components/models/impl/PoiLocatorResultImplTest.json", "/content");
    }

    @Test
    void testGetDisplayType() {
        final String expected = "oneColumn";
        Resource myResource = ctx.resourceResolver().getResource(PATH);
        PoiLocatorResult poiLocatorResult = ctx.getService(ModelFactory.class).createModel(myResource, PoiLocatorResult.class);
        String actual = StringUtils.EMPTY;
        actual = poiLocatorResult.getDisplayType();
        assertEquals(expected, actual);
    }
	
	@Test
	void testgetKmSelection() {
		final String expected = "true";
		 Resource myResource = ctx.resourceResolver().getResource(PATH);
		 PoiLocatorResult poiLocatorResult = ctx.getService(ModelFactory.class).createModel(myResource, PoiLocatorResult.class);
		 String actual = StringUtils.EMPTY;
         actual = poiLocatorResult.getKmSelection();
         assertEquals(expected, actual);
	}
}
