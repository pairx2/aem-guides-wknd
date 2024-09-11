package com.abbott.aem.ardx.division.core.components.models;
import com.abbott.aem.platform.common.components.models.Button;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ButtonArdx extends Button {

    public String getWistiaVideoId();

    public String getVideoDocumentNumber();

    public String getButtonColor();

    public String getButtonHoverColor();

    public String getTextColor();

    public String getTextHoverColor();

    public String getTopMargin();

    public String getBottomMargin();

    public String getLeftMargin();

    public String getRightMargin();

}