package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.ContainerEnhance;
import com.abbott.aem.platform.common.components.models.Container;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { ContainerEnhance.class, ComponentExporter.class },
        resourceType = { ContainerEnhanceImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ContainerEnhanceImpl implements ContainerEnhance {

    public static final String RESOURCE_TYPE = "cv/division/components/container/container";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = Container.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Container container;

    @ValueMapValue
    @Getter
    public String backgroundMobileImageReference;

    @ValueMapValue
    @Getter
    public String imageDisplayOptions;
    
}
