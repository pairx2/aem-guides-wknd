package com.abbott.aem.an.abbottstore.constants;

import com.day.cq.wcm.api.NameConstants;

public class CommonConstants {

	private CommonConstants() {
	}

	// Misc
	public static final String FORWARD_SLASH = "/";
	public static final String DOT = ".";
	public static final String DASH = "-";
	public static final String SPACE = " ";

	// Style System
	public static final String POLICY_ROOT_PATH = FORWARD_SLASH + "conf/abbott/settings/wcm/policies/abbott";
	public static final String CQ_STYLE_ID = "cq:styleId";
	public static final String STYLE_SYSTEM_JCR_PROPERTY = "cq:styleIds";
	public static final String CQ_TAGS = NameConstants.PN_TAGS;
	public static final String CQ_STYLE_CLASSES = "cq:styleClasses";
	public static final String CLIENTLIB_CATEGORY_NODE = "categories";
	
	// Templates
	public static final String ABBOTT_TEMPLATE_PATH_PREFIX = FORWARD_SLASH + "conf/abbott";
	public static final String ABBOTT_TEMPLATE_FOOTER_DEFAULT = "as-variation";
	//Content
	public static final String CONTENT_PAGE_PATH = FORWARD_SLASH + "content/abbott/en";
	
	// Resource Type
	public static final String HOME_PAGE_RES_TYPE = "abbott/components/structure/home-page";
	public static final String GLOBAL_HEADER_RES_TYPE = "abbott/components/content/header";
	/** The Constant GLOBAL_FOOTER_RES_TYPE. */
	public static final String LIST_RES_TYPE = "abbott/components/content/list";
	/** The Constant GLOBAL_FOOTER_RES_TYPE. */
	public static final String GLOBAL_FOOTER_RES_TYPE = "abbott/components/content/footer";
	
	public static final String ABBOTT_DEFAULT_VARIATION = "as-variation";

	public static final String APPLICATION_JSON = "application/json";
	public static final String TEXT_PLAIN = "text/plain";
	public static final String JSON_EXTENSION = ".json";
	public static final String GET = "GET";
	public static final String ACCEPT = "Accept";
	public static final String FAILED_HTTP_CODE = "Failed : HTTP error code : ";
	public static final String DESCRIPTION = "description";
	public static final String SKU = "sku";
	public static final String ABBOTT_PRODUCT_TEMPLATE = "abbott-product-template";
	public static final String GLUCERNA_PRODUCT_TEMPLATE = "glucerna-product-template";
	public static final String PUBLISHED_AT = "PublishedAt";
	public static final String NUTRITIONAL_INFO = "nutritional-info";
	public static final String GENERATE_NUTRITION_FACTS = "generateNutritionFacts";
	public static final String DELIMITTER_EQUALS = "=";
	public static final String PRODUCT_FLAVOR = "product_flavor";
	public static final String CASE_OF_PRODUCT = "case_of_product";
	public static final String PRODUCT_FORM = "product_form";
	public static final String CANS_X = "cans_x";
	public static final String CANS_Y = "cans_y";
	public static final String NULL = "null";
	public static final String DELIMITTER_COMMA = ",";
	public static final String NUTRIENT_DATA = "Nutrient Data";
	public static final String VITAMINS = "Vitamins";
	public static final String MINERALS = "Minerals";
	public static final String SIZE = "size";
	public static final String FLAVOR = "flavor";
	public static final String PROD_PATH = "prodPath";
	public static final String STORE = "store";
	public static final String PATH = "path";
	public static final String FLAVORS = "flavors";
	public static final String TEST_FLAVORS = "test_flavors";
	public static final String HTML_EXTENSION = ".html";
	public static final String SUBSCRIPTION_INFO = "subscription_info";
	
	public static final String DEVICE = "device";
	public static final String DESKTOP = "desktop";
	public static final String DESKTOP_DAM = "/desktop";
	public static final String MOBILE = "mobile";
	public static final String THUMBNAIL = "thumbnail";
	public static final String MOBILE_DAM = "/mobile";
	public static final String TABLET = "tablet";
	public static final String TABLET_DAM = "/tablet";
	public static final String IMAGE_1X = "1x";
	public static final String IMAGE_2X = "2x";
	public static final String RENDITIONS = "renditions";
	public static final String MIME_TYPE_JPEG = "image/jpeg";
	public static final String MIME_TYPE_PNG = "image/png";
	public static final String MIME_TYPE_JPG = "image/jpg";
	public static final String MIME_TYPE_GIF = "image/gif";
	public static final String JCR_PATH = "JCR_PATH";
	public static final String IO_EXCEPTION = "IOException ::: {}";
	public static final String THUMBNAIL_EXTENSION = "-thumbnail-2x";
	public static final String THUMBNAIL_SMALL_IMAGE_EXTENSION = "/jcr:content/renditions/thumbnail-80x80.png";
	public static final String MEDIA_GALLERY_ENTRIES = "media_gallery_entries";
	public static final String CUSTOM_DISCOUNT = "custom_discount";
	public static final String NAME = "name";
	public static final String JCR_RENDITION_PATH = "jcr:content/renditions/";
	public static final String SIZE_OR_WEIGHT = "size_or_weight";
	public static final String IMAGES = "images";
	public static final String PRICE = "price";
	public static final String SPECIAL_PRICE = "special_price";
	public static final String AUTHOR = "author";
	public static final String PUBLISH = "publish";
	public static final String DISPATCHER = "dispatcher";
	public static final String LOCAL = "local";
	public static final String RESOURCE_RESOLVER_USER = "resourceResolverUser";
	public static final String WRITE_USER = "writeUser";
	public static final String IS_RUSH = "is_rush";
	public static final String TEXT_HTML = "text/html";
	public static final String LAST_MODIFIED = NameConstants.PN_PAGE_LAST_MOD;
	public static final String FLAVOR_TAG_PATH = "/content/cq:tags/abbott/abbott-flavors";
	public static final String SIZE_TAG_PATH = "/content/cq:tags/abbott/abbott-sizes";
	public static final String SUBSCRIPTION_TAG_PATH = "/content/cq:tags/abbott/abbott-subscription";
	public static final String FLAVOR_NODE = "abbott-flavors";
	public static final String SIZE_NODE = "abbott-sizes";
	public static final String SUBSCRIPTION_NODE = "abbott-subscription";
	public static final String SUBSCRIPTION = "subscription";
	public static final String ABBOTTSTORE_HOME_PAGE_PATH = "/content/abbott/en";
	public static final String GLUCERNA_HOME_PAGE_PATH = "/content/glucerna/en";
}
