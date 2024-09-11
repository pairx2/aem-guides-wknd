package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.HeroBanner;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.security.SecureRandom;


@Model(adaptables = {Resource.class, SlingHttpServletRequest.class },
        adapters = { HeroBanner.class, ComponentExporter.class },
        resourceType = { HeroBannerImpl.RESOURCE_TYPE },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeroBannerImpl implements HeroBanner {

    protected static final String RESOURCE_TYPE = "corp/division/component/content/herobanner";

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String notchType;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String desktopNotchColor;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public boolean hideCurveTab;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String mobileNotchColor;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public boolean hideCurveDesktop;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String extraCurveMobile;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String extraMobileNotchColor;
    
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public boolean hideCurveMobile;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String extranotchType;

    private SecureRandom r = new SecureRandom();
    public String getSvgId() {
        return "svgid"+"-"+r.nextInt(100);
    }
}
