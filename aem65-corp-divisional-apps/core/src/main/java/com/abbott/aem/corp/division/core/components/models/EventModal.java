package com.abbott.aem.corp.division.core.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;
import java.util.List;

@ConsumerType
public interface EventModal extends Component {

    /**
     * @return Event Date value
     */
  public String getEventDate();

    /**
     * @return title value
     */
  public  String getTitle();

    /**
     * @return Button links which is a multifield
     */
  public  List<LinkModal> getLinks();

}
