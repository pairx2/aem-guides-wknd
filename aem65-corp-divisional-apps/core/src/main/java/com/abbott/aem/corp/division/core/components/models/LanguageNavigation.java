package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface LanguageNavigation extends Component {

    /**
     * Return Path that needs to be configured for flag
     * @return
     */
    String getLinkPath();
}
