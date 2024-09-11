package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.VideoCarouselItem;
import com.abbott.aem.cv.division.core.components.models.VideoCarousel;
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

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { VideoCarousel .class,
                ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class VideoCarouselImpl implements VideoCarousel {

        @Getter
        @ValueMapValue
        public String title;

        @Getter
        @ValueMapValue
        public String description;
        
        @Getter
        @ValueMapValue
        public String cardsPerScroll;
        
        @Getter
        @ValueMapValue
        public String id;
		
        @Getter
        @ValueMapValue
        public String iconRight;
		
        @Getter
        @ValueMapValue
        public String iconLeft;
        
        @Getter
        @ValueMapValue
        public String accessibilityLabel;
        
        @ChildResource
        @Getter
        private List<VideoCarouselItem> chapterlist;        
}
