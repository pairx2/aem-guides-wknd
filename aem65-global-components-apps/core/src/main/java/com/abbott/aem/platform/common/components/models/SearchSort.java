package com.abbott.aem.platform.common.components.models;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class)
public class SearchSort {

    @ValueMapValue
    @Getter
    private String sortingLabel;

    @ValueMapValue
    @Getter
    private String sortingFieldName;

    @ValueMapValue
    @Getter
    private String sortingOrder;
}
