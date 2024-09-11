package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.LogoutConfigBean;
import com.abbott.aem.an.similac.core.beans.LogoutConfigBean.LogoutPopupLabel;
import com.google.gson.GsonBuilder;

/**
 * LogoutModel is the SlingModel to hold the details of logout configuration
 * 
 * @author Cognizant
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LogoutModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(LogoutModel.class);

	private static final String LOGOUT_URL = "logoutURL";

	private static final String RENEW_URL = "renewURL";

	private static final String IDLE_TIME_OUT = "idleTimeout";

	private static final String LOGOUT_POPUP_DURATION = "logoutPopupDuration";

	private static final String AUTO_RENEWAL = "autoRenewal";

	private static final String HEADING = "heading";

	private static final String DESC = "desc";

	private static final String CONFIRM = "confirm";

	private static final String CANCEL = "cancel";

	@Inject
	private Resource resource;

	private LogoutConfigBean logoutConfigBean;

	private String logoutConfigJson;

	private ValueMap componentProp;

	@PostConstruct
	public void activate() {
		if (resource != null) {
			generateLogoutConfigDetails();
		}
	}

	/**
	 * Populate logout configuration details
	 * 
	 * @throws Exception
	 */
	private void generateLogoutConfigDetails() {
		try {
			componentProp = resource.adaptTo(ValueMap.class);
			logoutConfigBean = new LogoutConfigBean();
			if (componentProp != null) {
				logoutConfigBean.setLogoutURL(componentProp.get(LOGOUT_URL, String.class));
				logoutConfigBean.setRenewURL(componentProp.get(RENEW_URL, String.class));
				logoutConfigBean.setIdleTimeout(componentProp.get(IDLE_TIME_OUT, String.class));
				logoutConfigBean.setLogoutPopupDuration(componentProp.get(LOGOUT_POPUP_DURATION, String.class));
				logoutConfigBean.setAutoRenewal(componentProp.get(AUTO_RENEWAL, String.class));
				logoutConfigBean.setLogoutPopupLabel(getLogoutPopupLabel());

			}
		} catch (RuntimeException e) {
			LOGGER.error("Exception in generateLogoutConfigDetails ::",e);
		}
	}

	/**
	 * This method will populate the logout popup label
	 * 
	 * @return LogoutPopupLabel
	 */
	private LogoutPopupLabel getLogoutPopupLabel() {
		LogoutPopupLabel logoutPopupLabel = logoutConfigBean.new LogoutPopupLabel();
		logoutPopupLabel.setHeading(componentProp.get(HEADING, String.class));
		logoutPopupLabel.setDesc(componentProp.get(DESC, String.class));
		logoutPopupLabel.setConfirm(componentProp.get(CONFIRM, String.class));
		logoutPopupLabel.setCancel(componentProp.get(CANCEL, String.class));
		return logoutPopupLabel;
	}

	/**
	 * This method will return the my logout configuration details as Json string
	 * 
	 * @return String
	 */
	public String getLogoutConfigJson() {
		if (logoutConfigBean != null) {
			logoutConfigJson = new GsonBuilder().create().toJson(logoutConfigBean);
		}
		return logoutConfigJson;
	}

	public LogoutConfigBean getLogoutConfigBean() {
		return logoutConfigBean;
	}

	public ValueMap getComponentProp() {
		return componentProp;
	}

}
