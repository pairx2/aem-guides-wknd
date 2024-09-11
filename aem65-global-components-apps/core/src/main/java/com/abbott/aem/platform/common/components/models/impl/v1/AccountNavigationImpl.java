package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.AccountNavigation;
import com.abbott.aem.platform.common.components.models.AccountNavigationItem;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

@Data
@Model(adaptables = SlingHttpServletRequest.class, adapters = AccountNavigation.class, resourceType = AccountNavigationImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AccountNavigationImpl implements AccountNavigation {
    public static final String RESOURCE_TYPE = "abbott-platform/components/content/molecules/accountnavigation/v1/accountnavigation";


    @Inject
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    protected com.day.cq.wcm.api.Page currentPage;

    @ValueMapValue
    @Setter (AccessLevel.NONE)
    private String customerHeader;

    @ChildResource
    @Setter (AccessLevel.NONE)
    public List<AccountNavigationItem> linkMultifield;

    @PostConstruct
    public void initModel() {
        if (linkMultifield != null) {
            for (AccountNavigationItem item : linkMultifield) {
                item.setActiveCss(currentPage.getPath());
            }
        }
    }

}
