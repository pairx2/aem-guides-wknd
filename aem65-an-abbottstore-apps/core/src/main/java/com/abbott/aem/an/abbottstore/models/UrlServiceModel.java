package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;


@Model(adaptables = { Resource.class, SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UrlServiceModel {

	@Inject
	public String themeType;

	
	/** The store service. */
	@OSGiService
	private UrlConfigService urlConfigService;

	@SlingObject
	private SlingHttpServletRequest slingHttpServletRequest;

	String storeUrl = null;

	String aemServer = null;

	private static final Logger log = LoggerFactory.getLogger(UrlServiceModel.class);

	@PostConstruct
	public void activate() {
		if(log.isDebugEnabled()){
			log.debug("Inside Activate method of UrlServiceModel...");
			log.debug("Value of variation is ::{}", themeType);
		}
		if (StringUtils.isNotBlank(themeType)) {
			storeUrl = urlConfigService.getStore(themeType);
		}

		if(log.isDebugEnabled()){
			if(slingHttpServletRequest!=null && slingHttpServletRequest.getRequestPathInfo()!=null) {
				log.debug("Resource path is::{}", slingHttpServletRequest.getRequestPathInfo().getResourcePath());
				log.debug("Request path info is::{}",slingHttpServletRequest.getPathInfo());
			}
			log.debug("Final formed store URL is::{}",storeUrl);
		}
	}
	
	public String getLoginUrl() {	
		return storeUrl.concat("/customer/account/login");
	}
	
	public String getForgotPasswordUrl() {	
		return storeUrl.concat("/customer/account/forgotpassword");
	}
	
	public String getRegistrationUrl() {	
		return storeUrl.concat("/customer/account/create");
	}
	
	public String getLogoutUrl() {	
		return storeUrl.concat("/customer/account/logout");
	}
	
	public String getAccountUrl() {	
		return storeUrl.concat("/customer/account");
	}
	
	public String getStoreUrl() {
		return storeUrl;
	}

	public String getCheckoutUrl() {
		return storeUrl.concat("/checkout");
	}

	public String getAemServer(){
		return urlConfigService.getAemServer(themeType);
	}

	public String getUnavialableImagePath() {
		return urlConfigService.getUnavailableProductImagePath();
	}

	public List<String> getStoreBasePaths() {
		return urlConfigService.getBaseUrls();
	}

	public String getMagentoStoreCode(String aemUrl){
		return urlConfigService.getMagentoStoreCode(aemUrl);
	}

	public String getSiteKey() {
		return urlConfigService.getSiteKey();
	}

	public String getSecretKey() {
		return urlConfigService.getSecretKey();
	}

	public String getLoginSiteKey() {
		return urlConfigService.getLoginSiteKey();
	}

	public String getLoginSecretKey() {
		return urlConfigService.getLoginSecretKey();
	}

	public String getLoginAemMagentoSecretKey() {
		return urlConfigService.getLoginAemMagentoSecretKey();
	}
}
