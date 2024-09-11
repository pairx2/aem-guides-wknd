package com.abbott.aem.platform.common.components.models.impl.v1;

import com.abbott.aem.platform.common.components.models.AccountNavigationItem;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Data
@Model(adaptables = Resource.class,
        adapters = {AccountNavigationItem.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccountNavigationItemImpl implements AccountNavigationItem {

    private static final String ACTIVE_CSS_CLASS = "m-account-navigation__item--active";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String icon;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String linkText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String linkPath;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String actionFunction;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    private String customerAttr;

    @Getter
    private String activeCss;

    public void setActiveCss(String pagePath) {
        if (linkPath != null && ((pagePath.equalsIgnoreCase(linkPath) || StringUtils.contains(linkPath, pagePath)) || StringUtils.startsWith(pagePath, linkPath))) {
            activeCss = ACTIVE_CSS_CLASS;
        }
    }
}
