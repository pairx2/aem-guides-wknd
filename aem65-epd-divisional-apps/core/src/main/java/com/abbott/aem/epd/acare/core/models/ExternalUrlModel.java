/**
* Copyright (c)   Abbott Laboratories
* Program Name :  ExternalUrlModel.java
* Application  :  Abbott.EPD.ACare
* Purpose      :  See description
* Description  :  This class is used for resolving implicit paths with externalizer domain.
* Modification History:
* ---------------------
*    Date                                Modified by                                       Modification Description
* -----------                         ----------------                                    -------------------------
* 29-Oct-2020                  Cognizant Technology solutions            					Initial Creation
* -----------                         -----------------                                   -------------------------
**/
package com.abbott.aem.epd.acare.core.models;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.abbott.aem.epd.acare.core.constants.Constants;
import com.abbott.aem.platform.common.constants.CommonConstants;
import com.abbott.aem.platform.common.util.PageUtil;
import com.day.cq.commons.Externalizer;

/**
 * ExternalUrlModel Class is used for resolving implicit paths with externalizer
 * domain
 *
 * @author Cognizant
 */

@Model(adaptables = { SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ExternalUrlModel {

	@Inject
	private Externalizer externalizer;

	@Inject
	private String path;

	@Inject
	private boolean extensionlessUrls;

	@Inject
	private boolean removeTrailingSlash;

	@SlingObject
	private ResourceResolver resourceResolver;

	String absoluteUrl;

	private String hrefPattern = "href=\"(.*?)\"";

	@PostConstruct
	public void init() {
		absoluteUrl = getExternalizedUrl(path);
	}
	public String getPath(){return path;}
	public void setPath(String path){this.path=path;}

	/**
	 * This method will return the external domain path given the AEM page path on
	 * the basis of Externalizer or Maps and call the platform method to resolve the
	 * url
	 * 
	 * @param pagePath - Content path of any page called
	 * @return String - externalized URL value
	 */
	public String getExternalizedUrl(String pagePath) {
		return getExternalizedUrl(pagePath, resourceResolver, externalizer, false, false);
	}

	/**
	 * This method will return the external domain path given the AEM page path on
	 * the basis of Externalizer or Maps and call the platform method to resolve the
	 * url
	 * 
	 * @param pagePath            - Content path of any page called
	 * @param //resolver            - Resource resolver
	 * @param externalizer        - Externalizer
	 * @param extensionlessUrls   - Boolean value whether URL's would be extension
	 *                            less or not
	 * @param removeTrailingSlash - Boolean value whether URL's would be having
	 *                            trailing slash or not
	 * @return String - Final externalized URL value
	 */
	public String getExternalizedUrl(String pagePath, ResourceResolver resourceResolver, Externalizer externalizer,
			boolean extensionlessUrls, boolean removeTrailingSlash) {
		if (StringUtils.isNotEmpty(pagePath)) {
			pagePath = pagePath.trim();
			String externalizedLink = pagePath;
			boolean isAbsoluteUrl = pagePath.startsWith(CommonConstants.HTTPS) || pagePath.startsWith(Constants.HTTP) || pagePath.startsWith(CommonConstants.WORLD_WIDE_WEB);
			boolean isPlaceholderUrl = (pagePath.startsWith(Constants.JSP_PLACEHOLDER_START_DELIMETER) && pagePath.endsWith(Constants.JSP_PLACEHOLDER_END_DELIMETER)) 
					|| (pagePath.startsWith(Constants.SIGHTLY_PLACEHOLDER_START_DELIMETER) && pagePath.endsWith(Constants.SIGHTLY_PLACEHOLDER_END_DELIMETER));
			boolean isContentPathwithHtml = pagePath.startsWith(CommonConstants.CONTENT)
					&& pagePath.contains(CommonConstants.HTML_EXTENSION);

			if ((!isAbsoluteUrl || isContentPathwithHtml) && !isPlaceholderUrl) {
				int queryParamIndex = -1;
				queryParamIndex = getQueryParamIndex(pagePath, queryParamIndex);
				String tokenParam = getStringValue(queryParamIndex, pagePath);
				pagePath = getPagePath(isContentPathwithHtml, pagePath, queryParamIndex);
				externalizedLink = getExternalizedLink(pagePath, resourceResolver, externalizer,
				extensionlessUrls, removeTrailingSlash, tokenParam);
			}
			
			return externalizedLink;
		} else {
			return pagePath;
		}
	}

	public int getQueryParamIndex(String pagePath, int queryParamIndex) {
		if (pagePath.contains(Constants.TOKEN_PARAM_HASH_SLASH_QUESTIONMARK)) {
			queryParamIndex = pagePath.indexOf(Constants.TOKEN_PARAM_HASH_SLASH_QUESTIONMARK);
		} else if (pagePath.contains(Constants.TOKEN_PARAM_SLASH_QUESTIONMARK)) {
			queryParamIndex = pagePath.indexOf(Constants.TOKEN_PARAM_SLASH_QUESTIONMARK);
		} else if (pagePath.contains(Constants.TOKEN_PARAM_HASH)) {
			queryParamIndex = pagePath.indexOf(Constants.TOKEN_PARAM_HASH);
		} else if (pagePath.contains(Constants.TOKEN_PARAM_QUESTIONMARK)) {
			queryParamIndex = pagePath.indexOf(Constants.TOKEN_PARAM_QUESTIONMARK);
		}
		return queryParamIndex;
	}

	public String getStringValue(int queryParamIndex, String pagePath) {
		String value = Constants.EMPTY_STRING;
		if (queryParamIndex != -1) {
			value = pagePath.substring(queryParamIndex);
		}
		return value;
	}

	public String getPagePath(boolean isContentPathwithHtml, String pagePath, int queryParamIndex) {
		if (queryParamIndex != -1) {
			pagePath = pagePath.substring(0, queryParamIndex);
		}
		if (isContentPathwithHtml) {
			pagePath = pagePath.replace(CommonConstants.HTML_EXTENSION, Constants.EMPTY_STRING);
		}
		return pagePath;
	}

	public String getExternalizedLink(String pagePath, ResourceResolver resourceResolver, Externalizer externalizer, boolean extensionlessUrls, boolean removeTrailingSlash, String tokenParam) {
		String externalizedLink = Constants.EMPTY_STRING;
		if (StringUtils.isNotEmpty(tokenParam)) {
			StringBuilder stringBuilder = new StringBuilder(5);
			externalizedLink = stringBuilder.append(externalizedLink).append(tokenParam).toString();
		}
		else {
			PageUtil pageUtil = new PageUtil();
			externalizedLink = pageUtil.getUrl(pagePath, resourceResolver, externalizer, extensionlessUrls,
					removeTrailingSlash);
		}
		return externalizedLink;
	}

	/**
	 * This method returns the text with link configured reforemd with externalized
	 * value
	 * 
	 * @param //String inputText
	 * @return String reformedText
	 */
	public String getReformedText(String inputText) {
		String reformedText = inputText;
		if (StringUtils.isNotEmpty(inputText)) {
			Pattern p = Pattern.compile(hrefPattern);
			Matcher m = p.matcher(reformedText);
			Map<String, String> matches = new HashMap<>(10);
			while (m.find()) {
				String url = m.group(1); // this variable should contain the link URL
				if (null != url && url.startsWith("/")) {
					String reformed = getExternalizedUrl(url);
					matches.put(url, reformed);
				}
			}

			if (!matches.isEmpty()) {
				for (Map.Entry<String, String> entry : matches.entrySet()) {
					String key = entry.getKey();
					reformedText = reformedText.replace(key, matches.get(key));
				}
			}
		}
		return reformedText;
	}
}