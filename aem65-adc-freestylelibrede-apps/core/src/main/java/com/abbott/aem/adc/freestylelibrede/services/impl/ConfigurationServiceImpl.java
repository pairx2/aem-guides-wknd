package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.adc.freestylelibrede.services.ConfigurationService;

@Component(
		service = ConfigurationService.class,
		immediate = true,
		configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = ConfigurationServiceImpl.Configuration.class)
public class ConfigurationServiceImpl implements ConfigurationService{

	/** The properties map containing all the values configured. */
	private Map<String, Object> propertiesMap;

	/**
	 * Activate method.
	 *
	 * @param properties the properties
	 */

	@Activate
	public void activate(Configuration configuration){
		propertiesMap = new HashMap<String,Object>();
		propertiesMap.put("graphql.backend.endpoint", configuration.graphql_backend_endpoint());
		propertiesMap.put("i18n.service.url", configuration.i18n_service_url());
		propertiesMap.put("esl.service.endpoint", configuration.esl_service_endpoint());
		propertiesMap.put("esl.application.id", configuration.esl_application_id());
		propertiesMap.put("rest.backend.endpoint", configuration.rest_backend_endpoint());
		propertiesMap.put("cognito.clientapp.id", configuration.cognito_clientapp_id());
		propertiesMap.put("cognito.region", configuration.cognito_region());
		propertiesMap.put("cognito.userpool.id", configuration.cognito_userpool_id());
		propertiesMap.put("cognito.identitypool.id", configuration.cognito_identitypool_id());
		propertiesMap.put("cognito.facebook.id", configuration.cognito_facebook_id());
		propertiesMap.put("cognito.google.id", configuration.cognito_google_id());
		propertiesMap.put("cognito.domain", configuration.cognito_domain());
		propertiesMap.put("coveo.backend.endpoint", configuration.coveo_backend_endpoint());
		propertiesMap.put("coveo.site", configuration.coveo_site());
		propertiesMap.put("arvato.typeahead.endpoint", configuration.arvato_typeahead_endpoint());
		propertiesMap.put("dhl.tracking.url", configuration.dhl_tracking_url());
		propertiesMap.put("ibm.ocr.endpoint", configuration.ibm_ocr_endpoint());
		propertiesMap.put("onetrust.domain", configuration.onetrust_domain());
		propertiesMap.put("pdp.product.url", configuration.pdp_product_url());
		propertiesMap.put("login.page.path", configuration.login_page_path());
		propertiesMap.put("unsupported.browser.page.path", configuration.unsupported_browser_page_path());
		propertiesMap.put("gtm.data.layer", configuration.gtm_data_layer());
		propertiesMap.put("enable.decibel.script", configuration.enable_decibel_script());
		propertiesMap.put("enable.esl.authentication", configuration.enable_esl_authentication());
		propertiesMap.put("enable.adobe.analytics.tracking", configuration.enable_adobe_analytics_tracking());
		propertiesMap.put("enable.google.analytics.tracking", configuration.enable_google_analytics_tracking());
		propertiesMap.put("ab.environment.name", configuration.ab_environment_name());
		propertiesMap.put("orc.arvato.script.url", configuration.orc_arvato_script_url());
		propertiesMap.put("enable.esl.social.login", configuration.enable_esl_social_login());
	}

	/**
	 * Gets the properties map.
	 *
	 * @return the propertiesMap
	 */
	public Map<String,Object> getPropertiesMap() {
		return propertiesMap;
	}


	@SuppressWarnings("squid:S00100")
	@ObjectClassDefinition(name = "Configuration Service Impl")
	protected static @interface Configuration {
		@AttributeDefinition(
				name = "graphql.backend.endpoint"
		)
		String graphql_backend_endpoint() default "https://nonprod-api.adcapps.net/api/proxy/graphql-proxy-api-dev";

		@AttributeDefinition(
				name = "i18n.service.url"
		)
		String i18n_service_url() default "/bin/adc/freestylelibrede/i18n.de.json";

