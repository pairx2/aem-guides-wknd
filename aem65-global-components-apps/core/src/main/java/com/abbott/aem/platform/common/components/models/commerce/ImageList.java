package com.abbott.aem.platform.common.components.models.commerce;

import com.adobe.cq.wcm.core.components.models.Component;
import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ProviderType;

import java.util.List;

@ProviderType
public interface ImageList extends Component {

    List<Resource> getImageList();
}
