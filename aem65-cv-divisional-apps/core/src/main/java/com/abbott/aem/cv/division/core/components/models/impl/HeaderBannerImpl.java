package com.abbott.aem.cv.division.core.components.models.impl;



import com.abbott.aem.cv.division.core.components.models.HeaderBanner;
import com.abbott.aem.cv.division.core.components.models.HeaderBannerItem;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.Getter;
import lombok.AccessLevel;
import lombok.Setter;

import java.util.List;



import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;


@Model(adaptables = { SlingHttpServletRequest.class },
        adapters = { HeaderBanner.class, ComponentExporter.class },
        resourceType = { HeaderBannerImpl.RESOURCE_TYPE },        
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderBannerImpl implements HeaderBanner {

        public static final String RESOURCE_TYPE = "cv/division/components/content/headerbanner";

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String bannerHeight;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String backgroundColor;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String backgroundType;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String topMargin;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String bottomMargin;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String hideMobile;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String textContainerWidth;
    
    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    public String stopCarouselAutoRotate;
    
    @ChildResource
    @Getter
    @Setter(AccessLevel.NONE)
    public List<HeaderBannerItem> imageTextList;


    @Override
    public List<HeaderBannerItem> getImageTextlist() {
        return imageTextList;
    }
}