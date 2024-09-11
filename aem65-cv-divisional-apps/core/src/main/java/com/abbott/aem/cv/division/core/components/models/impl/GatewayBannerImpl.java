package com.abbott.aem.cv.division.core.components.models.impl;
import com.abbott.aem.cv.division.core.components.models.GatewayBanner;
import com.abbott.aem.cv.division.core.components.models.GatewayBanneritem;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;

import java.util.List;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

import org.apache.sling.api.resource.Resource;


@Model(adaptables = { SlingHttpServletRequest.class , Resource.class},
        adapters = { GatewayBanner.class, ComponentExporter.class },
        resourceType = { GatewayBannerImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GatewayBannerImpl implements GatewayBanner{



    public static final String RESOURCE_TYPE = "cv/division/components/content/gatewaybanner";

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String title;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String headingTag;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String headingStyle;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String titleColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String subTitle;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String subTitleHeadingTags;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String subtitleHeadingStyle;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String descriptionColors;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String bgColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String bgType;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String heightControl;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String bannerImagePath;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String decorative;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String bannerImageAlttext;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String mobileImage;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String removeMarginTop;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String removeMarginBottom;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String panelColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String layout;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String panelTitleHeadingTag;

    @ChildResource
    @Setter(AccessLevel.NONE)
    public List<GatewayBanneritem> gatewayBannerPanel;

    @Override
    public List<GatewayBanneritem> getGatewayBannerPanel() {
        return gatewayBannerPanel;
    }


}