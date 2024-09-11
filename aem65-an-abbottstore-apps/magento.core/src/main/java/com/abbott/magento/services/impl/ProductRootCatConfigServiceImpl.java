package com.abbott.magento.services.impl;

import com.abbott.magento.services.ProductRootCatConfigService;
import com.abbott.magento.services.ProductRootCatConfigs;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = ProductRootCatConfigService.class, immediate = true)
@Designate(ocd = ProductRootCatConfigs.class, factory = true)
public class ProductRootCatConfigServiceImpl implements ProductRootCatConfigService {
	
	private ProductRootCatConfigs config;

	@Activate
	protected void activate(ProductRootCatConfigs config) {
		this.config = config;
	}

	@Override
	public String getStoreName() {
		return config.getStoreName();
	}

	@Override
	public String getCategoryId() {
		return config.getCategoryId();
	}

	@Override
	public String getDefaultCategory() {
		return config.getDefaultCategory();
	}

	@Override
	public String getStoreID() {
		return config.storeId();
	}

}