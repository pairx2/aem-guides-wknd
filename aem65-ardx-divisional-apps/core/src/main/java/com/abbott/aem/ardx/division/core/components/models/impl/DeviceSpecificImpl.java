package com.abbott.aem.ardx.division.core.components.models.impl;

import com.abbott.aem.ardx.division.core.components.models.DeviceSpecific;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {DeviceSpecific.class, ComponentExporter.class}, resourceType = {
        DeviceSpecificImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

public class DeviceSpecificImpl implements DeviceSpecific {
    public static final String RESOURCE_TYPE = "ardx/division/components/content/devicespecific";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
	@Default(values = "false")
    private String mobile;

    @ValueMapValue	
    @Setter(AccessLevel.NONE)
	@Default(values = "false")
    private String tablet;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
	@Default(values = "false")
    private String desktop;
}