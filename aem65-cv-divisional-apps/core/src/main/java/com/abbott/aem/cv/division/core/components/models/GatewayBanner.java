package com.abbott.aem.cv.division.core.components.models;

import java.util.List;
import com.adobe.cq.wcm.core.components.models.Component;


public interface GatewayBanner extends Component {

    public String getTitle();

    public String getHeadingTag();

    public String getHeadingStyle();

    public String getTitleColor();

    public String getSubTitle();

    public String getSubTitleHeadingTags();

    public String getSubtitleHeadingStyle();

    public String getDescriptionColors();

    public String getBgColor();

    public String getBgType();

    public String getHeightControl();

    public String getBannerImagePath();

    public String getDecorative();

    public String getBannerImageAlttext();

    public String getMobileImage();

    public String getRemoveMarginTop();

    public String getRemoveMarginBottom();

    public String getPanelColor();

    public String getLayout();

    public String getPanelTitleHeadingTag();

    public List<GatewayBanneritem> getGatewayBannerPanel();


}