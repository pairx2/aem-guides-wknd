package com.abbott.aem.an.abbottstore.models;

import com.abbott.aem.an.abbottstore.services.UrlConfigService;
import com.abbott.aem.an.abbottstore.utils.AbbottUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * The Class LinkModel.
 *
 */
@Model(adaptables = { Resource.class, SlingHttpServletRequest.class}, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LinkModel extends UrlServiceModel{

	private static final Logger LOG = LoggerFactory.getLogger(LinkModel.class);
	/** The resource resolver. */
	@SlingObject
	private ResourceResolver resourceResolver;

	/** The store service. */
	@OSGiService
	private UrlConfigService urlConfigService;

	/** The path. */
	@ValueMapValue(name = "navigationLink")
	private String path;

	/** The title. */
	@ValueMapValue(name = "navigationTitle")
	private String title;

	/** The socialImageUrl. */
	@ValueMapValue(name = "socialImageUrl")
	private String socialImageUrl;

	/** The SocialAltText. */
	@ValueMapValue(name = "socialAltText")
	private String socialAltText;

	/** The linkUrl. */
	@ValueMapValue(name = "linkUrl")
	private String linkUrl;

	/** The target. */
	@ValueMapValue(name = "newWindow")
	String target;

	/** The Constant TARGET_BLANK. */
	private static final String TARGET_BLANK = "_blank";

	/** The Constant TARGET_SELF. */
	private static final String TARGET_SELF = "_self";

	/**
	 * Gets the target.
	 *
	 * @return target
	 */
	public Map<String, String> getTarget() {
		LOG.debug("Inside if getTarget:::");
		return getTargetMap();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * Returns the target map which would have noopener noreferrer for targets that
	 * are set as _blank.
	 *
	 * @return the target map
	 */
	public Map<String, String> getTargetMap() {

		Map<String, String> targetMap = new HashMap<>();
		if (!StringUtils.isEmpty(target) && BooleanUtils.toBoolean(target)) {
			LOG.debug("BooleanUtils.toBoolean(target) ::: {}", BooleanUtils.toBoolean(target));
			targetMap.put("target", TARGET_BLANK);
		} else {
			targetMap.put("target", TARGET_SELF);
		}
		LOG.debug("targetMap ::: {}", targetMap);
		return targetMap;
	}

	/**
	 * Gets the path.
	 *
	 * @return socialpath
	 */
	public String getPath() {
		if (path != null && !path.equals("")) {
			if (path.length() >= 8 && ("/content").equals(path.substring(0, 8))) {
				if (("").equals(getExtension(path))) {
					path = AbbottUtils.getHtmlLink(resourceResolver, path);
				}
				path = getRelativeLink(resourceResolver, path);
			} else if (path.length() >= 3 && ("www").equals(path.subSequence(0, 3))) {
				path = "http://" + path;
			}
		}
		LOG.debug("path in getPath Method of LinkModel:::{}",path);
		return path;
	}

	public boolean getIsContentPath() {
		if(path.startsWith("/content")){
			LOG.info("Content Path is true");
			return true;
		}else {
			LOG.info("Content Path is false");
			return false;
		}
	}
	/**
	 * Returns the link that is resolved by the resource resolver. Depricated: This
	 * is no longer required as we have the Sling Rewriter in place.
	 *
	 * @param resourceResolver
	 * @param pagePath
	 * @return pagePath
	 */
	public static String getRelativeLink(ResourceResolver resourceResolver, String pagePath) {
		return resourceResolver.map(pagePath);
	}

	/**
	 * returns the extension of the link
	 *
	 * @param uri
	 * @return extension
	 */
	public static String getExtension(String uri) {
		String extension = "";
		if (uri.contains(".")) {
			extension = uri.substring(uri.lastIndexOf('.'));
		}
		return extension;
	}

	public String getSocialImageUrl() {
		return getAemServer()+AbbottUtils.resolve(resourceResolver, socialImageUrl);
	}

	public String getSocialAltText() {
		return socialAltText;
	}

	public String getLinkUrl() {
		return linkUrl;
	}

	public String getFullPath(){
		LOG.debug("Inside getFullPath Method");
		if(StringUtils.startsWith(path,"/content/")) {
			return resourceResolver.map(path)+".html";
		}
		return path;
	}

}
