package com.abbott.aem.an.similac.core.models;

import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;


import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;


/**
 * Seo Attributes Sling Model for every page in the website
 */
@Model(adaptables = SlingHttpServletRequest.class)
public class SeoAttributeModel {
    
	private static final String REDIRECT_TARGET = "cq:redirectTarget";
	private static final String FB_TITLE = "fbtitle";
	private static final String AN_SIMILAC_COM = "an_similac_com";

	/** The current resource for which the model has been called. Usually a Page */
	@Inject
	private Resource resource;

	@Inject
	private Externalizer externalizer;

	/** The Page for which the current request has been made */
	@ScriptVariable
	private Page currentPage;

	/** The properties of the current page */
	@ScriptVariable
	private ValueMap pageProperties;

	/** The Link Helper to get the short & mapped link, and current server name */
	private LinkHelperModel linkHelper;

	/** The Robots Tag values */
	@Getter
	private String[] robotseo;

	/** The Facebook Opengraph Title */
	private String fbtitle;

	/** The Facebook Opengraph Description */
	private String fbdescription;

	/** The Facebook Opengraph Site Name */
	private String fbsitename;

	/** The Facebook Opengraph Pixel ID */
	private String fbpixelid;

	/** The Facebook Opengraph Image URL */
	private String ogimage;

	/** The Facebook Opengraph Image Type */
	private String ogImageType;

	/** The Facebook Opengraph Image Width */
	private String ogImageWidth;

	/** The Facebook Opengraph Image Height */
	private String ogImageHeight;

	/** The Facebook Opengraph Type */
	private String fbtype;

	/** The Canonical Tag */
	private String canonical;

	/** The Hreflang Tag */
	private String hreflang;

	private Map<String, String> hreflangMap;

	Page rootPage;
	int startLevel;
	private int structureDepth = 1;

	/**
	 * Initialisation method. Will run when a model instance is created. Sets the
	 * property values.
	 */
	@PostConstruct
	private void init() {
		InheritanceValueMap iProperties = new HierarchyNodeInheritanceValueMap(resource);
		linkHelper = resource.adaptTo(LinkHelperModel.class);

		setGeneralSeoTags(pageProperties);
		setFaceBookMetaTags(iProperties);

		linkHelper.setLinkHref(currentPage.getPath());
		canonical = linkHelper.getLinkHrefDomain();
		hreflangMap = generateHreflangMap(hreflangMap);
	}

	/**
	 * Set the general SEO tags, viz. robots and hreflang
	 * 
	 * @param pageProperties The current Page's properties
	 */
	private void setGeneralSeoTags(ValueMap pageProperties) {
		robotseo = pageProperties.get("robotseo", String[].class);

		if (currentPage.getPath().startsWith("/content")) {
			StringBuilder hLangString = new StringBuilder();
			hLangString.append(currentPage.getAbsoluteParent(4).getName()).append("-");
			hLangString.append(currentPage.getAbsoluteParent(3).getName());

			hreflang = hLangString.toString();
		}
	}

