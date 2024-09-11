package com.abbott.aem.cv.division.core.components.models.impl;
import com.abbott.aem.cv.division.core.components.models.Button;
import com.abbott.aem.cv.division.core.components.models.TextImageBanner;

import com.adobe.cq.export.json.ComponentExporter;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;

import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;

@Model(adaptables = {SlingHttpServletRequest.class }, adapters = { TextImageBanner.class,
        ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class TextImageBannerImpl implements TextImageBanner{

    @Getter
    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String backgroundColors;

    @Getter
    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String topMargin;

    @Getter
    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String bottomMargin;

    @Getter
    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String imagePlacement;

    @Getter
    @Setter(AccessLevel.NONE)
    @ValueMapValue
    public String text;

    @ChildResource
    @Getter
    public List<Button> buttonlist;

    @Override
    public List<Button> getButtonList() {
        return buttonlist;
    }
}