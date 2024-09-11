package com.abbott.aem.platform.common.components.models.impl.v1;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.abbott.aem.platform.common.components.models.ImageMapWithStickyMenuItem;

import lombok.Data;

@Data
@Model(adaptables ={ SlingHttpServletRequest.class, Resource.class }, adapters = {
    ImageMapWithStickyMenuItem.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ImageMapWithStickyMenuItemImpl implements ImageMapWithStickyMenuItem {

    @ValueMapValue
    private String storyId;

    @ValueMapValue
    private String storyTitle;

    @ValueMapValue
    private String storyTitleDropdown;

    @ValueMapValue
    private String storyTagline;

    @ValueMapValue
    @Default(values = "left")
    private String position;

    @ValueMapValue
    private String storyIcon;

    @Override
    public String getStoryId() {
        return "par-" + storyId;
    }

}
