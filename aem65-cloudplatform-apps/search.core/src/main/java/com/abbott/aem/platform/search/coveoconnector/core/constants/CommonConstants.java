package com.abbott.aem.platform.search.coveoconnector.core.constants;

/**
 * The Class CommonConstants.
 */
public class CommonConstants {

	/** The Constant RUNMODE_AUTHOR. */
	public static final String RUNMODE_AUTHOR = "author";

	/** The Constant RUNMODE_PUBLISH. */
	public static final String RUNMODE_PUBLISH = "publish";

	/** The Constant COVEO_CONFIG_BASE_PATH. */
	public static final String COVEO_CONFIG_BASE_PATH = "/etc/coveoconnector/config" + "";

	/** The Constant COVEO_LOCALE_CORES_PATH. */
	public static final String COVEO_LOCALE_CORES_PATH = "/etc/coveoconnector/locale" + "";

	/** The Constant NODE_PRIMARY_TYPE_SLING_OSGICONFIG. */
	public static final String NODE_PRIMARY_TYPE_SLING_OSGICONFIG = "sling:OsgiConfig";

	/** The Constant LAST_INDEXED. */
	public static final String LAST_INDEXED = "lastIndexed";

	/** The Constant LAST_ACTION. */
	public static final String LAST_ACTION = "lastAction";

	/** The Constant COVEO_CONFIG_NODE_PROPERTY_COREPATH. */
	public static final String COVEO_CONFIG_NODE_PROPERTY_COREPATH = "corepaths";

	/** The Constant COVEO_CONFIG_NODE_PROPERTY_COVEOCORE. */
	public static final String COVEO_CONFIG_NODE_PROPERTY_COVEOCORE = "coveocore";

	/** The Constant COVEO_CONFIG_NODE_PROPERTY_COVEOCOLLECTION. */
	public static final String COVEO_CONFIG_NODE_PROPERTY_COVEOCOLLECTION = "coveocollection";

	/** The Constant COVEO_FEATURED_RESULT_LIST_NODE. */
	public static final String COVEO_FEATURED_RESULT_LIST_NODE = "config/featuredresultlist";

	/** The Constant COVEO_FEATURED_KEYWORD_NODE. */
	public static final String COVEO_FEATURED_KEYWORD_NODE = "featuredKeyword";

	/** The Constant REDIRECT_PATH. */
	public static final String REDIRECT_PATH = ":redirect";

	/** The Constant SUFFIX_EXTENSION. */
	public static final String SUFFIX_EXTENSION = ".html";

	/** The Constant PROPERTY_CQ_PATH. */
	public static final String PROPERTY_CQ_PATH = "cq:path";

	/** The Constant PROPERTY_CQ_TYPE. */
	public static final String PROPERTY_CQ_TYPE = "cq:type";

	/** The Constant ACTIVATE_ACTION. */
	public static final String ACTIVATE_ACTION = "ACTIVATE";

	/** The Constant DEACTIVATE_ACTION. */
	public static final String DEACTIVATE_ACTION = "DEACTIVATE";

	/** The Constant COVEO_LOCALE_NAME. */
	public static final String COVEO_LOCALE_NAME = "localeName";

	/** The Constant COVEO_LOCALE_LIST. */
	public static final String COVEO_LOCALE_LIST = "localesList";

	/** The Constant COVEO_CONFIG_NODE. */
	public static final String COVEO_CONFIG_NODE = "config";

	/** The Constant COVEO_COLLECTION_PROPERTY_NAME. */
	public static final String COVEO_COLLECTION_PROPERTY_NAME = "coveocollection";

	/** The Constant DELIMITER. */
	public static final String DELIMITER = "/";

	/** The Constant PAGES_ASSETS. */
	public static final String PAGES_ASSETS = " pages/assets on coveo";

	/** The Constant FAILED. */
	public static final String FAILED = "Failed";

	/** The Constant ERROR_MSG. */
	public static final String ERROR_MSG = "Something went wrong";

	/** The Constant SUCCESS_MSG. */
	public static final String SUCCESS_MSG = "Successfully indexed ";

