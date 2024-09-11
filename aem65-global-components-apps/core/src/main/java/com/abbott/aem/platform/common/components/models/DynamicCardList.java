package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

import javax.jcr.RepositoryException;
import javax.xml.parsers.ParserConfigurationException;
import java.util.List;

@ConsumerType
public interface DynamicCardList extends Component {

    
    public List<Page> getListOfCards() throws ParserConfigurationException, RepositoryException;

    public String getFilePath();


    public Resource getRes();

    public String getImageDefault();

    public String getLogoImage();

    public String getCenterMode();

    public String getVariableWidth();

    public String getArrows();

    public String getDateFormat();

    public String getTitle();

    public String getNoOfResults();
}