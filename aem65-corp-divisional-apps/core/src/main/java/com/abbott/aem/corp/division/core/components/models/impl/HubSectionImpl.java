package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.HubSection;
import com.abbott.aem.platform.common.components.models.utils.PlatformUtil;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {HubSection.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HubSectionImpl implements HubSection {

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String hubStoryCategoryName;


    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String hubStoryCategoryColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String hubCategoryLink;

    /**
     * @return Category Name for Hub Section Title Variation
     */
    @Override
    public String getHubStoryCategoryName() {
        return hubStoryCategoryName;
    }

    /**
     * @return Category Color for Hub Section Title Variation
     */
    @Override
    public String getHubStoryCategoryColor() {
        return hubStoryCategoryColor;
    }


    /**
     * @return Category Link for Hub Section Title Variation
     */
    @Override
    public String getHubCategoryLink() {
        return PlatformUtil.ensureProperLink(hubCategoryLink);
    }
}