	/** The Constant THUMBNAIL. */
	public static final String THUMBNAIL = "thumbnail";

	/** The Constant TITLE. */
	public static final String TITLE = "title";

	/** The Constant ASSET_TYPE. */
	public static final String ASSET_TYPE = "assetType";

	/** The Constant CONTENT_TYPE. */
	public static final String CONTENT_TYPE = "contentType";

	/** The Constant HTML_EXTENSION. */
	public static final String HTML_EXTENSION = ".html";

	/** The Constant FILE_REFERENCE. */
	public static final String FILE_REFERENCE = "fileReference";

	/** The Constant ITAGS. */
	public static final String ITAGS = "itags";

	/** The Constant CTAGS. */
	public static final String CTAGS = "ctags";

	/** The Constant PAGE_NAME. */
	public static final String PAGE_NAME = "pageName";

	/** The Constant DESCRIPTION. */
	public static final String DESCRIPTION = "description";

	/** The Constant IMAGE. */
	public static final String IMAGE = "image";

	/** The Constant METADATA. */
	public static final String METADATA = "metadata";

	/** The Constant COVEO_SEARCH_FACETS. */
	public static final String COVEO_SEARCH_FACETS = "coveoSearchFacets";

	/** The Constant EXCLUDE_PAGE_PROPERTIES. */
	public static final String EXCLUDE_PAGE_PROPERTIES = "excludePageProperties";

	/** The Constant KEYWORD. */
	public static final String KEYWORD = "keyword";

	/** The Constant THUMBNAIL_IMAGE_PATH. */
	public static final String THUMBNAIL_IMAGE_PATH = "thumbnailImagePath";

	/** The Constant TITLE_LINK. */
	public static final String TITLE_LINK = "titleLink";

	/** The Constant COVEO_GATEWAY_PARTIAL_SITES_PATH. */
	public static final String COVEO_GATEWAY_PARTIAL_SITES_PATH = "/etc/coveoconnector/gateway-partial-sites" + "";

	/** The Constant COVEO_COLLECTION_MAPPING_PATH. */
	public static final String COVEO_COLLECTION_MAPPING_PATH = "/etc/coveoconnector/collectionmapping" + "";

	/** The Constant PAGE_CONTENT. */
	public static final String PAGE_CONTENT = "pagecontent";

	/** The Constant FAILED_CONFIG_MSG. */
	public static final String FAILED_CONFIG_MSG = "Failed to create configuration. See log for more information...";

	/** The Constant TITLE_TAG_ID. */
	public static final String TITLE_TAG_ID = "titleTagId";

	/** The Constant TAGS_SUGGESTER. */
	public static final String TAGS_SUGGESTER = "tags_suggester";

	/** The Constant TITLE_SUGGESTER. */
	public static final String TITLE_SUGGESTER = "title_suggester";

	/** The Constant DESCRIPTION_SUGGESTER. */
	public static final String DESCRIPTION_SUGGESTER = "description_suggester";

	/** The Constant SUGGEST. */
	public static final String SUGGEST = "suggest";

	/** The Constant SPELLCHECK. */
	public static final String SPELLCHECK = "spellcheck";

	/** The Constant COLLATIONS. */
	public static final String COLLATIONS = "collations";

	/** The Constant COLLATION. */
	public static final String COLLATION = "collation";

	/** The Constant ABBOTT_SEARCH_COVEO_PUSHAPI. */
	public static final String ABBOTT_SEARCH_COVEO_PUSHAPI = "abbott/search/coveo/pushapi";
	
	public static final String ABBOTT_FASTLY_CACHECLEAR = "abbott/cacheclear";
	public static final String ABBOTT_CLOUDFRONT_CACHECLEAR = "abbott/cloudcacheclear";
	
	/** CloudFront Scheme **/
    public static final String CLOUDFRONT_PROTOCOL = "cloudfront://";

    /** CloudFront Transport URI **/
    public static final String CLOUDFRONT_ENDPOINT = "transportUri";

    /** CloudFront Region Distribution ID**/
    public static final String DISTRIBUTION_ID = "distributionId";

