package com.abbott.aem.an.similac.core.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.utils.SimilacUtils;
import com.day.cq.wcm.api.Page;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * The Sling Model for the Account Linking Parent component. Gets the form data
 * of the three sub-forms and creates a consolidated json of all threes
 * 
 * @author Anirudh Garg
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class AccountLinkingModel {

	/** The logger */
	private static final Logger LOG = LoggerFactory.getLogger(AccountLinkingModel.class);

	/** The current resource for which the model has been called */
	@Inject
	private Resource resource;

	/** The Page for which the current request has been made */
	@ScriptVariable
	private Page currentPage;

	/** The Form Data JSON */
	private String formJson;

	/**
	 * Activation method. To be called when the Account Linking Parent component is
	 * rendered. Gets the three child forms and parses them to otain their JSON
	 * representations
	 */
	@PostConstruct
	public void activate() {
		ValueMap properties = resource.getValueMap();
		JsonObject formsJsonObject = new JsonObject();

		formsJsonObject.addProperty("formTitle", properties.get("formTitle", String.class));
		formsJsonObject.addProperty("formName", properties.get("formName", String.class));
		formsJsonObject.addProperty("actionPath", properties.get("actionPath", String.class));
		formsJsonObject.addProperty("actionPathLinkingAccount",
				properties.get("actionPathLinkingAccount", String.class));
		formsJsonObject.addProperty("redirectOnSuccessURL", properties.get("redirectOnSuccessURL", String.class));
		formsJsonObject.addProperty("redirectOnSuccessURLSubscription",
				properties.get("redirectOnSuccessURLSubscription", String.class));
		formsJsonObject.addProperty("checkoutPageURL", properties.get("checkoutPageURL", String.class));
		formsJsonObject.addProperty("myOffersURL", properties.get("myOffersURL", String.class));
		formsJsonObject.addProperty("actionPathToUpdateProfile",
				properties.get("actionPathToUpdateProfile", String.class));

		String siteName = properties.get("site", String.class);
		String socialName = properties.get("social", String.class);
		String reRegisterName = properties.get("reRegister", String.class);

		formsJsonObject.add("site", getJsonForForm(siteName));
		formsJsonObject.add("social", getJsonForForm(socialName));
		formsJsonObject.add("reRegister", getJsonForForm(reRegisterName));

		formJson = formsJsonObject.toString();
	}

	/**
	 * Get the form data as JSON.
	 * 
	 * @param childName The name of the child page node which has the form
	 * 
	 * @return A JsonObject representing the form data
	 */
	private JsonObject getJsonForForm(String childName) {

		String childJsonString = SimilacUtils.getChildJson(childName, currentPage, LOG);
		if (childJsonString == null) {
			return null;
		}
		return new JsonParser().parse(childJsonString).getAsJsonObject();
	}

	/**
	 * Get the Form data as JSON
	 * 
	 * @return A String representing the Form Data
	 */
	public String getFormJson() {
		return formJson;
	}
}
