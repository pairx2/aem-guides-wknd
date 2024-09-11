package com.abbott.aem.an.similac.core.beans;

public class SocialLoginBean {

	private String registrationURL;

	private String accountLinkingURL;

	private String socialLoginSuccessURL;

	private String myOffersURL;

	public String getRegistrationURL() {
		return registrationURL;
	}

	public void setRegistrationURL(String registrationURL) {
		this.registrationURL = registrationURL;
	}

	public String getAccountLinkingURL() {
		return accountLinkingURL;
	}

	public void setAccountLinkingURL(String accountLinkingURL) {
		this.accountLinkingURL = accountLinkingURL;
	}

	public String getSocialLoginSuccessURL() {
		return socialLoginSuccessURL;
	}

	public void setSocialLoginSuccessURL(String socialLoginSuccessURL) {
		this.socialLoginSuccessURL = socialLoginSuccessURL;
	}

	public String getMyOffersURL() {
		return myOffersURL;
	}

	public void setMyOffersURL(String myOffersURL) {
		this.myOffersURL = myOffersURL;
	}
}