		@AttributeDefinition(
				name = "esl.service.endpoint"
		)
		String esl_service_endpoint() default "https://dev.services.abbott";

		@AttributeDefinition(
				name = "esl.application.id"
		)
		String esl_application_id() default "freestylelibre";

		@AttributeDefinition(
				name = "rest.backend.endpoint"
		)
		String rest_backend_endpoint() default "https://nonprod-api.adcapps.net/api/adc-aem-exp-api-dev";

		@AttributeDefinition(
				name = "cognito.clientapp.id"
		)
		String cognito_clientapp_id() default "6beu5ch5kvsvjbgq1caurtrlkc";

		@AttributeDefinition(
				name = "cognito.region"
		)
		String cognito_region() default "eu-central-1";

		@AttributeDefinition(
				name = "cognito.userpool.id"
		)
		String cognito_userpool_id() default "eu-central-1_gHVGTjsEa";

		@AttributeDefinition(
				name = "cognito.identitypool.id"
		)
		String cognito_identitypool_id() default "";

		@AttributeDefinition(
				name = "cognito.facebook.id"
		)
		String cognito_facebook_id() default "937645003354588";

		@AttributeDefinition(
				name = "cognito.google.id"
		)
		String cognito_google_id() default "338363371210-rnhv3vlkgo3rmuig2kh8m2vl4pe97om9.apps.googleusercontent.com";

		@AttributeDefinition(
				name = "cognito.domain"
		)
		String cognito_domain() default "abbottdev.auth.eu-central-1.amazoncognito.com";

		@AttributeDefinition(
				name = "coveo.backend.endpoint"
		)
		String coveo_backend_endpoint() default "https://nonprod-api.adcapps.net/api/proxy/adc-coveo-proxy-dev/public/search/sitesearch";

		@AttributeDefinition(
				name = "coveo.site"
		)
		String coveo_site() default "dev-nextgen-fsl.adcapps.net";

		@AttributeDefinition(
				name = "arvato.typeahead.endpoint"
		)
		String arvato_typeahead_endpoint() default "https://nonprod-api.adcapps.net/api/proxy/adc-rss-register-proxy-dev/eingabeassistent";

		@AttributeDefinition(
				name = "dhl.tracking.url"
		)
		String dhl_tracking_url() default "https://www.dhl.de/en/privatkunden/pakete-empfangen/verfolgen.html?piececode\\=";

		@AttributeDefinition(
				name = "ibm.ocr.endpoint"
		)
		String ibm_ocr_endpoint() default "https://k8csstest.eu-de.containers.appdomain.cloud/api/v1";

		@AttributeDefinition(
				name = "onetrust.domain"
		)
		String onetrust_domain() default "d03775c4-b7de-478f-9265-041f2c0a5a13-test";

		@AttributeDefinition(
				name = "pdp.product.url"
		)
		String pdp_product_url() default "/content/adc/freestylelibrede/de/de/v3/produkte";

		@AttributeDefinition(
				name = "login.page.path"
		)
		String login_page_path() default "/content/adc/freestylelibrede/de/de/v3/anmelden/login";

		@AttributeDefinition(
				name = "unsupported.browser.page.path"
		)
		String unsupported_browser_page_path() default "/content/adc/freestylelibrede/de/de/v3/hilfe/haeufige-fragen/browser-nicht-unterstuetzt";
		@AttributeDefinition(
				name = "gtm.data.layer"
		)
		String gtm_data_layer() default "GTM-MSGLXZC";
		boolean enable_decibel_script() default false;
		boolean enable_esl_authentication() default false;
		boolean enable_adobe_analytics_tracking() default false;
		boolean enable_google_analytics_tracking() default true;
		
		@AttributeDefinition(
				name = "ab.environment.name"
		)
		String ab_environment_name() default "dev";

        @AttributeDefinition(name = "orc.arvato.script.url")
		String orc_arvato_script_url() default "https://abbott-fsl.returns.cxc-intg.arvato-scs.digital/bundle.js";

		boolean enable_esl_social_login() default false;

	}

}
