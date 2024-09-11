package com.abbott.aem.corp.division.core.components.models;
import com.abbott.aem.platform.common.components.models.TilesWithBackgroundImage;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TileWithBackgroundImage extends TilesWithBackgroundImage {
    /**
     * @return Notch Type
     */
   public String getNotchType();

    /**
     * @return True/False for hiding the curve in Desktop
     */
   public boolean isHideCurveDesktop();

    /**
     * @return True/False for hiding the curve in Mobile
     */
   public  boolean isHideCurveMobile();

    public String getSvgId();

    /**
     * @return mobile Variation
     */
    public  String getMobileVariation();
    /**
     * @return Notch Color for Mobile View
     */
    public String getMobileNotchColor();
    /**
     * @return Notch Type
     */
    public  String getMobileNotchType();
    /**
     * @return True/False for Extra curve in Desktop
     */
    public  String getExtraCurveMobile();

    /**
     * @return Notch color for extra curve in mobile
     */
    public String getExtraMobileNotchColor();
    /**
     * @return Notch color for extra curve in mobile
     */
    public String getExtranotchType();
    /**
     * @return Mobile title color
     */
    public String getMobileTitleColor();
    /**
     * @return Desktop title color
     */
    public  String getDesktopTitleColor();
    /**
     * @return background color for title in mobile
     */
    public  String getBackgroundColor();
    /**
     * @return Image Size
     */
    public  String getImageSize();


}
