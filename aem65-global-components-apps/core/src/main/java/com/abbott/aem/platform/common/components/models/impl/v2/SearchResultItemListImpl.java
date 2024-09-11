package com.abbott.aem.platform.common.components.models.impl.v2;


import com.abbott.aem.platform.common.components.models.SearchResultItemList;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class,
        adapters = { SearchResultItemList.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
		extensions = ExporterConstants.SLING_MODEL_EXTENSION)        
public class SearchResultItemListImpl implements SearchResultItemList{

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    private String resultKey;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    private String resultLabel;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    private String selectType;

    @Setter(AccessLevel.NONE)
    @Getter
    @ValueMapValue
    private String urlLink;

}
