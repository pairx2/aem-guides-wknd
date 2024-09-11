/**
 * 
 */
package com.abbott.aem.av.division.core.components.models;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

/**
 * @author XRX9
 *
 */

@ConsumerType
public interface ProductCategory extends Component {

	public String getShowMoreDesktop();
	public String getShowMoreTablet();
	public String getShowMoreMobile();
	public String getShowMoreDesktopSubCategory();
	public String getShowMoreTabletSubCategory();
	public String getShowMoreMobileSubCategory();
	public String getEslEndPoint();


}
