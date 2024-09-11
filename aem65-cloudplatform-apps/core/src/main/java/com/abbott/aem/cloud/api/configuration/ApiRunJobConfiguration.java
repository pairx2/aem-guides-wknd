package com.abbott.aem.cloud.api.configuration;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@Component(immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE, service = ApiRunJobConfiguration.class)
@Designate(ocd = ApiRunJobConfiguration.Config.class)
public class ApiRunJobConfiguration {

        @ObjectClassDefinition(name = "Abbott Platform - Run Job API Configuration", description = "Abbott Platform - API Configuration")
        public @interface Config {

            @AttributeDefinition(name = "API Secret Key", description = "All request have to contain below key as a 'apikey' header", defaultValue = "959e3d41-5d97-43c5-a8e0-bd0e160f71ff")
            String getApiKey();
    		
            @AttributeDefinition(name = "ESL API Secret Key", description = "All ESL API request have to contain below key as a 'x-application-access-key' header", defaultValue = "L1sh135Ocm7pX4iKJFymh9JUkgTJdvon2GBkYWDW")
            String getESLApiKey();
            
            @AttributeDefinition(name = "ESL Origin Secret Key", description = "All ESL API request have to contain below key as a 'x-origin-secret' header", defaultValue = "c5b292d1290fce1c463af73ead3897a8")
            String getESLOriginSecretKey();
        }

        private String apiKey;
        private String eslapiKey;
        private String esloriginSecretKey;

        @Activate
        protected void activate(final Config config) {
            this.apiKey = config.getApiKey();
            this.eslapiKey = config.getESLApiKey();
            this.esloriginSecretKey = config.getESLOriginSecretKey();
        }

        public String getApiKey() {
            return apiKey;
        }
        
        public String getESLApiKey() {
            return eslapiKey;
        }
        
        public String getESLOriginSecretKey() {
            return esloriginSecretKey;
        }

}
