package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.AnimationContainer;
import com.adobe.cq.wcm.core.components.models.LayoutContainer;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Setter;
import lombok.Getter;

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
        adapters = { AnimationContainer.class, ComponentExporter.class },
        resourceType = { AnimationContainerImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AnimationContainerImpl implements AnimationContainer {

    public static final String RESOURCE_TYPE = "cv/division/components/container/animationcontainer/animationcontainer";


    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = LayoutContainer.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private LayoutContainer container;

    @Getter
    @ValueMapValue
    public String direction;

    @Getter
    @ValueMapValue
    public String speed;

    @Getter
    @ValueMapValue
    public String duration;

    @Getter
    @ValueMapValue
    public String delay;
}