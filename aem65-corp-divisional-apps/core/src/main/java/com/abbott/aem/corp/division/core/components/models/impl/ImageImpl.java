package com.abbott.aem.corp.division.core.components.models.impl;

import com.abbott.aem.corp.division.core.components.models.Image;
import lombok.AccessLevel;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Model impl for Image
 */
@Model(adaptables = {Resource.class, SlingHttpServletRequest.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL, adapters = {Image.class})
public class ImageImpl implements Image {
    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String textOverImage;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String hoverText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String textPosition;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String backBorder;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String textColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String zoomOverlay;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String imageOverlay;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String hoverTextColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String mobileImage;

    /**
     * Returns the Text Over Image field value
     * @return textOverImage
     */
    @Override
    public String getTextOverImage() {
        return textOverImage;
    }

    /**
     * Returns the Hover Text field value
     * @return hoverText
     */
    @Override
    public String getHoverText() {
        return hoverText;
    }

    /**
     * Returns Text Position field value
     * @return textPosition
     */
    @Override
    public String getTextPosition() {
        return textPosition;
    }

    /**
     * Returns Back Border field value
     * @return backBorder
     */
    @Override
    public String getBackBorder() {
        return backBorder;
    }

    /**
     * Returns Text Color field value
     * @return textColor
     */
    @Override
    public String getTextColor() {
        return textColor;
    }

    /**
     * Returns Zoom Overlay Effect field value
     * @return zoomOverlay
     */
    @Override
    public String getZoomOverlay() {
        return zoomOverlay;
    }

    /**
     * Returns Image Overlay field value
     * @return imageOverlay
     */
    @Override
    public String getImageOverlay() {
        return imageOverlay;
    }

    /**
     * Returns Hover Text Color field value
     * @return hoverTextColor
     */
    @Override
    public String getHoverTextColor() {
        return hoverTextColor;
    }

    /**
     * Returns Mobile Image field value
     * @return mobileImage
     */
    @Override
    public String getMobileImage() {
        return mobileImage;
    }
}
