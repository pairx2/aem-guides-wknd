package com.abbott.aem.corp.division.core.components.models.impl;
import com.abbott.aem.corp.division.core.components.models.HubSection;
import com.abbott.aem.corp.division.core.components.models.SectionTitle;
import com.adobe.cq.export.json.ExporterConstants;
import lombok.AccessLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Model(adaptables = {SlingHttpServletRequest.class}, adapters = {SectionTitle.class}, resourceType = {SectionTitleImpl.RESOURCE_TYPE}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SectionTitleImpl implements SectionTitle {
    public static final String RESOURCE_TYPE = "corp/division/component/content/sectiontitle";

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String titleType;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String image;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String altText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String awardText;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String textColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String titleColor;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String titlePosition;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String titleFontFamily;

    @ValueMapValue
    @Setter(AccessLevel.NONE)
    public String textFontFamily;

    /**
     * @return Title Type to choose out of two variation
     */
    @Override
    public String getTitleType() {
        return titleType;
    }

    @ChildResource
    @Setter(AccessLevel.NONE)
    public List<HubSection> storyPanels;


    /**
     * @return Image Path for title with background Image Variation
     */
    @Override
    public String getImage() {
        return image;
    }

    /**
     * @return Image Alt Text for title with background Image Variation
     */
    @Override
    public String getAltText() {
        return altText;
    }

    /**
     * @return Text for title with background Image Variation
     */
    @Override
    public String getAwardText() {
        return awardText;
    }

    /**
     * @return Text Color for title with background Image Variation
     */
    @Override
    public String getTextColor() {
        return textColor;
    }

    /**
     * @return Title Color for title with background Image Variation
     */
    @Override
    public String getTitleColor() {
        return titleColor;
    }

    /**
     * @return Title Position for Mobile View for title with background Image Variation
     */

    @Override
    public String getTitlePosition() {
        return titlePosition;
    }

    /**
     * @return Title Font Family
     */

    @Override
    public String getTitleFontFamily() {
        return titleFontFamily;
    }

    /**
     * @return Text Font Family
     */

    @Override
    public String getTextFontFamily() {
        return textFontFamily;
    }
}
