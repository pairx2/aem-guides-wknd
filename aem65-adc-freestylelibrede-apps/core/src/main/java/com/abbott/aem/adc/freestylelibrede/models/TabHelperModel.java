package com.abbott.aem.adc.freestylelibrede.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;


@Model(adaptables = {SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TabHelperModel {

    private static final Logger LOGGER = LoggerFactory.getLogger(EditorModel.class);

    @Inject
    private ResourceResolver resolver;

    @Inject
    private String path;


    private AccountOverviewModel accountOverviewModel;


    @PostConstruct
    private void initModel() {
        if (StringUtils.isNotBlank(path)) {
            LOGGER.debug("path={}", path);
            Resource res = resolver.getResource(path);
            if (res != null) {
                LOGGER.debug("Resource found at path={}", path);
                accountOverviewModel = res.adaptTo(AccountOverviewModel.class);
            } else {
                LOGGER.warn("Resource NOT found at path={}", path);
            }
        }
    }

    /**
     * @return the iconClass
     */
    public String getIconClass() {
        return (accountOverviewModel != null) ? accountOverviewModel.getIconClass() : "";
    }

    /**
     * @return the iconClass
     */
    public String getAccountNavEvent() {
        return (accountOverviewModel != null) ? accountOverviewModel.getAccountNavEvent() : "";
    }

    public String getCreatedId() {
        return accountOverviewModel != null ? accountOverviewModel.getCreatedId() : "";
    }
}
