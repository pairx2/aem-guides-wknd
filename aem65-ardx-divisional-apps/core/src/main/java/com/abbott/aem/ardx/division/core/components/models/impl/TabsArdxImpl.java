package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.TabsArdx;
import com.abbott.aem.platform.common.components.models.CustomTabs;
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


@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class},
        adapters = {TabsArdx.class, ComponentExporter.class},
        resourceType = {TilesWithBackgroundImageArdxImpl.RESOURCE_TYPE}
        , defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class TabsArdxImpl extends ComponentProxyImpl implements TabsArdx {

    protected static final String RESOURCE_TYPE = "ardx/division/components/content/tabs";
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String tabBgColor;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String activeTabColor;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String tabFontColor;
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String activeTabFontColor;
    @Self
    @Via(type = ResourceSuperType.class)
    @Delegate(types = CustomTabs.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private CustomTabs customtabs;

}
