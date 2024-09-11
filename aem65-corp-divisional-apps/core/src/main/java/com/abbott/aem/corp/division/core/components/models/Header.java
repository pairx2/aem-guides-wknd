package com.abbott.aem.corp.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;
@ConsumerType
public interface Header extends Component {

    /**
     * Return authored link stack count
     * @return
     */
    int getLinkStackCount();

    /**
     * Method to return the list of linkstacks
     * @return linkstack
     */
    List<String> getListOfLinkStack();
}
