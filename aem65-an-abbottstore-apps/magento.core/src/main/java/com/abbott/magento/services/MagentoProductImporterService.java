package com.abbott.magento.services;

import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.MagentoProduct;
import org.apache.sling.api.resource.ResourceResolver;

public interface MagentoProductImporterService {
	
	public String getProductPagesRootPath(String storeName);
	
	public void addAndUpdateProducts(ResourceResolver resourceResolver, String productPath, MagentoProduct magentoProduct, String token, MagentoConnectorService magentoConnectorService, String storeName, String storeServer);

	public void deleteProductPage(ResourceResolver resourceResolver, String storeName, MagentoProduct productObject, String contentRoot, String token, MagentoConnectorService magentoConnectorService, String storeServer);

	public void processCustomVariationsTagsMetadata(ResourceResolver resourceResolver,String value,String path, String token, MagentoConnectorService magentoConnectorService);
}
