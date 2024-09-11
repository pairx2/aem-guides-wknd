package com.abbott.aem.ardx.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface ArticleDetail extends Component {

    public String getPrimaryAuthorBasicInfo();

    public String getPrimaryAuthorSubInfo();

    public String getSecondaryAuthorBasicInfo();

    public String getSecondaryAuthorSubInfo();

    public String getArticleDate();

    public String getPublishText();

}