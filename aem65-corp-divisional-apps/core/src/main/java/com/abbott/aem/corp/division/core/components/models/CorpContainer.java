package com.abbott.aem.corp.division.core.components.models;
import com.abbott.aem.platform.common.components.models.Container;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CorpContainer extends Container,HeroBanner {
    /**
     * @return Image Variation
     */
    public String getImageVariation();

    /**
     * @return Image
     */
  public String getBackgroundImageReference();
}
