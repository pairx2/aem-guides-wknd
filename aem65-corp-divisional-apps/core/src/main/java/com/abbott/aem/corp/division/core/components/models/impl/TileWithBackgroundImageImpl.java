package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.TileWithBackgroundImage;
import com.abbott.aem.platform.common.components.models.TilesWithBackgroundImage;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import lombok.experimental.Delegate;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.security.SecureRandom;


@Model(adaptables = { Resource.class,SlingHttpServletRequest.class },
        adapters = { TileWithBackgroundImage.class, ComponentExporter.class },
        resourceType = { TileWithBackgroundImageImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TileWithBackgroundImageImpl extends ComponentProxyImpl implements TileWithBackgroundImage {

    protected static final String RESOURCE_TYPE = "corp/division/component/content/tileswithbackground";

    @Self
    @Delegate(types = TilesWithBackgroundImage.class)
    @Via(type = ResourceSuperType.class)
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    public TilesWithBackgroundImage tb;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String notchType;

  
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public boolean hideCurveMobile;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String mobileVariation;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String mobileNotchType;
    
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public boolean hideCurveDesktop;


    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String mobileNotchColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String extraCurveMobile;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String extranotchType;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String extraMobileNotchColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String backgroundColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String mobileTitleColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String desktopTitleColor;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String imageSize;

    private SecureRandom random = new SecureRandom(); // Compliant for security-sensitive use cases

    public String getSvgId() {
        return "svgId"+"-"+random.nextInt(100);
    }

}
