package com.abbott.aem.ardx.division.core.components.models;

import com.abbott.aem.ardx.division.core.components.pojo.ArticleTagItem;
import com.adobe.cq.wcm.core.components.models.Component;

import java.util.List;

public interface ArticleTags extends Component {

    public String getIcon();

    public List<ArticleTagItem> getTagsList();

}