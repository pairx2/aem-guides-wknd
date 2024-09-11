package com.abbott.aem.cv.division.core.components.models.impl;


import com.abbott.aem.cv.division.core.components.models.PoiLocatorResult;


import com.adobe.cq.export.json.ComponentExporter;
import lombok.Getter;

import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.api.resource.Resource;


@Model(adaptables = {Resource.class}, adapters = {PoiLocatorResult.class, ComponentExporter.class},
        resourceType = { PoiLocatorResultImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PoiLocatorResultImpl implements PoiLocatorResult {

    public static final String RESOURCE_TYPE = "cv/division/components/content/poilocator";

    @Getter
    @ValueMapValue
    private String displayType;

    @Getter
	@ValueMapValue
	private String kmSelection;
   
}