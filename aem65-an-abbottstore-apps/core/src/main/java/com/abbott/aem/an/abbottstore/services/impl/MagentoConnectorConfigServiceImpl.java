package com.abbott.aem.an.abbottstore.services.impl;

import com.abbott.aem.an.abbottstore.services.MagentoConnectorConfigService;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author madhurim
 * This service is used to configure Magento server url for each store
 */
@Component(immediate = true, enabled = true, service = MagentoConnectorConfigService.class ,property = { Constants.SERVICE_DESCRIPTION + "= Abbott Magento Connector Server Configuration Service"} )
@Designate(ocd = MagentoConnectorConfigServiceImpl.Config.class)
public class MagentoConnectorConfigServiceImpl implements MagentoConnectorConfigService {

    private static final Logger LOG = LoggerFactory.getLogger(MagentoConnectorConfigServiceImpl.class);


    @ObjectClassDefinition(name = "Abbott Magento Connector Server Configuration Service", description = "Abbott Magento Connector Server Stores Configuration Service")
    public static @interface Config {
        @AttributeDefinition(name =  "AbbottStore Server URL", description = "AbbottStore Server URL")
        String abbottStoreServer() default "https://int-dev-master-nny7joy-qyzzcwjj2wjmq.us-3.magentosite.cloud/";

        @AttributeDefinition(name = "SimilacStore Server URL", description = "SimilacStore Server URL")
        String similacStoreServer() default "https://dev-apollo.similacstore.com/";

        @AttributeDefinition(name = "GlucernaStore Server URL", description = "GlucernaStore Server URL")
        String glucernaStoreServer() default "https://dev-apollo.glucernastore.com/";


    }
    private String abbottStoreServerUrlConfig;
    private String similacStoreServerUrlConfig;
    private String glucernaStoreServerUrlConfig;

    @Activate
    protected void activate(final Config config) {
        LOG.info("[*** Abbott Configuration Service: activating configuration service");
        this.abbottStoreServerUrlConfig = config.abbottStoreServer();
        LOG.debug("AbbottStore URL: {}" , this.abbottStoreServerUrlConfig);
        this.similacStoreServerUrlConfig = config.similacStoreServer();
        LOG.debug("SimilacStore URL: {}" , this.similacStoreServerUrlConfig);
        this.glucernaStoreServerUrlConfig = config.glucernaStoreServer();
        LOG.debug("GlucernaStore URL:{}" , this.glucernaStoreServerUrlConfig);
    }


    @Override
    public String getAbbottStoreServerUrlConfig() {
        return abbottStoreServerUrlConfig;
    }

    @Override
    public String getSimilacStoreServerUrlConfig() {
        return similacStoreServerUrlConfig;
    }

    @Override
    public String getGlucernaStoreUrlConfig() {
        return glucernaStoreServerUrlConfig;
    }
}
