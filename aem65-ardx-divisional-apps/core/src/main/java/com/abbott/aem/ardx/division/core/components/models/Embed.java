package com.abbott.aem.ardx.division.core.components.models;

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Embed extends Component {

	public String getIframe();

	public String getType();

	public String getSuccessMessageActOnForms();

	public String getMarketoFormId();

	public String getMarketoMunchkinId();

	public String getActonScript();

	public String getLinktoExternalPage();

	public String getAppendParameter();

	public String getAllowGeoLocation();

	public String getTitle();

	public String getSuccessMessage();

	public String getScrollToTop();

	public String getLazyLoading();

	public String getWidth();

	public String getHeight();

}
