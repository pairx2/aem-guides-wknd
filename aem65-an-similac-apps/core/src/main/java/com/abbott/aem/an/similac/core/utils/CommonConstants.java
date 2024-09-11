package com.abbott.aem.an.similac.core.utils;

import com.day.cq.tagging.TagConstants;

public class CommonConstants {

	private CommonConstants() {
	}

	// Misc
	public static final String FORWARD_SLASH = "/";
	public static final String QUESTION_MARK = "?";
	public static final String EQUAL_TO = "=";
	public static final String DOT = ".";
	public static final String DASH = "-";
	public static final String SPACE = " ";
	public static final String FALSE = "false";

	// Style System
	public static final String POLICY_ROOT_PATH = FORWARD_SLASH + "conf/abbott/settings/wcm/policies/abbott";
	public static final String CQ_STYLE_ID = "cq:styleId";
	public static final String STYLE_SYSTEM_JCR_PROPERTY = "cq:styleIds";
	public static final String CQ_TAGS = TagConstants.PN_TAGS;
	public static final String CQ_STYLE_CLASSES = "cq:styleClasses";
	public static final String CLIENTLIB_CATEGORY_NODE = "categories";
	
	// Templates
	public static final String ABBOTT_TEMPLATE_PATH_PREFIX = FORWARD_SLASH + "conf/abbott";
	//Content
	public static final String CONTENT_PAGE_PATH = FORWARD_SLASH + "content/abbott/en";
	public static final String SIMILAC_CONTENT_EN_ROOT_PATH = FORWARD_SLASH + "content/an/similac/us/en";
	public static final String SIMILAC_CONTENT_ROOT_PATH = FORWARD_SLASH + "content/an/similac/us";
	
	// Resource Type
	public static final String HOME_PAGE_RES_TYPE =  "an/similac/components/structure/home-page";
	public static final String GLOBAL_HEADER_RES_TYPE = "an/similac/components/content/header";
	public static final String HEADER_RESOURCE_PATH = FORWARD_SLASH + "jcr:content/root/header";
	public static final String GLOBAL_FOOTER_RES_TYPE = "an/similac/components/content/footer";
	public static final String BV_ID = "bazaar_voice";
	public static final String NAME = "meta_title";
	public static final String SIZE_OR_WEIGHT = "size_or_weight";
	public static final String PRICE = "price";
	public static final String SPECIAL_PRICE = "special_price"; 
	public static final String MEDIA_GALLERY_ENTRIES = "media_gallery_entries";
	public static final String PRODUCT_IMAGE_DAM_PATH = FORWARD_SLASH + "content/dam/an/similac/products";
	public static final String JCR_RENDITION_PATH = FORWARD_SLASH + "jcr:content/renditions/";
	public static final String PRODUCT_CARD_MOBILE = "thumbnail-240x300.png";
	public static final String PRODUCT_CARD_TABLET = "thumbnail-240x300.png";
	public static final String PRODUCT_CARD_DESKTOP = "thumbnail-480x600.png";
	public static final String FLAVORS = "flavors";
	
	public static final String PRODUCT_COMPARISION_MOBILE = "thumbnail-240x300.png";
	public static final String PRODUCT_COMPARISION_TABLET = "thumbnail-240x300.png";
	public static final String PRODUCT_COMPARISION_DESKTOP = "thumbnail-240x300.png";
	
	public static final String THUMBNAIL_SMALLEST = "cq5dam.thumbnail.48.48.png";
	
	public static final String APPLICATION_JSON = "application/json";
	public static final String TEXT_PLAIN = "text/plain";
	public static final String JSON_EXTENSION = ".json";
	public static final String GET = "GET";
	public static final String ACCEPT = "Accept";
	public static final String FAILED_HTTP_CODE = "Failed : HTTP error code : ";
	public static final String DESCRIPTION = "description";
	public static final String SKU = "sku";
	public static final String ABBOTT_PRODUCT_TEMPLATE = "abbott-product-template";
	public static final String PUBLISHED_AT = "PublishedAt";
	public static final String DELIMITTER_EQUALS = "=";
	public static final String PATH = "path";
	public static final String HTML_EXTENSION = ".html";
	
	//Suppressing path warnings as it is valid and necessary
	@SuppressWarnings("CQRules:CQBP-71")
	public static final String APPS_ROOT_PATH = FORWARD_SLASH + "apps";
	
	@SuppressWarnings("CQRules:CQBP-71")
	public static final String LIBS_ROOT_PATH = FORWARD_SLASH + "libs";
	
	public static final String DELIMITTER_COMMA = ",";
	public static final String SIMILAC_PRODUCT_TEMPLATE = "product-page";
	public static final String NUTRITIONAL_INFO = "nutritional-info";
	public static final String GENERATE_NUTRITION_FACTS = "generateNutritionFacts";
	
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
	public static final String IMAGES = "images";
	public static final String AUTHOR = "author";
	public static final String PUBLISH = "publish";
	public static final String DISPATCHER = "dispatcher";
	public static final String LOCAL = "local";
	public static final String READ_USER = "readUser";
	public static final String WRITE_USER = "writeUser";
	public static final String IS_RUSH = "is_rush";
	public static final String CQ_REDIRECT_TARGET = "cq:redirectTarget";
	public static final String NUTRIENT_DATA = "Nutrient Data";
	public static final String VITAMINS = "Vitamins";
	public static final String MINERALS = "Minerals";
	
	//Navigation
	public static final String PN_NAVIGATION_ROOT = "navigationRoot";
	public static final String PN_SKIP_NAVIGATION_ROOT = "skipNavigationRoot";
	public static final String PN_STRUCTURE_START = "structureStart";
	public static final String PN_COLLECT_ALL_PAGES = "collectAllPages";
	public static final String PN_STRUCTURE_DEPTH = "structureDepth";
	
	// Reset Password
	public static final String RESET_ACT_CENTER_DESKTOP = "cq5dam.thumbnail.319.319.png";
	public static final String RESET_ACT_CENTER_TABLET = "thumbnail-240x300.png";
	public static final String RESET_ACT_CENTER_MOBILE = "thumbnail-240x300.png";	
	
	public static final String RESET_ACT_FOOTER_DESKTOP = "cq5dam.thumbnail.319.319.png";
	public static final String RESET_ACT_FOOTER_TABLET = "thumbnail-240x300.png";
	public static final String RESET_ACT_FOOTER_MOBILE = "thumbnail-240x300.png";
	
	//FAQ
	public static final String LABEL = "label";
	public static final String TOPIC_LABEL = "topicLabel";
	public static final String TOPIC_LIST = "topicList";
	
	//Form
	public static final String ERROR_UPDATE_PROFILE = "errorUpdateProfile";
	public static final String ERROR_UPDATE_PROFILE_NON_DO = "errorUpdateProfileNonDOUser";
	
	//Retailer
	public static final String AMAZON = "amazon";
	public static final String TPG = "tpg";
	public static final String TARGET_ONLINE = "targetonline";
	public static final String TARGET_OFFLINE = "targetoffline";
	public static final String OFFER_TYPE = "offerType";
	public static final String UNIQUE_ID = "uniqueID";
	
}
