package com.abbott.aem.cv.division.core.components.models.impl;

import com.abbott.aem.cv.division.core.components.models.Button;
import com.abbott.aem.cv.division.core.components.models.TextImage;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;


import lombok.Getter;

import java.util.List;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { TextImage.class,
        ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class TextImageImpl implements TextImage {

        @Getter
        @ValueMapValue
        public String topRule;

        @Getter
        @ValueMapValue
        public String bottomRule;

        @Getter
        @ValueMapValue
        public String ruleColor;

        @Getter
        @ValueMapValue
        public String topMargin;

        @Getter
        @ValueMapValue
        public String bottomMargin;

        @Getter
        @ValueMapValue
        public String imageMargin;


        @Getter
        @ValueMapValue
        public String topImageMargin;

        @Getter
        @ValueMapValue
        public String bottomImageMargin;

        @Getter
        @ValueMapValue
        public String leftImageMargin;

        @Getter
        @ValueMapValue
        public String rightImageMargin;

        @Getter
        @ValueMapValue
        public String imagePath;

        @Getter
        @ValueMapValue
        public String decorative;

        @Getter
        @ValueMapValue
        public String altText;

        @Getter
        @ValueMapValue
        public String imageCta;

        @Getter
        @ValueMapValue
        public String targetUrl;

        @Getter
        @ValueMapValue
        public String targetUrlNewWindow;

        @Getter
        @ValueMapValue
        public String anchorValue;

        @Getter
        @ValueMapValue
        public String playerIdValue;

        @Getter
        @ValueMapValue
        public String mediaIdValue;

        @Getter
        @ValueMapValue
        public String videoIdValue;

        @Getter
        @ValueMapValue
        public String telePhoneNumber;

        @Getter
        @ValueMapValue
        public String assetValue;

        @Getter
        @ValueMapValue
        public String caption;

        @Getter
        @ValueMapValue
        public String captionTextColor;

        @Getter
        @ValueMapValue
        public String imagePlacement;

        @Getter
        @ValueMapValue
        public String imageAlignment;

        @Getter
        @ValueMapValue
        public String captionPlacement;

        @Getter
        @ValueMapValue
        public String captionAlignment;

        @Getter
        @ValueMapValue
        public String hideMobile;

        @Getter
        @ValueMapValue
        public String text;

        @Getter
        @ValueMapValue
        public String textBlockAlignment;

        @Getter
        @ValueMapValue
        public String buttonPlacement;

        @ChildResource
        @Getter
        public List<Button> buttonlist;

        @Override
        public List<Button> getButtonList() {
                return buttonlist;
        }
}
