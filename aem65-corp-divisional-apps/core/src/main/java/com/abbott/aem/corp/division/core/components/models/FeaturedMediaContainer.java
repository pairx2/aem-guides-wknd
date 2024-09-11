package com.abbott.aem.corp.division.core.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;
import java.util.List;

@ConsumerType
public interface FeaturedMediaContainer extends Component{


    /**
     * @return titleRequired  value
     */
   public String getTitleRequired();

    /**
     * @return event details multifield values
     */
   public  List<EventModal> getEventDetails();

    /**
     * @return CTALabel value
     */
   public  String getCtaLabel();
    /**
     * @return Calendarbgcolor value
     */
   public  String getCalendarbgcolor();
    /**
     * @return CTALInk value
     */
   public  String getCtaLink();
    /**
     * @return CTA newtab value
     */
   public  String getNewTab();
    /**
     * @return Backgroundcolor value
     */
   public String getBackgroundColor();

    /**
     * @return FileReference value
     */
   public String getFileReference();

   public String getAltText();

}
