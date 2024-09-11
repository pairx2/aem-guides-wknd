package com.abbott.aem.cloud.platform.core.constants;

public class CommonConstants {

	/** The Constant GLOBAL_WORKFLOW_MODEL */
	public static final String GLOBAL_WORKFLOW_MODEL = "/var/workflow/models/abbott-global-workflow";

	/** The Constant ACTIVATION */
	public static final String ACTIVATION = "activation";

	/** The Constant DEACTIVATION */
	public static final String DEACTIVATION = "deactivation";

	/** The Constant FIRST_APPROVER */
	public static final String FIRST_APPROVER = "firstassignment";

	/** The Constant SECOND_APPROVER */
	public static final String SECOND_APPROVER = "secondassignment";

	/** The Constant PRODUCTID. */
	public static final String PRODUCTID = "productId";

	/** The Constant PROXYPORT. */
	public static final int PROXYPORT = 80;

	/** The Constant APPLICATION_ID. */
	public static final String APPLICATION_ID = "x-application-id";

	/** The Constant APP_ID_VALUE. */
	public static final String APP_ID_VALUE = "anaem";

	/** The Constant COUNTRY_CODE_VALUE. */
	public static final String COUNTRY_CODE_VALUE = "US";

	/** The Constant LANGUAGE_VALUE. */
	public static final String LANGUAGE_VALUE = "en";

	/** The Constant ORIGIN_SECRET. */
	public static final String ORIGIN_SECRET = "x-origin-secret";

	/** The Constant COUNTRY_CODE. */
	public static final String COUNTRY_CODE = "x-country-code";

	/** The Constant PREFERRED_LANGUAGE. */
	public static final String PREFERRED_LANGUAGE = "x-preferred-language";

	/** The Constant SECRET_HEADER. */
	public static final String SECRET_HEADER = "x-secret-header";

	/** The Constant APPLICATION_ACCESS_KEY. */
	public static final String APPLICATION_ACCESS_KEY = "x-application-access-key";

	/** The Constant CONTENT_TYPE. */
	public static final String CONTENT_TYPE = "Content-Type";

	/** The Constant EMPTY. */
	public static final String EMPTY = "";

	/** The Constant RESPONSE_STATUS. */
	public static final String RESPONSE_STATUS = "true";

	/**
	 * Instantiate a new Workflow constants.
	 */
	private CommonConstants() {
		throw new IllegalStateException("Common Constants");
	}
}
