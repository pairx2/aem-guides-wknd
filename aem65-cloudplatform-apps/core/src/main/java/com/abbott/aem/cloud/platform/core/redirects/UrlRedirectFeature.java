package com.abbott.aem.cloud.platform.core.redirects;

import java.util.Arrays;
import java.util.List;

import org.apache.sling.featureflags.ExecutionContext;
import org.apache.sling.featureflags.Feature;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component(service = Feature.class, immediate = true)
@Designate(ocd = UrlRedirectFeature.Config.class)
public class UrlRedirectFeature implements Feature {

	public static final String FEATURE_NAME = "manage-url-redirect";

	private Config config;
	private List<String> environmentsToDisable;
	private String currentEnvironment;

	@Activate
	@Modified
	protected void configure(Config config) {
		this.config = config;
		this.currentEnvironment = this.config.getCurrentEnvironment();
		this.environmentsToDisable = Arrays.asList(this.config.getEnvironmentsToDisable());
		log.debug("currentEnvironment:{};environmentsToDisable:{}", currentEnvironment, environmentsToDisable);
	}

	@Override
	public String getName() {
		return FEATURE_NAME;
	}

	@Override
	public String getDescription() {
		return "This feature flag enables or disables the URL Redirect feature";
	}

	@Override
	public boolean isEnabled(ExecutionContext context) {
		if (environmentsToDisable.contains(currentEnvironment)) {
			log.debug("Disabling URL Redirect feature");
			return false;
		}

		log.debug("Enabling URL Redirect feature");
		return true;
	}

	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Abbott Platform - URL Redirect Feature Configuration",
			description = "Configurations for the URL Redirect Feature")
	public @interface Config {

		@AttributeDefinition(name = "Current Environment Name", description = "env:AB_ENVIRONMENT_NAME")
		String getCurrentEnvironment() default "dev2";

		@AttributeDefinition(name = "Environments to Disable", description = "Environments where this feature needs to be disabled.")
		String[] getEnvironmentsToDisable() default { "dev2", "dev", "stage" };

	}
}
