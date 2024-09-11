package com.abbott.aem.adc.freestylelibrede.models;

import com.abbott.aem.adc.freestylelibrede.models.injector.annotation.Externalize;
import com.abbott.aem.adc.freestylelibrede.services.ImageService;
import com.adobe.xfa.ut.StringUtils;
import com.day.cq.dam.api.Asset;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.HashMap;
import java.util.Map;

import static com.day.cq.commons.jcr.JcrConstants.JCR_TITLE;
import static com.day.cq.dam.api.DamConstants.DC_DESCRIPTION;
import static com.day.cq.dam.api.DamConstants.DC_TITLE;

@Model(adaptables = Resource.class, resourceType = "adc/freestylelibrede/components/content/image", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageModel {
    @Inject
    ImageService imageService;
    @Inject
    private Asset fileReference;
    @Inject
    private boolean titleValueFromDAM;
    @Inject
    private boolean altValueFromDAM;
    @Inject
    private String alt;
    @Inject
    @Named(JCR_TITLE)
    private String title;
    @Externalize
    private String linkURL;
    @Inject
    private boolean isDecorative;
    private Map<String, String> renditions = new HashMap<>();
    private String damTitle;
    private String damAlt;

    @PostConstruct
    private void init() {
        if (fileReference != null) {
            renditions = imageService.getRenditions(fileReference);

            damTitle = fileReference.getMetadataValue(DC_TITLE);
            damAlt = fileReference.getMetadataValue(DC_DESCRIPTION);
            if (StringUtils.isEmpty(damAlt)) {
                damAlt = damTitle;
            }
        }
    }

    public Map<String, String> getRenditions() {
        return renditions;
    }

    public String getTitle() {
        if (titleValueFromDAM) {
            return damTitle;
        } else return title;
    }

    public String getAlt() {
        if (altValueFromDAM) {
            return damAlt;
        } else return alt;
    }

    public String getLinkURL() {
        return linkURL;
    }

    public boolean isDecorative() {
        return isDecorative;
    }
}
