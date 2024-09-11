package com.abbott.aem.platform.common.components.models.impl.v1;

import java.util.List;
import java.util.Locale;


import javax.annotation.PostConstruct;
import javax.inject.Inject;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Delegate;
import lombok.extern.slf4j.Slf4j;

import com.abbott.aem.platform.common.components.models.PlatformPage;
import com.adobe.cq.export.json.ContainerExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.Page;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;

import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.util.PageUtil;

import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import java.net.URL;
import java.net.MalformedURLException;

@EqualsAndHashCode
@ToString
@Slf4j
@Model(adaptables = { SlingHttpServletRequest.class }, adapters = {
		PlatformPage.class, ContainerExporter.class }, resourceType = PlatformPageImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class PlatformPageImpl implements PlatformPage {


	public static final String RTL = "-RTL";
	public static final String ABBOTT_THEME_FRESTYLE = "abbott.theme-freestyle-design";
	protected static final String RESOURCE_TYPE = "abbott-platform/components/structure/page/v1/page";
	// Created these properties since this needs to be standardized
	// and to not impact Java class implementation
	protected static final String PN_SITENAME = "siteName";
	protected static final String PN_THEME = "themeOptions";
	protected static final String PN_SITEMAP_ROOT_SITE_PATH = "rootSitePath";
	protected static final String PN_HEADER_FRAG_PATH = "headerFragmentPath";
	protected static final String PN_FOOTER_FRAG_PATH = "footerFragmentPath";
	protected static final String PN_COOKIE_FRAG_PATH = "cookieFragmentPath";
	protected static final String PN_ALERT_FRAG_PATH = "alertFragmentPath";
	protected static final String PN_SITE_LEAVE_POPUP_FRAG_PATH = "siteLeavingPopupFragmentPath";
	protected static final String RE_CAPTCHA_SITE_KEY = "reCaptchaSiteKey";
	protected static final String RE_CAPTCHA_SCRIPT_SRC = "reCaptchaScriptsrc";
	protected static final String GOOGLE_MAP_API_KEY = "googleMapApiKey";
	protected static final String GOOGLE_MAP_API_URL = "googleMapApiUrl";
	protected static final String PN_GTM_ID = "gtmId";
	protected static final String PN_SITE_ENTERING_POPUP_FRAG_PATH = "siteEnteringPopupFragmentPath";
	protected static final String PN_SITE_DISCLAIMER_POPUP_NOGEO_FRAG_PATH = "siteEnteringPopupNoGeoFragmentPath";
	protected static final String PN_SITE_SECTION_POPUP_FRAG_PATH = "siteSectionSpecificFragmentPath";
	protected static final String PN_LOGIN_FORM_FRAG_PATH = "loginFormFragmentPath";
	protected static final String SEARCH_RESULTS_PAGE = "searchResultsPage";
	private static final String ALERT_STICKY = "alertSticky";
	private static final String ALERT_ABOVE_HEADER = "alertAboveHeader";
	private static final String PN_COUNTRY_CODE = "countryCode";
	private static final String PN_CLIENTLIBS_NAME = "clientlibsName";
	private static final String PN_JQUERY_VERSION = "jqueryVersion";
	protected static final String PN_OG_IMAGE = "ogImage";
	protected static final String PN_COMMERCE_ENABLED = "commerceEnabled";
	protected static final String PN_COOKIESCRIPT = "cookieScript";
	protected static final String PN_ADOBE_ANALYTICS_SCRIPT = "adobeAnalyticsScript";
	protected static final String PN_LOGINPAGE = "loginPage";
	protected static final String PN_LOGOUT_REDIRECT_PAGE = "logoutRedirectPage";
	protected static final String PN_CHECKOUT_PAGE_PATH ="checkoutPagePath";
	protected static final String PN_CART_PAGE= "cartPage";

	private static final String DEFAULT_CLIENTLIBS_NAME = "globalreference";
	private static final String GEOLOCATION_API_KEY = "geolocation";
	private static final String DEFAULT_OG_TYPE = "website";
	private static final String DEFAULT_OG_IMAGE_PATH = "etc.clientlibs/abbott-platform/clientlibs/clientlib-site/resources/images/abbott-logo.png";
	private static final String SESSION_API_KEY = "sessionApi";
	private static final String SEARCH_REGISTER_API_KEY = "searchRegisterApi";

	protected static final String NEW_RELIC_ACCOUNT_ID = "newRelicAccountID";
	protected static final String NEW_RELIC_AGENT_ID = "newRelicAgentID";
	protected static final String NEW_RELIC_COOKIES_ENABLED = "newRelicCookiesEnabled";
	protected static final String COMBINE_PAYMENT_CHECKOUT_CALLS = "combinePaymentCheckoutCalls";

	private static final String ADOBE_DTM_URL= "https://assets.adobedtm.com/";


	protected static final String PN_BACKTOTOP_FRAG_PATH = "backToTopFragmentPath";
	private static final String HIDE_BACK_TO_TOP_IN_CHILD_PAGES = "hideBackToTopFromChildPages";

	private static final String COOKIE_EXPIRATION_TIME = "cookieExpirationTime";
	private static final String COOKIE_HIDDEN = "cookieHidden";
	public static final String FAQ_FOLDER_PATH = "faqFolderPath";
	public static final String FAQ_PAGE_PATH = "faqPagePath";

	private static final String PATH_DELIMITER = "/";

	public static final String DEFAULT_OG_IMAGE = PATH_DELIMITER + DEFAULT_OG_IMAGE_PATH;
	/**
	 * This will delegate to the OOB PageImpl for all the functionalities
	 */
	@Self
	@Via(type = ResourceSuperType.class)
	@Delegate(types = Page.class)
	private Page delegate;

	@Inject
	@Setter(AccessLevel.NONE)
	@Getter(AccessLevel.NONE)
	protected com.day.cq.wcm.api.Page currentPage;

	@Inject
	private Resource resource;

	@SlingObject
	protected ResourceResolver resourceResolver;

	@ValueMapValue
	@Getter
	private String division;

	@ValueMapValue(name = PN_SITENAME)
	@Getter
	private String sitename;

	@ValueMapValue
	@Getter
	private String externalizerDomain;

	@Getter
	private String theme;

	@ValueMapValue
	@Getter
	private boolean hideBreadcrumb;

	@ValueMapValue
	@Getter
	private boolean coveoPush;

	@ValueMapValue
	@Getter
	private String componentRootPath;

	@ValueMapValue
	@Getter
	private String contentCategory;

	@ValueMapValue
	@Getter
	private boolean hideInSitemap;

	@ValueMapValue
	@Getter
	private String changeFrequency;

	@ValueMapValue
	@Getter
	private float priority;

	@ValueMapValue(name = PN_SITEMAP_ROOT_SITE_PATH)
	@Getter
	private String sitemapRootSitePath;

	@ValueMapValue
	@Getter
	private boolean includeInHrefLang;

	@ValueMapValue
	@Getter
	private String canonicalUrl;

	@ValueMapValue
	@Getter
	private List<String> robots;

	@ValueMapValue
	@Getter
	private String ogType;

	@ValueMapValue
	@Getter
	private String ogTitle;

	@ValueMapValue
	@Getter
	private String ogDescription;

	@Getter
	private String ogImage;

	@Getter
	private String ogUrl;

	@Getter
	private String pageTitle;

	@Getter
	private String pageDescription;

	@ValueMapValue
	@Getter
	private String headerFragmentPath;

	@ValueMapValue
	@Getter
	private String backToTopFragmentPath;

	@ValueMapValue
	@Getter
	private String footerFragmentPath;

	@ValueMapValue
	@Getter
	private String cookieFragmentPath;

	@ValueMapValue
	@Getter
	private String cookieScript;

	@ValueMapValue
	@Getter
	private String adobeAnalyticsScript;

	@ValueMapValue
	@Getter
	private boolean hideBackToTopFromChildPages;

	@ValueMapValue
	@Getter
	private String alertFragmentPath;

	@ValueMapValue
	@Getter
	private boolean alertAboveHeader;

	@ValueMapValue
	@Getter
	private boolean alertSticky;

	@ValueMapValue
	@Getter
	private String siteLeavingPopupFragmentPath;

	@ValueMapValue
	@Getter
	private String siteEnteringPopupNoGeoFragmentPath;

	@ValueMapValue
	@Getter
	private String siteSectionSpecificFragmentPath;


	@ValueMapValue
	@Getter
	private String reCaptchaSiteKey;

	@ValueMapValue
	@Getter
	private String reCaptchaScriptsrc;

	@ValueMapValue
	@Getter
	private String googleMapApiKey;

	@ValueMapValue
	@Getter
	private String googleMapApiUrl;

	@Getter
	private String gtmId;

	@Getter
	private String languageCode;

	@ValueMapValue
	@Getter
	private String countryCode;

	@ValueMapValue
	@Getter
	private String searchResultsPage;

	@Getter
	private boolean rightToLeft;

	@Getter
	private String clientlibsName;

	@Getter
	private String jqueryVersion;

	@Getter
	private String siteEnteringPopupFragmentPath;

	@Getter
	private String loginFormFragmentPath;

	@Getter
	private String loginPage;

	@Getter
	private String logoutRedirectPage;

	@Getter
	private String checkoutPagePath;

	@Getter
	private String cartPage;

	@Getter
	private boolean commerceEnabled;

	@ValueMapValue
	@Getter
	private String newRelicAccountID;

	@ValueMapValue
	@Getter
	private String newRelicAgentID;

	@ValueMapValue
	@Getter
	private String hrefPageMetaData;

	@ValueMapValue
	@Getter
	private String hrefLangAlternateUrl;

	@ValueMapValue
	@Getter
	private String hrefLangLocale;

	@Getter
	private boolean newRelicCookiesEnabled;

	@Getter
	private boolean combinePaymentCheckoutCalls;

	@ValueMapValue
	@Getter
	private boolean addPageUUIDAsAemExternalIdInPageMetaProperties;

	@ValueMapValue
	@Getter
	private String metaKeywords;

	@ValueMapValue
	@Getter
	private String structuredData;

	@ValueMapValue
	@Getter
	private String cookieExpirationTime;

	@ValueMapValue
	@Getter
	private String cookieHidden;


	@ValueMapValue
	@Getter
	private boolean trustArcEnable;


	@ValueMapValue
	@Getter
	@Default(values ="https://consent.trustarc.com/v2/autoblockasset/core.min.js?cmId=")
	private String trustArcCoreLibraryUrl;

	@ValueMapValue
	@Getter
	@Default(values ="https://consent.trustarc.com/v2/autoblock?cmId=")
	private String trustArcBlockListUrl;

	@ValueMapValue
	@Getter
	@Default(values ="https://consent.trustarc.com/v2/notice/")
	private String trustArcScriptUrl;
	
	@ValueMapValue
	@Getter
	private String trustArcCmpId;

	@ValueMapValue
	@Getter
	private String faqFolderPath;

	@ValueMapValue
	@Getter
	private String faqPagePath;

	@ValueMapValue
	@Getter
	private String trustArcSelfValue;
	/**
	 * The api lookup service.
	 */
	@OSGiService
	private APILookupService apiLookupService;

	@Self
	private SlingHttpServletRequest slingHttpServletRequest;


	@PostConstruct
	protected void init() {
		String tempSiteEnteringPopupNoGeoFragmentPath = "";
		String tempSiteSectionSpecificFragmentPath = "";
		String analyticsScriptUrl ="";
		String country ="";
		if (null != resource) {
			headerFragmentPath = setPageValues(PN_HEADER_FRAG_PATH, resource);
			footerFragmentPath = setPageValues(PN_FOOTER_FRAG_PATH, resource);
			cookieFragmentPath = setPageValues(PN_COOKIE_FRAG_PATH, resource);

			tempSiteEnteringPopupNoGeoFragmentPath = setPageValues(PN_SITE_DISCLAIMER_POPUP_NOGEO_FRAG_PATH, resource);
			tempSiteSectionSpecificFragmentPath = setPageValues(PN_SITE_SECTION_POPUP_FRAG_PATH, resource);
		}
		if(null != tempSiteEnteringPopupNoGeoFragmentPath){
			siteEnteringPopupNoGeoFragmentPath = tempSiteEnteringPopupNoGeoFragmentPath;
		}
		if(null != tempSiteSectionSpecificFragmentPath){
			siteSectionSpecificFragmentPath = tempSiteSectionSpecificFragmentPath;
		}
		if (resource != null)
		{
			headerFragmentPath = setPageValues(PN_HEADER_FRAG_PATH, resource);
			backToTopFragmentPath = setPageValues(PN_BACKTOTOP_FRAG_PATH, resource);

			alertFragmentPath = setPageValues(PN_ALERT_FRAG_PATH, resource);
			reCaptchaSiteKey = setInheritedPageValues(RE_CAPTCHA_SITE_KEY,
					resource);
			reCaptchaScriptsrc = setInheritedPageValues(RE_CAPTCHA_SCRIPT_SRC,
					resource);
			googleMapApiKey = setInheritedPageValues(GOOGLE_MAP_API_KEY, resource);
			googleMapApiUrl = setInheritedPageValues(GOOGLE_MAP_API_URL, resource);
			alertAboveHeader = setInheritedBooleanPageValues(
					ALERT_ABOVE_HEADER, resource);
			hideBackToTopFromChildPages = setInheritedBooleanPageValues(
					HIDE_BACK_TO_TOP_IN_CHILD_PAGES, resource);
			alertSticky = setInheritedBooleanPageValues(ALERT_STICKY, resource);
			siteLeavingPopupFragmentPath = setPageValues(
					PN_SITE_LEAVE_POPUP_FRAG_PATH, resource);
			siteEnteringPopupFragmentPath = setPageValues(
					PN_SITE_ENTERING_POPUP_FRAG_PATH, resource);
			cookieExpirationTime = setInheritedPageValues(
					COOKIE_EXPIRATION_TIME, resource);
			cookieHidden = setInheritedPageValues(COOKIE_HIDDEN, resource);
			loginFormFragmentPath = setPageValues(PN_LOGIN_FORM_FRAG_PATH, resource);
			sitename = setInheritedPageValues(PN_SITENAME, resource);
			commerceEnabled = setInheritedBooleanPageValues(PN_COMMERCE_ENABLED, resource);
			cookieScript= setInheritedPageValues(PN_COOKIESCRIPT, resource);
			analyticsScriptUrl = setInheritedPageValues(PN_ADOBE_ANALYTICS_SCRIPT, resource);
			country = setInheritedPageValues(PN_COUNTRY_CODE, resource);
			searchResultsPage = setInheritedPageValues(SEARCH_RESULTS_PAGE,
					resource);
			gtmId = setInheritedPageValues(PN_GTM_ID, resource);
			clientlibsName = setInheritedPageValues(PN_CLIENTLIBS_NAME,
					resource, DEFAULT_CLIENTLIBS_NAME);
			jqueryVersion = setInheritedPageValues(PN_JQUERY_VERSION,
					resource);

			ogImage= setInheritedPageValues(PN_OG_IMAGE, resource);
			faqFolderPath = setInheritedPageValues(FAQ_FOLDER_PATH, resource);
			faqPagePath = setInheritedPageValues(FAQ_PAGE_PATH, resource);
			loginPage = PageUtil.getInternalAemUrlOrGetExternalUrl(setInheritedPageValues(PN_LOGINPAGE, resource),resourceResolver);
			logoutRedirectPage = PageUtil.getInternalAemUrlOrGetExternalUrl(setInheritedPageValues(PN_LOGOUT_REDIRECT_PAGE, resource),resourceResolver);
			checkoutPagePath = PageUtil.getInternalAemUrlOrGetExternalUrl(setInheritedPageValues(PN_CHECKOUT_PAGE_PATH, resource),resourceResolver);
			cartPage = PageUtil.getInternalAemUrlOrGetExternalUrl(setInheritedPageValues(PN_CART_PAGE, resource),resourceResolver);
			newRelicAccountID = setInheritedPageValues(NEW_RELIC_ACCOUNT_ID, resource);
			newRelicAgentID = setInheritedPageValues(NEW_RELIC_AGENT_ID, resource);
			newRelicCookiesEnabled = setInheritedBooleanPageValues(NEW_RELIC_COOKIES_ENABLED, resource);
			combinePaymentCheckoutCalls = setInheritedBooleanPageValues(COMBINE_PAYMENT_CHECKOUT_CALLS, resource);
			structuredData = setInheritedPageValues("structuredData",resource);
			trustArcEnable = setInheritedBooleanPageValues("trustArcEnable",resource);
			trustArcCmpId = setInheritedPageValues("trustArcCmpId", resource);
			trustArcCoreLibraryUrl = setInheritedPageValues("trustArcCoreLibraryUrl", resource);
			trustArcBlockListUrl = setInheritedPageValues("trustArcBlockListUrl", resource);
			trustArcScriptUrl = setInheritedPageValues("trustArcScriptUrl", resource);
			theme = setInheritedPageValues(PN_THEME, resource);
			trustArcSelfValue = setInheritedPageValues("trustArcSelfValue", resource);
		}
		pageTitle = StringUtils.isNotBlank(currentPage.getPageTitle()) ? currentPage
				.getPageTitle() : currentPage.getTitle();
		ogImage = StringUtils.isNotBlank(ogImage) ? ogImage : DEFAULT_OG_IMAGE;
		faqFolderPath = StringUtils.isNotBlank(faqFolderPath) ? faqFolderPath : FAQ_FOLDER_PATH;
		faqPagePath = StringUtils.isNotBlank(faqPagePath) ? faqPagePath : FAQ_PAGE_PATH;
		Locale locale = currentPage.getLanguage(false);
		languageCode = locale.getLanguage();
		if(StringUtils.isNotBlank(locale.getCountry())) {
			languageCode = String.format("%s_%s", languageCode, locale.getCountry().toLowerCase());
		}
		countryCode = StringUtils.isNotBlank(country) ? country
				.toUpperCase() : locale.getCountry().toUpperCase();

		pageDescription = currentPage.getDescription();
		ogType = StringUtils.isNotBlank(ogType) ? ogType : DEFAULT_OG_TYPE;
		ogTitle = StringUtils.isNotBlank(ogTitle) ? ogTitle : pageTitle;
		metaKeywords=StringUtils.isNotBlank(metaKeywords) ? metaKeywords : "";
		ogDescription = StringUtils.isNotBlank(ogDescription) ? ogDescription : pageDescription;
		ogUrl = PageUtil.getUrl(currentPage.getPath(), resourceResolver);
		canonicalUrl = StringUtils.isNotBlank(canonicalUrl) ? PageUtil.getUrl(canonicalUrl, resourceResolver): PageUtil.getUrl(currentPage.getPath(), resourceResolver);

		try{
			URL url = new URL(slingHttpServletRequest.getRequestURL().toString());
			String finalURLPath  = url.getProtocol() + "://" + url.getHost();
			ogImage = finalURLPath.concat(ogImage);
		}catch(MalformedURLException exception){
			log.error("MalformedURLException at init() method of PlatformPageImpl  "+exception);
		}

		if (StringUtils.isBlank(theme)) {
			theme = ABBOTT_THEME_FRESTYLE; // default theme
		}
		rightToLeft = StringUtils.endsWithIgnoreCase(theme, RTL);
		adobeAnalyticsScript = StringUtils.isNotEmpty(analyticsScriptUrl) && analyticsScriptUrl.startsWith(ADOBE_DTM_URL) ? analyticsScriptUrl : StringUtils.EMPTY;
	}

	protected String setInheritedPageValues(String name, Resource resource) {
		return setInheritedPageValues(name, resource, null);
	}

	private String setInheritedPageValues(String name, Resource resource,
										  String defaultValue) {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				resource);
		return inheritedProperties.getInherited(name, defaultValue);
	}

	private boolean setInheritedBooleanPageValues(String propName,
												  Resource resource) {
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				resource);
		return inheritedProperties.getInherited(propName, false);
	}

	private String setPageValues(String fragmentPath, Resource resource) {
		String expFragmentPath = null;
		InheritanceValueMap inheritedProperties = new HierarchyNodeInheritanceValueMap(
				resource);
		if (null != inheritedProperties
				.getInherited(fragmentPath, String.class)) {
			Resource headerResource = resourceResolver
					.getResource(inheritedProperties.getInherited(fragmentPath,
							String.class) + "/" + JcrConstants.JCR_CONTENT);
			if (null != headerResource
					&& !ResourceUtil.isNonExistingResource(headerResource)) {
				expFragmentPath = headerResource.getPath();
			}
		}
		return expFragmentPath;
	}

	/**
	 * @return the geolocationEndPtURL
	 */
	public String getGeolocationEndPointURL() {
		return apiLookupService.getAPIEndpointForKey(GEOLOCATION_API_KEY);
	}

	public  String getSessionEndPointURL() {
		return apiLookupService.getAPIEndpointForKey(SESSION_API_KEY);
	}
	@Override
	public  String getEslEndPointURL() {
		return apiLookupService.getRequestEndpoint(StringUtils.EMPTY);
	}

	public String getSearchRegisterEndPointURL() {
		return apiLookupService.getAPIEndpointForKey(SEARCH_REGISTER_API_KEY);
	}
}