package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.CardsEnhance;
import com.abbott.aem.platform.common.components.models.Cards;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
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
        adapters = { CardsEnhance.class, ComponentExporter.class},
        resourceType = { CardsEnhanceImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CardsEnhanceImpl extends ComponentProxyImpl implements CardsEnhance {

    public static final String RESOURCE_TYPE = "cv/division/components/content/cards";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = Cards.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Cards cards;

    @ValueMapValue
    @Getter
    public String linkType;
    
    @ValueMapValue
    @Getter
    public String anchorName;
    
    @ValueMapValue
    @Getter
    public String mediaID;
    
    @ValueMapValue
    @Getter
    public String limelightPlayerID;
    
    @ValueMapValue
    @Getter
    public String orgID;
    
    @ValueMapValue
    @Getter
    public String videoURL;
    
    @ValueMapValue
    @Getter
    public String image;

    @Getter
    @ValueMapValue
    public String phoneNumber;
    
}