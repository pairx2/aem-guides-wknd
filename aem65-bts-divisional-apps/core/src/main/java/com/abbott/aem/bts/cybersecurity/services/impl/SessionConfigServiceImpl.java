package com.abbott.aem.bts.cybersecurity.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.bts.cybersecurity.services.SessionConfigService;

import lombok.Data;

/**
 * The Class SessionConfigServiceImpl.
 */
@Data
@Component(service = SessionConfigService.class)
@Designate(ocd = SessionConfigServiceImpl.Config.class)
public class SessionConfigServiceImpl implements SessionConfigService {

	/**
	 * The Constant LOGGER.
	 */
	private static final Logger LOGGER = LoggerFactory.getLogger(SessionConfigServiceImpl.class);
	
	/**
	 * The config.
	 */
	protected Config config;
	
	private Boolean timeoutEnabled;
	private Integer inactivityTimeout;
	private Integer popupTimer;
	
	/**
	 * Configure.
	 *
	 * @param config the config
	 */
	@Activate
	@Modified
	void configure(Config config) {
		LOGGER.info("SessionConfigServiceImpl Configuration");
		this.config = config;
		this.timeoutEnabled = this.config.isTimeoutEnabled();
		LOGGER.info("Timeout is Enabled : {}",this.timeoutEnabled);
		this.inactivityTimeout = this.config.getInactivityTimeout();
		LOGGER.info("Inactivity Timeout: {}",this.inactivityTimeout);
		this.popupTimer = this.config.getPopupTimer();
		LOGGER.info("Popup Timer: {}",this.popupTimer);
		
	}
	
	/**
	 * Gets the Enable Timeout value
	 *
	 * @return Enable Timeout value
	 */
	@Override
	public Boolean isTimeoutEnabled() {
		return timeoutEnabled;
	}
	
	/**
	 * Gets the Timeout for Inactivity state
	 *
	 * @return the Inactivity timeout value in minutes
	 */
	@Override
	public Integer getInactivityTimeoutLimit() {
		return inactivityTimeout;
	}

	/**
	 * Gets the popup timer value
	 *
	 * @return popup timer value
	 */
	@Override
	public Integer getPopupTimer() {
		return popupTimer;
	}


	
	/**
	 * The Interface Config.
	 */
	@ObjectClassDefinition(name = "Abbott Cybersecurity Session Configuration service",
						   description = "Abbott Cybersecurity Session Configuration service")
	public @interface Config {

		/**
		 * Gets the Enable Timeout value
		 *
		 * @return Enable Timeout value
		 */
		@AttributeDefinition(name = "Is Timeout Enabled", description = "Check if the Popup On Timout to be enabled")
		boolean isTimeoutEnabled() default false;

		/**
		 * Gets the Timeout for Inactivity state
		 *
		 * @return the Inactivity timeout value in minutes
		 */
		@AttributeDefinition(name = "Inactivity Timeout", description = "Inactivity Time for user to get the page timedout in minutes") 
		int getInactivityTimeout() default 8;


		/**
		 * Gets the popup timer value
		 *
		 * @return popup timer value
		 */
		@AttributeDefinition(name = "Popup Timer", description = "Time to run the popup in minutes") 
		int getPopupTimer() default 2;
	}



}


