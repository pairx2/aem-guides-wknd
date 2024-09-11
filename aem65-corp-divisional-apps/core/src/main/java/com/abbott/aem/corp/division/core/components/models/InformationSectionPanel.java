package com.abbott.aem.corp.division.core.components.models;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface InformationSectionPanel extends HeroBanner{


    /**
     * @return Image Variation
     */
    String getImageVariation();

    /**
     * @return Notch Color for Mobile View
     */
    String getFileReference();

    /**
     * @return Alt for Image
     */
    String getAltText();

}
