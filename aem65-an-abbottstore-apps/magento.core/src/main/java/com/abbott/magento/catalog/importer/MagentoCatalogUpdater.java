/*package com.abbott.magento.catalog.importer;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.SimpleCredentials;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.MagentoProduct;
import com.abbott.magento.catalog.connector.models.MagentoProductList;
import com.day.cq.polling.importer.Importer;

@Component(metatype = false, enabled= true, label = "Magento 2 Catalog Updater")
@Service(Importer.class)
@Properties(value = {
    @Property(name = Constants.SERVICE_DESCRIPTION, value = "Magento 2 Catalog Updater"),
    @Property(name = Constants.SERVICE_VENDOR, value = "abbott Digital"),
    @Property(name = Importer.SCHEME_PROPERTY, value = "magento")
})

public class MagentoCatalogUpdater implements Importer {

    @Reference
    ResourceResolverFactory resourceResolverFactory;

    private static final Logger log = LoggerFactory.getLogger(MagentoCatalogUpdater.class);
    private static final String LAST_IMPORT="lastImport";
    public static final String FORWARD_SLASH = "/";

    public void importData(String scheme, String dataSource, Resource target) {
    	throw new UnsupportedOperationException();
    }


    @Override
    public void importData(String schema, String datasource, Resource resource, String login, String password) {

    	ResourceResolver resourceResolver=null;
        resourceResolver = getResourceResolver("admin","admin");
        String lastImport = "";
        Session session=null;
        ValueMap prodResourceVM;
        String storePath = resource.getPath();
        MagentoConnectorService connectorService = new MagentoConnectorService(datasource, "tadigital", "admin@1234");
        MagentoProductImporter productImporter = new MagentoProductImporter(connectorService);
        String token = null;
		if (null != resourceResolver) {
			session = resourceResolver.adaptTo(Session.class);

			prodResourceVM = resourceResolver.getResource(storePath).adaptTo(ModifiableValueMap.class);

			if (prodResourceVM != null && prodResourceVM.get(LAST_IMPORT) != null) {
				lastImport = prodResourceVM.get(LAST_IMPORT, String.class);
			}
			token = connectorService.getToken();
			log.info("Getting Token  --->> {} ", token);

			MagentoProductList response = connectorService.updateProductList(lastImport);
			log.info("Number of Items {}", response.getItems().length);

			for (MagentoProduct item : response.getItems()) {

				Resource productResource = resourceResolver.getResource(getProductPath(storePath, item.sku));
				// addUpdateProduct(resourceResolver, productResource, storePath, item,
				// productImporter);
			}

			Calendar cal = Calendar.getInstance();
			SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			lastImport = format1.format(cal.getTime()) + ":00";
			if (prodResourceVM != null) {
				prodResourceVM.put(LAST_IMPORT, lastImport);
			}

			try {
				session.save();
			} catch (RepositoryException e) {
				log.error("RepositoryException in lastImport: {}", e);
			} finally {
				if (resourceResolver.isLive()) {
					resourceResolver.close();
				}
			}
		}

    }

    protected String getProductPath(String storePath, String sku) {

        String productSKU = sku;
        boolean variation = false;

        if (sku.contains(".")) {
            productSKU = sku.substring(0, sku.indexOf('.'));
            variation = true;
        }
		String path = String.format("%1$s%2$s%3$s%2$s%4$s%2$s%5$s", storePath, FORWARD_SLASH, sku.substring(0, 2),
				sku.substring(0, 4), productSKU);
        if (variation) {
            path += FORWARD_SLASH + sku;
        }
        return path;
    }

    private ResourceResolver getResourceResolver(String user, String password) {
        Map<String, Object> authInfo = new HashMap<>();
        final SimpleCredentials credentials = new SimpleCredentials(user, password.toCharArray());
        authInfo.put(JcrResourceConstants.AUTHENTICATION_INFO_CREDENTIALS, credentials);
        ResourceResolver resourceResolver = null;

        try {
            resourceResolver = resourceResolverFactory.getResourceResolver(authInfo);
        } catch (LoginException e) {
			log.error("Unexpected LoginException:{}", e);

        }
        return resourceResolver;
    }


}*/