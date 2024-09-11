package com.abbott.aem.platform.common.constants;

/**
 * The Class CommonConstants.
 */
/*
 * @author neeraj.chaudhary This class is used for declaration of Common
 * Constants
 */
public class CommonConstants {

    /*
     * These are common global variables
     */
    /** The Constant ACTION. */
    public static final String ACTION = "action";

    /** The Constant SITE_URL. */
    public static final String SITE_URL = "siteURL";

    /** The Constant CONTENT_DAM. */
    public static final String CONTENT_DAM = "/content/dam";

    /** The Constant CONTENT. */
    public static final String CONTENT = "/content";

    /** The Constant HTML_EXTENSION. */
    public static final String HTML_EXTENSION = ".html";

    /** The Constant WORLD_WIDE_WEB. */
    public static final String WORLD_WIDE_WEB = "www";

    /** The Constant #. */
    public static final String HASH = "#";

    /** The Constant HTTP. */
    @SuppressWarnings("AEM Rules:AEM-14")
    public static final String HTTP = "http";

    /** The Constant HTTPS. */
    public static final String HTTPS = "https://";

    /** The Constant HTML_HASH. */
    public static final String HTML_HASH = ".html#";

    /** The Constant META_DATA. */
    public static final String META_DATA = "metadata";

    /*
     * These variables are used for link-stack
     */
    /** The Constant STACK_TITLE. */
    public static final String STACK_TITLE = "stackTitle";

    /** The Constant STACK_LINK. */
    public static final String STACK_LINK = "stackLink";

    /** The Constant STACK_EXTERNAL_LINK. */
    public static final String STACK_EXTERNAL_LINK = "isStackExternal";

    /** The Constant LINKS. */
    public static final String LINKS = "links";

    /** The Constant LINK_TEXT. */
    public static final String LINK_TEXT = "linkText";

    /** The Constant DESTINATION_URL. */
    public static final String DESTINATION_URL = "destinationURL";

    /** The Constant IS_EXTERNAL. */
    public static final String IS_EXTERNAL = "isExternal";

    /** The Constant TOP_SEARCH_HEADLINE. */
    /*
     * Variables used in top 5 search
     */
    public static final String TOP_SEARCH_HEADLINE = "headline";

    /** The Constant TOP_SEARCH_KEYWORDS. */
    public static final String TOP_SEARCH_KEYWORDS = "searchKeywords";

    /** The Constant TOP_SEARCH_KEYWORD. */
    public static final String TOP_SEARCH_KEYWORD = "searchKeyword";

    /** The Constant TOP_SEARCH_LINK. */
    public static final String TOP_SEARCH_LINK = "searchKeywordLink";

    /** The Constant ABBOTTCOM. */
    public static final String ABBOTTCOM = "abbottcom";

    /** The Constant SITE_NAME. */
    public static final String SITE_NAME = "siteName";

    /** The Constant X_COUNTRY_CODE. */
    public static final String X_COUNTRY_CODE = "x-country-code";

    /** The Constant X_PREFERRED_LANGUAGE. */
    public static final String X_PREFERRED_LANGUAGE = "x-preferred-language";

    /** The Constant X_APPLICATION_ID. */
    public static final String X_APPLICATION_ID = "x-application-id";

    /** The Constant X_APPLICATION_ACCESS_KEY. */
    public static final String X_APPLICATION_ACCESS_KEY = "x-application-access-key";

    /** The Constant X_ORIGIN_SECRET. */
    public static final String X_ORIGIN_SECRET = "x-origin-secret";

    /** The Constant EN_US. */
    public static final String EN_US = "en_us";

    /** The Constant RE_CAPTCHA_SITE_KEY. */
    public static final String RE_CAPTCHA_SITE_KEY = "reCaptchaSiteKey";

    /** The Constant RE_CAPTCHA_SCRIPT_SRC. */
    public static final String RE_CAPTCHA_SCRIPT_SRC = "reCaptchaScriptsrc";

    /** The Constant SEARCH_RESULTS_PAGE. */
    public static final String SEARCH_RESULTS_PAGE = "searchResultsPage";

    /** The Constant TEXT. */
    public static final String TEXT = "text";

    /** The Constant VALUE. */
    public static final String VALUE = "value";

    /** The Constant TAG_TITLE. */
    public static final String TAG_TITLE = "tagTitle";

    /** The Constant TAG. */
    public static final String TAG = "tag";

    /** The Constant X_PREFERRED_LANGUAGE_VALUE */
    public static final String X_PREFERRED_LANGUAGE_VALUE = "EN";

    /** The Constant X_COUNTRY_CODE_VALUE */
    public static final String X_COUNTRY_CODE_VALUE = "US";

    public static final String GOOGLE_MAP_API_KEY = "googleMapApiKey";

    public static final String GOOGLE_MAP_API_URL = "googleMapApiUrl";

    /**
     * The Constant RESOURCE_TYPE.
     */
    public static final String RESOURCE_TYPE_SEARCH_RESULT = "abbott-platform/components/content/molecules/searchresultitem/v1/searchresultitem";

    @SuppressWarnings("CQRules:CQBP-71")
    public static final String RESOURCE_TYPE_SEARCH_CARD = "/apps/abbott-platform/components/content/molecules/searchcarditem/v1" + "/searchcarditem";
    @SuppressWarnings("CQRules:CQBP-71")
    public static final String RESOURCE_TYPE_TAB_SEARCH = "/apps/abbott-platform/components/content/molecules/tabsearch/v1/tabsearch";

    public static final String RESOURCE_TYPE_THEME_DROPDOWN = "abbott-platform/datasource/theme/dropdown";

    public static final String SEARCH_TYPE = "searchType";
	
	public static final String SLASH = "/";

    /**
     * Instantiates a new common constants.
     */
    private CommonConstants() {
        throw new IllegalStateException("Common Constants");
    }

}