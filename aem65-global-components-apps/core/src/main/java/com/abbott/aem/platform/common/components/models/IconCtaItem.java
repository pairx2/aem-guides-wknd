package com.abbott.aem.platform.common.components.models;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface IconCtaItem {

	default String getUrlImage(){
		throw new UnsupportedOperationException();
	}
	default String getAltText(){
		throw new UnsupportedOperationException();
	}
	default String getIsDecorative(){
		throw new UnsupportedOperationException();
	}
	default String getIsActive(){
		throw new UnsupportedOperationException();
	}
	default String getCardTitle(){
		throw new UnsupportedOperationException();
	}
	default String getUrl(){
		throw new UnsupportedOperationException();
	}
	default String getButtonText(){
		throw new UnsupportedOperationException();
	}
	default String getButtonType(){
		throw new UnsupportedOperationException();
	}
	default String getTargetnewWindow(){
		throw new UnsupportedOperationException();
	}
	default String getAnchorName(){
		throw new UnsupportedOperationException();
	}
	default String getPhoneNumber(){
		throw new UnsupportedOperationException();
	}
	default String getEmailTemplatePath(){
		throw new UnsupportedOperationException();
	}
	default String getEmailSubject(){
		throw new UnsupportedOperationException();
	}
	default String getVideoURL(){
		throw new UnsupportedOperationException();
	}
	default String getDownloadAsset(){
		throw new UnsupportedOperationException();
	}
	default String getMedID(){
		throw new UnsupportedOperationException();
	}
	default String getVidID(){
		throw new UnsupportedOperationException();
	}
	default String getOrID(){
		throw new UnsupportedOperationException();
	}
	default String getVideoID(){
		throw new UnsupportedOperationException();
	}
	default String getPlayerID(){
		throw new UnsupportedOperationException();
	}
	default String getAccountID(){
		throw new UnsupportedOperationException();
	}
	default String getButtoncolorTheme(){
		throw new UnsupportedOperationException();
	}
	

}
