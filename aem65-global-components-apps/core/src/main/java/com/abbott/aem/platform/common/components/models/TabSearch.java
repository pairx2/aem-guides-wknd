package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.abbott.aem.platform.common.components.pojo.TitleTagBean;
import com.adobe.cq.wcm.core.components.models.Component;

import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

/**
 * The Interface TabSearch.
 */
@ConsumerType
public interface TabSearch extends Component {

    /**
     * Gets the field name.
     *
     * @return the field name
     */
    default String getFieldName() {
        throw new UnsupportedOperationException();
    }

    /**
     * Gets the search categories.
     *
     * @return the search categories
     */
    List<TitleTagBean> getSearchCategories();

    /**
     * Gets the category.
     *
     * @return the category
     */
    default List<Resource> getCategory() {
        throw new UnsupportedOperationException();
    }

}