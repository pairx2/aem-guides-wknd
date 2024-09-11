package com.abbott.aem.corp.division.core.components.models;

import java.util.List;
import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.wcm.core.components.models.Component;

@ConsumerType
public interface BannerModal extends Component{
	
	public List<BannerDetails> getBannerDetails();

}
