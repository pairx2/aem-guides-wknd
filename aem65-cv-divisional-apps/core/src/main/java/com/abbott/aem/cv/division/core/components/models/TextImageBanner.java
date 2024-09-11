package com.abbott.aem.cv.division.core.components.models;
import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface TextImageBanner extends Component {

    public String getBackgroundColors();

    public String getTopMargin();

    public String getBottomMargin();

    public String getImagePlacement();
    public String getText();

    public List<Button> getButtonList();
}