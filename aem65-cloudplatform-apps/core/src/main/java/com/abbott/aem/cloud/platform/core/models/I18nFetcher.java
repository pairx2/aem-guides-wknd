package com.abbott.aem.cloud.platform.core.models;

import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.abbott.aem.cloud.platform.core.services.I18nService;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ToString
@EqualsAndHashCode
@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class I18nFetcher {

    private static final String PN_SITENAME = "siteName";

    @SlingObject
    ResourceResolver resolver;

    @OSGiService
    I18nService i18nService;

    @ScriptVariable
    private Page currentPage;

    @Inject
    private String key;

    @Inject
    private String language;

    @Inject
    private String sitename;

    private Tag tag;

    @PostConstruct
    public void initModel() {
        log.debug("i18n key: {}", key);

        // Application id can also be injected,
        // if that is not passed then use from page properties.
        if (sitename == null) {
            sitename = this.getInheritedPageValues(PN_SITENAME, currentPage.getContentResource(), null);
        }

        tag = i18nService.getTag(sitename, key, resolver);
    }

    public String getTitle() {
        if (tag != null) {
            Locale locale = i18nService.getLocale(language, currentPage);

            return tag.getTitle(locale);
        } else {
            log.error("I18n Key ({}) doesn't exist!", key);
            return "Incorrect i18nKey: " + key;
        }
    }

    public Tag getI18nTag() {
        return this.tag;
    }

    private String getInheritedPageValues(String name, Resource resource, String defaultValue) {
        InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(resource);
        return inheritedProperties.getInherited(name, defaultValue);
    }
}