package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.LanguageNavigation;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { Resource.class, SlingHttpServletRequest.class},
        adapters = {LanguageNavigation.class , ComponentExporter.class},
        resourceType = {LanguageNavigationImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class LanguageNavigationImpl implements LanguageNavigation {

    public static final String RESOURCE_TYPE = "corp/division/component/content/languagenavigation";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String linkPath;

    @Override
    public String getLinkPath() {
        return PlatformUtil.ensureProperLink(linkPath);
    }
}