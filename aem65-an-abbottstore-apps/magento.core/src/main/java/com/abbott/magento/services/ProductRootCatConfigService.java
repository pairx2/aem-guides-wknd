package com.abbott.magento.services;

public interface ProductRootCatConfigService {

	/**  
	 * @return
	 * Store Name of Magento 
	 */
	public String getStoreName();

	/**
	 * @return
	 * Category Id of the Particular Store 
	 */
	public String getCategoryId();
	
	/**
	 * @return
	 * Category Default Category Path of the particlar
	 * store in Magento
	 */
	public String getDefaultCategory();
	
	/**
	 * @return
	 * Id associated with Magento Store - 
	 * Used to pass Product Rest API to get
	 * fetch products of the particular store
	 */
	public String getStoreID();
	
}