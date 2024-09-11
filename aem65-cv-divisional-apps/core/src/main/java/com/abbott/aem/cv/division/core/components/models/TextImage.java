package com.abbott.aem.cv.division.core.components.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;
@ConsumerType
public interface TextImage extends Component {

    public String getTopRule();

    public String getBottomRule();

    public String getRuleColor();

    public String getTopMargin();

    public String getBottomMargin();

    public String getImageMargin();

    public String getTopImageMargin();

    public String getBottomImageMargin();

    public String getLeftImageMargin();

    public String getRightImageMargin();

    public String getImagePath();

    public String getDecorative();

    public String getAltText();

    public String getImageCta();


    public String getTargetUrl();
    public String getTargetUrlNewWindow();
    public String getAnchorValue();
    public String getPlayerIdValue();
    public String getMediaIdValue();
    public String getVideoIdValue();
    public String getTelePhoneNumber();
    public String getAssetValue();


    public String getCaption();

    public String getCaptionTextColor();

    public String getImagePlacement();

    public String getImageAlignment();

    public String getCaptionPlacement();

    public String getCaptionAlignment();

    public String getHideMobile();
    
    public String getText();

    public String getTextBlockAlignment();

    public String getButtonPlacement();
    public List<Button> getButtonList();
}
