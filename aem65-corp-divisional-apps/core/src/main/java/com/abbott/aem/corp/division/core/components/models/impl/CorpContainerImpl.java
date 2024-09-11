package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.CorpContainer;
import com.abbott.aem.platform.common.components.models.Container;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class },
        adapters = { CorpContainer.class, ComponentExporter.class },
        resourceType = { CorpContainerImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
//@data removed//
public class CorpContainerImpl extends HeroBannerImpl implements CorpContainer {
    protected static final String RESOURCE_TYPE = "corp/division/component/content/container/container";

    @Self
    @Delegate(types = Container.class)
    @Via(type = ResourceSuperType.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    public Container tb;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String imageVariation;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String backgroundImageReference;
}
