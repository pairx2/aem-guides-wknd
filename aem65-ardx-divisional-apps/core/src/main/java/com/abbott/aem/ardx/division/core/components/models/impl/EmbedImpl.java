package com.abbott.aem.ardx.division.core.components.models.impl;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.ardx.division.core.components.models.Embed;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {Embed.class,ComponentExporter.class}, 
resourceType = {EmbedImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class EmbedImpl implements Embed {

        public static final String RESOURCE_TYPE = "ardx/division/components/content/ardx-embed";
        private static final String FULL_WIDTH = "100";
        private static final String PERCENTAGE = "%";

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String iframe;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String marketoFormId;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String type;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String successMessage;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String successMessageActOnForms;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String marketoMunchkinId;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String actonScript;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String linktoExternalPage;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String appendParameter;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String allowGeoLocation;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String title;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String scrollToTop;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String lazyLoading;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String width;

        @ValueMapValue
        @Setter(AccessLevel.NONE)
        private String height;

        @Override
        public String getWidth() {
                if (StringUtils.isBlank(width)){
                        return FULL_WIDTH + PERCENTAGE;
                }else {
                        return width + PERCENTAGE;
                }
        }
}