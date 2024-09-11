package com.abbott.aem.platform.common.components.models.impl.v2;

import com.abbott.aem.platform.common.components.models.LinkStack;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { LinkStack.class, ComponentExporter.class },
        resourceType = { LinkStackImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LinkStackImpl extends com.abbott.aem.platform.common.components.models.impl.v1.LinkStackV1Impl implements LinkStack {
    public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/linkstack/v2/linkstack";

    @ValueMapValue
    @Default(values = "false")
    @Setter(AccessLevel.NONE)
    @Getter
    private String enableButton;

    @ValueMapValue
    @Default(values = "false")
    @Setter(AccessLevel.NONE)
    @Getter
    private String enableStickyList;
}
