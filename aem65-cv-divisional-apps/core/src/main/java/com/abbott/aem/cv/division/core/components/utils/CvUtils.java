package com.abbott.aem.cv.division.core.components.utils;

import com.abbott.aem.platform.common.constants.CommonConstants;


import org.apache.commons.lang3.StringUtils;



/**
 * The Class CvUtils.
 */
public class CvUtils {
	
	/**
	 * Method to Validate Link by adding proper prefix or suffix.
	 *
	 * @param link the link
	 * @return the String or null
	 */
	public static String ensureProperLink(String link) {
		if (link == null || StringUtils.startsWith(link, CommonConstants.CONTENT_DAM)) {
			return link;
		} else {
			if (StringUtils.startsWith(link, CommonConstants.CONTENT) && !StringUtils.endsWithAny(link, CommonConstants.HTML_EXTENSION) && !StringUtils.contains(link, CommonConstants.HTML_HASH)) {
				link = link + CommonConstants.HTML_EXTENSION;
			}
		}
		return link;
	}


	
}