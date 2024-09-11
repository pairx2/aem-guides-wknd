package com.abbott.aem.cloud.platform.core.services.impl;

import com.abbott.aem.cloud.platform.core.services.IdentifyRunModesService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;
import java.util.Collections;

@Component(
		service = IdentifyRunModesService.class,
		immediate = true,
		configurationPolicy = ConfigurationPolicy.REQUIRE
)
@Designate(ocd = IdentifyRunModesServiceImpl.Configuration.class)
public class IdentifyRunModesServiceImpl implements IdentifyRunModesService{

	private static final Logger LOG = LoggerFactory.getLogger(IdentifyRunModesServiceImpl.class);

	/** The properties map containing all the values configured. */
	private List<String> runModesList;

	/**
	 * Activate method.
	 *
	 * @param configuration the configuration properties
	 */

	@Activate
	public void activate(Configuration configuration){
		String[] runModesArr = configuration.run_modes();
		if(null == runModesArr){
			LOG.error("Run modes is null...Hence returning.");
			return;
		}
		runModesList = Arrays.asList(runModesArr);
	}

	/**
	 * Gets the runModesList.
	 *
	 * @return the runModesList
	 */
	@Override
	public List<String> getAllRunModes() {
		return Collections.unmodifiableList(runModesList);
	}

	@SuppressWarnings("squid:S00100")
	@ObjectClassDefinition(name = "Identify run mode Service Impl")
	protected static @interface Configuration {
		@AttributeDefinition(
				name = "run.modes"
		)
		String[] run_modes();

	}

}
