package com.abbott.aem.corp.division.core.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface HubSection extends Component {
    /**
     * @return Category Name for Hub Section
     */
    String getHubStoryCategoryName();

    /**
     * @return Category Color for Hub Section
     */

    String getHubStoryCategoryColor();

    /**
     * @return Category Link for Hub Section
     */
    String getHubCategoryLink();
}
