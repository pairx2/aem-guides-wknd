package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.InformationSectionPanel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.jackrabbit.oak.commons.PropertiesUtil;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.*;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class},
        adapters = {InformationSectionPanel.class, ComponentExporter.class},
        resourceType = {InformationSectionPanelImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class InformationSectionPanelImpl extends HeroBannerImpl implements InformationSectionPanel {

    public static final String RESOURCE_TYPE = "corp/division/component/content/informationsectionpanel";
    public static final String IMAGE_RESOURCE = "image";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String imageVariation;

    @Inject
    private SlingHttpServletRequest request;

    String fileReference = null;
    String altText = null;

    @PostConstruct
    protected void init() {
        Resource resource = request.getResource();
        getImagePath(resource);
    }

    private void getImagePath(Resource resource) {
        if (null != resource) {
            Resource imageResource = resource.getChild(IMAGE_RESOURCE);
            if (null != imageResource) {
                ValueMap imageData = imageResource.getValueMap();
                if (null != imageData) {
                    fileReference = PropertiesUtil.toString(imageData.get("fileReference"), "null");
                    altText = PropertiesUtil.toString(imageData.get("alt"), "null");
                }
            }
        }
    }
}

