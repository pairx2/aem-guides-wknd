package com.abbott.aem.epd.acare.core.constants;

/*
 *	@author mayank.saxena
 * 	This class is used for declaration of Constants
 */
public class Constants {

	/*
	 * Private Constructor
	 */
	private Constants() {
		throw new IllegalStateException("Constants");
	}

	/*
	 * These are common global variables
	 */
	public static final String EMPTY_STRING = "";

	public static final String HTTP = "http://";

	// String parameter possibilities
	public static final String TOKEN_PARAM_HASH_SLASH_QUESTIONMARK = "#/?";
	public static final String TOKEN_PARAM_HASH = "#";
	public static final String TOKEN_PARAM_SLASH_QUESTIONMARK = "/?";
	public static final String TOKEN_PARAM_QUESTIONMARK = "?";
	public static final String JSP_PLACEHOLDER_START_DELIMETER = "<%=";
	public static final String JSP_PLACEHOLDER_END_DELIMETER = "%>";
	public static final String SIGHTLY_PLACEHOLDER_START_DELIMETER = "${";
	public static final String SIGHTLY_PLACEHOLDER_END_DELIMETER = "}";
}
