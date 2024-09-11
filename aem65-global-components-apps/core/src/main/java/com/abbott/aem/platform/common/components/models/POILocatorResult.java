package com.abbott.aem.platform.common.components.models;

import java.util.List;

import com.adobe.cq.wcm.core.components.models.Component;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface POILocatorResult extends Component {

	String getMapAlignment();

	 String getDoctorName();

	 String getDeviceType();
			
	 String getSearchResultText();

	 String getNoResultFoundText();
	
	 String getDistanceLabelText();
	
	 String getAddressLabelText();

	 String getTelephoneLabelText();  

	
	 String getEmailAddressLabelText();

	 String getGetWebsiteIcon();
	
	 String getWebsiteUrlLabelText();
	
	 String getGetDirectionIcon();

	 String getGetDirectionsLinkLabelText();
	
	 String getPageResult() ;
	 String getResultLabel() ;

	 String getShowPagination() ;

	 String getListLabel() ;

	 String getGridLabel() ;
	 String getPrintLabel() ;

	public List<POILocatorResultItems> getPoiLocatorResultList();
}
