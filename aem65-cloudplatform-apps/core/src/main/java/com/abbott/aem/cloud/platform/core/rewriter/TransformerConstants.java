package com.abbott.aem.cloud.platform.core.rewriter;

/**
 * The Class TransformerConstants.
 */
public class TransformerConstants {

	/** The Constant HTML_EXTENSION. */
	public static final String HTML_EXTENSION = ".html";

	/** The Constant WEBAPP_EXTENSION. */
	public static final String WEBAPP_EXTENSION = ".app.html";

	/** The Constant APP_SELECTOR. */
	public static final String APP_SELECTOR = "app";

	/** The Constant WWW */
	public static final String WWW = "www.";

	/** The Constant DAM_PATH */
	@SuppressWarnings("squid:S1075")
	// Refactor your code to get this URI from a customizable parameter.
	public static final String DAM_PATH = "/content/dam";

	/**
	 * Instantiates a new transformer constants.
	 */
	private TransformerConstants() {
		throw new IllegalStateException("Transformer Constants");
	}

}
