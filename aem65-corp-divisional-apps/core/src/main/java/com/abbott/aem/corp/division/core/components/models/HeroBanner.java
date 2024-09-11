package com.abbott.aem.corp.division.core.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface HeroBanner extends Component {
    /**
     * @return Notch Type
     */
	public String getNotchType();

    /**
     * @return Notch color for Desktop
     */

	public String getDesktopNotchColor();

    /**
     * @return Notch Color for Mobile View
     */
	public String getMobileNotchColor();

    /**
     * @return True/False for hiding the curve in Desktop
     */
	public boolean isHideCurveDesktop();

    public boolean isHideCurveTab();

    /**
     * @return True/False for hiding the curve in Mobile
     */
    public boolean isHideCurveMobile();

    /**
     * @return True/False for Extra curve in Desktop
     */
    public String getExtraCurveMobile();

    /**
     * @return Notch color for extra curve in mobile
     */
    public String getExtraMobileNotchColor();

    /**
     * @return Notch color for extra curve in mobile
     */
    public String getExtranotchType();

    public String getSvgId();
}
