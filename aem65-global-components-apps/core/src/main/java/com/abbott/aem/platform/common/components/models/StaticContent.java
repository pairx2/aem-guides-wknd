package com.abbott.aem.platform.common.components.models;

import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface StaticContent  extends Component{
	
	default String getTagName() { throw new UnsupportedOperationException(); }
	
	default String getTagHeadingColor() { throw new UnsupportedOperationException(); }
	
	default String getSeeMoreLink() { throw new UnsupportedOperationException(); }
	
	default List<Resource> getLinks() { throw new UnsupportedOperationException(); }

	default String getContentType() { throw new UnsupportedOperationException(); }

	default int getColumnLayout() { throw new UnsupportedOperationException(); }
	
	default int getImageColumnSize() { throw new UnsupportedOperationException(); }
	
	default int getTextColumnSize() { throw new UnsupportedOperationException(); }

	default List<Map<String, String>> getProductDetails() { throw new UnsupportedOperationException(); }

	default Boolean isCardBorderRequired() { throw new UnsupportedOperationException(); }

}
