package com.abbott.aem.cloud.api.configuration.impl;
		
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.cloud.api.configuration.ESLDomainURLService;
import com.abbott.aem.cloud.platform.core.redirects.services.ManageUrlRedirectConfig;

@Component(immediate = true, service = ESLDomainURLService.class)
public class ESLDomainURLServiceImpl implements ESLDomainURLService{

	private static final Logger log = LoggerFactory.getLogger(ESLDomainURLServiceImpl.class);

	private String hostName;
	private String accesskey;
	private String xoriginSecret;

	@Activate
	protected void activate(final ManageUrlRedirectConfig config) {
		log.debug("Start ACTIVATE Endpoint");
		this.hostName = config.getHostName();
		this.xoriginSecret = config.getOriginSecret();
		log.debug(
				"ESLDomainURLServiceImpl Activate with hostname: {}", this.hostName);
		log.debug(
				"ESLDomainURLServiceImpl Activate with xoriginSecret: {}", this.xoriginSecret);
	}

	@Override
	public String getHostName() {
		return hostName;
	}

	@Override
	public String getAccessKey() {
		return accesskey;
	}

	@Override
	public String getOriginSecret() {
		return xoriginSecret;
	}

}
