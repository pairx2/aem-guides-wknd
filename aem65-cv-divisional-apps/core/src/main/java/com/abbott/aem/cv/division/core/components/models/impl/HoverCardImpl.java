package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.HoverCard;
import com.abbott.aem.platform.common.components.models.Cards;
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
        adapters = { HoverCard.class, ComponentExporter.class },
        resourceType = { HoverCardImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HoverCardImpl implements HoverCard {

    public static final String RESOURCE_TYPE = "cv/division/components/content/hovercard/hovercard";

    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = Cards.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Cards cards;

    @Getter
    @ValueMapValue
    public String hoverTextTitle;

    @Getter
    @ValueMapValue
    public String hoverTextDescription;
}