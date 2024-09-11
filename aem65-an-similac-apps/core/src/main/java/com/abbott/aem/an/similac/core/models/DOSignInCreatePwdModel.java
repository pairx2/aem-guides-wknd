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

/**
 * The Sling Model for the Sign In/Create Password component. Gets the form data
 * of the two sub-forms and stores them
 * 
 * @author Anirudh Garg
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class DOSignInCreatePwdModel {

	private static final String SIGN_IN = "signIn";

	@SuppressWarnings("squid:S2068")
	private static final String CREATE_PWD = "createPwd";

	/** The logger */
	private static final Logger LOG = LoggerFactory.getLogger(DOSignInCreatePwdModel.class);

	/** The current resource for which the model has been called */
	@Inject
	private Resource resource;

	/** The Page for which the current request has been made */
	@ScriptVariable
	private Page currentPage;

	/** The Sign In Form JSON */
	private String signInJson;

	/** The Create Password Form JSON */
	private String createPwdJson;

	/**
	 * Activation method. To be called when the DO - Sign In/Create Password Parent
	 * component is rendered. Gets the two child forms and parses them to otain
	 * their JSON representations
	 */
	@PostConstruct
	public void activate() {
		ValueMap properties = resource.getValueMap();

		String signInName = properties.get(SIGN_IN, String.class);
		String createPwdName = properties.get(CREATE_PWD, String.class);

		signInJson = SimilacUtils.getChildJson(signInName, currentPage, LOG);
		createPwdJson = SimilacUtils.getChildJson(createPwdName, currentPage, LOG);
	}

	/**
	 * Get the Sign In Form data as JSON String
	 * 
	 * @return A String representing the Form Data
	 */
	public String getSignInJson() {
		return signInJson;
	}

	/**
	 * Get the Create Password Form data as JSON String
	 * 
	 * @return A String representing the Form Data
	 */
	public String getCreatePwdJson() {
		return createPwdJson;
	}
}
