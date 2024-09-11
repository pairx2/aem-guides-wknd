package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

/**
 * Product comparison model interface
 *
 * @author tadigital
 */
@ConsumerType
public interface ProductComparison extends Component {
	List<ProductFeature> getFeatures();

	List<Product> getProducts();

	boolean isTableHeadingRequired();

	boolean isTableLinkRequired();
	
	String getAriaDescription();

	String getStartColor();
	
	String getStartColorPosition();

	String getEndColor();
	
	String getEndColorPosition();
}
