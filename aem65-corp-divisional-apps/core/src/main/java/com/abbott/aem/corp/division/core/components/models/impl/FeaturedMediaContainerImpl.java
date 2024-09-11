package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.EventModal;
import com.abbott.aem.corp.division.core.components.models.FeaturedMediaContainer;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import java.util.List;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = {Resource.class,SlingHttpServletRequest.class },
        adapters = { FeaturedMediaContainer.class, ComponentExporter.class },
        resourceType = { FeaturedMediaContainerImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FeaturedMediaContainerImpl implements FeaturedMediaContainer {
    public static final String RESOURCE_TYPE = "corp/division/component/content/featuredmediacontainer";

    @ChildResource
    @Setter(AccessLevel.NONE)
    @Getter
    public List<EventModal> eventDetails;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String calendarbgcolor;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String ctaLabel;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String ctaLink;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String newTab;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String backgroundColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String fileReference;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String titleRequired;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String altText;



}