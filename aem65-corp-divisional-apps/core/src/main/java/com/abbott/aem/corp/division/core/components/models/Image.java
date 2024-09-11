package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * Image interface
 */
@ConsumerType
public interface Image extends Component {

    /**
     * Returns Text over Image field value
     * @return textoverImage
     */
    String getTextOverImage();

    /**
     * Returns Hover Text field value
     * @return hoverText
     */
    String getHoverText();

    /**
     * Returns Text Position field value
     * @return textPosition
     */
    String getTextPosition();

    /**
     * Returns Back Border field value
     * @return backBorder
     */
    String getBackBorder();

    /**
     * Returns Text Color field value
     * @return textColor
     */
    String getTextColor();

    /**
     * Returns Zoom Overlay Effect field value
     * @return zoomOverlay
     */
    String getZoomOverlay();

    /**
     * Returns Hover Heading Color field value
     * @return hovertextcolor
     */
    String getHoverTextColor();

    /**
     * Returns Image Overlay field value
     * @return imageOverlay
     */
    String getImageOverlay();

    /**
     * Returns Mobile Image field value
     * @return mobileImage
     */
    String getMobileImage();

}
