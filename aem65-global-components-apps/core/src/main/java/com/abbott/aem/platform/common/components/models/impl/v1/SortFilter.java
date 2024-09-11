package com.abbott.aem.platform.common.components.models.impl.v1;

import lombok.Getter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class)
public class SortFilter {

    @ValueMapValue
    @Getter
    private String fieldName;

    @ValueMapValue
    @Getter
    private String fieldValue;
}