    /** CloudFront IAM User Access Key **/
    public static final String ACCESS_KEY = "accessKey";

    /** CloudFront IAM User Secret Key **/
    public static final String SECRET_KEY = "secretKey";

    /** CloudFront Rate exceeded error **/
    public static final String RATE_EXCEEDED_ERROR = "Rate exceeded";

    /** CloudFront Replication error **/
    public static final String REPLICATION_FAILED_ERROR = "Replication failed";
    
    /** CloudFront Flush error **/
    public static final String FLUSH_FAILED_ERROR = "Flush can not perform for %s path";
    
    /** CloudFront Throttling error **/
    public static final String THROTTLING_ERROR = "Throttling";
    
    /** CloudFront Throttling error **/
    public static final String TOOMANYINVALIDATIONREQUEST_ERROR = "TooManyInvalidationsInProgress";
	
	/** CloudFront Distribution Configuration Missing error **/
    public static final String DISTRIBUTION_MAPPING_ERROR = "No Distribution mapping found for %s path";
   
    /** Content Abbott Corporate path **/
    public static final String ABBOTT_CORP_PATH = "/abbott-corporate";
    
    /** Content Homepage path **/
    public static final String HOMEPAGE_PATH = "/homepage";
    
    /** Content Index path **/
    public static final String INDEX_PATH = "/index";
    
    /** Content Panels path **/
    public static final String PANEL_PATH = "/panel";
    
    /** 404 Error Constants **/
    public static final String ERROR_404 = "404";
    
    /** CloudFront Alert From Constants **/
    public static final String FROM_CLOUDFRONT = "cloudfront";
    
    /** HTTPS Protocol **/
    public static final String HTTPS_PROTOCOL = "https://";
    
    /** HTTP Protocol **/
    public static final String HTTP_PROTOCOL = "http://";
    
    /** Forward Slash **/
    public static final String FORWARD_SLASH = "/";
    
    /** Invalidation URL Suffix **/
    public static final String  INVALIDATION_SUFFIX = "/invalidation";
    
    /** CloudFront Full flush path **/
    public static final String  FULL_FLUSH_PATH = "/*";
    
    /** CloudFront Error Response Array **/
    public static final String  ERROR_RESPONSE_ARRAY = "ErrorResponse";
    
    /** CloudFront Response Error **/
    public static final String  ERROR = "Error";
    
    /** CloudFront Response Error Code **/
    public static final String  ERROR_CODE = "Code";
    
    /** CloudFront Response Error Message **/
    public static final String  ERROR_MESSAGE = "Message";
    
    /** CloudFront Invalidation Batch Start Tag **/
    public static final String  INVALIDATION_BATCH_START = "<InvalidationBatch>";
    
    /** CloudFront Invalidation Batch End Tag **/
    public static final String  INVALIDATION_BATCH_END = "</InvalidationBatch>";
    
    /** CloudFront Caller Reference Start Tag **/
    public static final String  CALLER_REFERENCE_START = "<CallerReference>";
    
    /** CloudFront Caller Reference End Tag **/
    public static final String  CALLER_REFERENCE_END = "</CallerReference>";
    
    /** CloudFront Batch **/
    public static final String  BATCH = "batch";
    
    /** CloudFront Invalidation Path Start Tag **/
    public static final String  PATH_START = "<Path>";
    
    /** CloudFront Invalidation Path End Tag **/
    public static final String PATH_END = "</Path>";
    
    /** AWS Request Date Header **/
    public static final String AWS_DATE_HEADER = "x-amz-date";
    
    /** CloudFront Flush Message **/
    public static final String FLUSH_PATH_MESSAGE = "Flush Path:%s for DistributionId:%s";
    
    /** CloudFront Flush Status Message **/
    public static final String FLUSH_STATUS_MESSAGE = "Received %s Status code for distributionId :%s and contentpath :%s";

	public static final String AGENT_ID = "agentId";
	public static final String PREVIEW = "preview";

	/**
	 * Should never be instantiated.
	 */
	CommonConstants() {
	}
}