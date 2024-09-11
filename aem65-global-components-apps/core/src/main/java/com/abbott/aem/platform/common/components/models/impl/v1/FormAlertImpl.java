package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.FormAlert;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Component;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { FormAlert.class, ComponentExporter.class },
        resourceType = { FormAlertImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FormAlertImpl implements FormAlert {
    public static final String RESOURCE_TYPE = "abbott-platform/components/form/formalert/v1/formalert";

    @Self
    @Delegate(types = Component.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private Component component;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String message;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String icon;
}
