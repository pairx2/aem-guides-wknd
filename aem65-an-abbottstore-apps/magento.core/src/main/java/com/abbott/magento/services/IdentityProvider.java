package com.abbott.magento.services;

public interface IdentityProvider {

	public  String getServer();
	public String getAdminUser();
	public  String getAdminPassword();
	public String getMagentoAdminTokenKey();
}