	/**
	 * Set the Facebook OpenGraph properties.
	 * 
	 * @param iProperties The inherited page properties for the current page
	 */
	private void setFaceBookMetaTags(InheritanceValueMap iProperties) {
		fbtitle = pageProperties.get(FB_TITLE) != null ? pageProperties.get(FB_TITLE).toString()
				: currentPage.getTitle();
		fbdescription = pageProperties.get("fbdescription") != null ? pageProperties.get("fbdescription").toString()
				: currentPage.getDescription();
		fbsitename = iProperties.getInherited("fbsitename", String.class);
		fbpixelid = iProperties.getInherited("fbpixelid", String.class);
		fbtype = iProperties.getInherited("fbtype", String.class);

		ogimage = linkHelper.getLinkDomain() + iProperties.getInherited("ogimage", String.class);

		ogImageType = iProperties.getInherited("ogImageType", String.class);
		ogImageType = ogImageType == null ? "image/jpg" : ogImageType;

		ogImageWidth = iProperties.getInherited("ogImageWidth", String.class);
		ogImageWidth = ogImageWidth == null ? "200" : ogImageWidth;

		ogImageHeight = iProperties.getInherited("ogImageHeight", String.class);
		ogImageHeight = ogImageHeight == null ? "200" : ogImageHeight;
	}


	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getFbtitle() {
		return fbtitle;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getFbdescription() {
		return fbdescription;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getFbsitename() {
		return fbsitename;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getFbpixelid() {
		return fbpixelid;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getOgimage() {
		return ogimage;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getOgImageType() {
		return ogImageType;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getOgImageWidth() {
		return ogImageWidth;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getOgImageHeight() {
		return ogImageHeight;
	}

	/**
	 * Get the Facebook Open Graph Title
	 * 
	 * @return A String representing the og:title value
	 */
	public String getFbtype() {
		return fbtype;
	}

	/**
	 * Get the canonical tag value
	 * 
	 * @return A String representing the Canonical Tag Value
	 */
	public String getCanonical() {
		return canonical;
	}

	/**
	 * Get the Hreflang value
	 * 
	 * @return A String representing the hreflang property value
	 */
	public String getHreflang() {
		return hreflang;
	}

	/**
	 * Get the Hreflang map
	 * 
	 * @return A Map representing the hreflang properties
	 */
	public Map<String, String> getHreflangMap() {
		return hreflangMap;
	}

	/**
	 * Populate the Hreflang Map
	 * 
	 * @param hreflangMap The Map object to populate
	 * 
	 * @return The populated Map object
	 */
	public Map<String, String> generateHreflangMap(Map<String, String> hreflangMap) {
		if (hreflangMap != null) {
			return hreflangMap;
		}
		rootPage = currentPage.getAbsoluteParent(3);
		if (rootPage != null) {
			int rootPageLevel = rootPage.getDepth();
			startLevel = rootPageLevel + 1;
			structureDepth += rootPageLevel;
			hreflangMap = getItems(rootPage);
		} else {
			hreflangMap = Collections.emptyMap();
		}
		
		return hreflangMap;
	}

	/**
	 * 
	 * @param root
	 * @return
	 */
	
	public Map<String, String> getItems(Page root) {
		Map<String, String> hreflangMapPage = new HashMap<>();
		
		if (root.getDepth() >= structureDepth) {
			return hreflangMapPage;
		}
		Iterator<Page> children = root.listChildren(new PageFilter());
		while (children.hasNext()) {
			Page child = children.next();
			Page localizedPage = getLocalizedPage(currentPage, child);
			if (child.getPath().startsWith("/content")) {
				StringBuilder hLangString = new StringBuilder();
				hLangString.append(child.getAbsoluteParent(4).getName()).append("-");
				hLangString.append(child.getAbsoluteParent(3).getName());
				hreflang = hLangString.toString();
			}
			
			if (localizedPage != null) {	
				ValueMap valueMap = localizedPage.getProperties();
				if (valueMap.get(REDIRECT_TARGET) == null) {
					hreflangMapPage.put(hreflang, externalizer.externalLink(resource.getResourceResolver(),
							AN_SIMILAC_COM, String.format("%s.html", localizedPage.getPath())));
				}
			}
		}
		
		return hreflangMapPage;	
	}
    
	 
	private Page getLocalizedPage(Page currentPage, Page languageRoot) {
		Page localizedPage;
		String languageRootPath = languageRoot.getPath();
		String currentPagePath = currentPage.getPath();
		if (currentPagePath.startsWith(languageRootPath)) {
			localizedPage = currentPage;
		} else {
			String separator = "/";
			int i = currentPagePath.indexOf(separator);
			int separatorOccurrences = StringUtils.countMatches(languageRootPath, separator) + 1;
			while (--separatorOccurrences > 0 && i != -1) {
				i = currentPagePath.indexOf(separator, i + 1);
			}
			String relativePath = (i > 0) ? currentPagePath.substring(i) : "";
			languageRootPath = languageRootPath.concat(relativePath);
			PageManager pageManager = currentPage.getPageManager();
			localizedPage = pageManager.getPage(languageRootPath);
		}
		return localizedPage;
	}
}