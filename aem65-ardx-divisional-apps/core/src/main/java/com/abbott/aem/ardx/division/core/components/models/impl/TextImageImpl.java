package com.abbott.aem.ardx.division.core.components.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.ardx.division.core.components.models.TextImage;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TextImage.class,
                ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextImageImpl implements TextImage {

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String imageAsset;

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String tabletImage;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String mobileImage;

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String noWrapUpText;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String decorative;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String altText;

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String imageTitle;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String imageCta;

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String external;		

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String targetUrl;

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String targetUrlNewWindow;

        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String text;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String fullScreenPopup;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String imagePlacement;
                
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String imageAlignment;
        
        @Setter(AccessLevel.NONE)
        @ValueMapValue
        public String fullWidthImage;

}