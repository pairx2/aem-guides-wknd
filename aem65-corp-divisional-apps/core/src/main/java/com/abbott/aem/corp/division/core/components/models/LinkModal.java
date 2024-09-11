package com.abbott.aem.corp.division.core.components.models;
import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface LinkModal extends Component {

    /**
     * @return InvestorLabel value
     */
   public String getInvestorLabel();

    /**
     * @return InvestorLink value
     */
   public  String getInvestorLink();

    /**
     * @return newtab value
     */
   public  String getNewTab();
}
