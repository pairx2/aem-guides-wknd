package com.abbott.aem.adc.freestylelibrede.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import com.abbott.aem.adc.freestylelibrede.services.SiteScriptService;

@Component(
		service = SiteScriptService.class,
		immediate = true,
		configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = SiteScriptServiceImpl.Configuration.class)
public class SiteScriptServiceImpl implements SiteScriptService{
	
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
		propertiesMap.put("siteScript", configuration.siteScript());
		propertiesMap.put("enableSiteScript", configuration.enableSiteScript());
		
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
	@ObjectClassDefinition(name = "ADC Freestyle Libre DE - Site Script Service")
	protected static @interface Configuration {
		@AttributeDefinition(
				name = "siteScript"
		)
		String siteScript() default "https://targetemsecure.blob.core.windows.net/4809713e-efa3-46ab-87ee-8c5f0620a358/4809713eefa346ab87ee8c5f0620a358_1.js";

		@AttributeDefinition(
				name = "enableSiteScript"
		)
		String enableSiteScript() default "false";
	}
 
}
