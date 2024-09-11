package com.abbott.aem.corp.division.core.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;
import java.util.List;

@ConsumerType
public interface SectionTitle extends Component {
    /**
     * @return title type
     */
    String getTitleType();

    /**
     * @return story panels which is a multifield
     */
    default List<HubSection> getStoryPanels() {
        throw new UnsupportedOperationException();
    }

    /**
     * @return Image Path for title with Image variation
     */
    String getImage();

    /**
     * @return Alt Text for title with Image variation
     */
    String getAltText();

    /**
     * @return Text on Image for title with Image variation
     */
    String getAwardText();

    /**
     * @return Text Color for the text configured for title with Image variation
     */
    String getTextColor();

    /**
     * @return Title Color for the title for title with Image variation
     */
    String getTitleColor();

    /**
     * @return Title Position for Mobile View for the title for title with Image variation
     */
    String getTitlePosition();

    /**
     * @return Title Font Family
     */
    String getTitleFontFamily();

    /**
     * @return Text Font Family
     */
    String getTextFontFamily();
}
