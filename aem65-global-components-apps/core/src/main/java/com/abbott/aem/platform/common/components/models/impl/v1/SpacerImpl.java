package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.Spacer;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {Spacer.class}, resourceType = {
        SpacerImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SpacerImpl implements Spacer {

    public static final String RESOURCE_TYPE = "abbott-platform/components/content/atoms/spacer/v1/spacer";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String desktopPixels;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String tabletPixels;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    @Getter
    private String mobilePixels;

}
