package com.abbott.aem.bts.cybersecurity.components.model;

import com.abbott.aem.platform.common.components.models.PlatformPage;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface CybersecurityPage extends PlatformPage {


	default String getHomePage() {
		throw new UnsupportedOperationException();
	}


	default String getSignInPage(){
		throw new UnsupportedOperationException();
	}


	default String getApiEndPoint(){
		throw new UnsupportedOperationException();
	}

	default String getInfoPage(){
		throw new UnsupportedOperationException();
	}

	default String getVsiPage(){
		throw new UnsupportedOperationException();
	}
	
	default String getProductPage(){
		throw new UnsupportedOperationException();
	}
	
	default String getTableBodyParams(){
		throw new UnsupportedOperationException();
	}

	default String getProductId(){
		throw new UnsupportedOperationException();
	}


}
