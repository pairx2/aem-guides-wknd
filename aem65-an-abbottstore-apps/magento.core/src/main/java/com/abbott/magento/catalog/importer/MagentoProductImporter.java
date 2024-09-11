package com.abbott.magento.catalog.importer;

import com.abbott.magento.catalog.connector.MagentoConnectorService;
import com.abbott.magento.catalog.connector.models.*;
import com.abbott.magento.exception.CommerceException;
import com.abbott.magento.services.IdentityProvider;
import com.abbott.magento.services.MagentoProductImporterService;
import com.abbott.magento.services.ProductRootCatConfigService;
import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.InvalidTagFormatException;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagConstants;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.apache.jackrabbit.util.Text;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.*;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.*;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET;
import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET_VALUE;

@Component(service = { MagentoProductImporterService.class }, property = {
		Constants.SERVICE_DESCRIPTION + "=Magento 2 catalog blueprint importer",
		Constants.SERVICE_VENDOR + "=TA Digital", "commerceProvider=" + "magento" })
@Designate(ocd = MagentoProductImporter.Config.class)
public class MagentoProductImporter //extends AbstractProductImporter
		implements MagentoProductImporterService {

	private IdentityProvider magentoIdentityProvider;

	@Reference
	public void bindMagentoIdentityProvider(IdentityProvider magentoIdentityProvider) {
		this.magentoIdentityProvider = magentoIdentityProvider;
	}

	public void unbindMagentoIdentityProvider(IdentityProvider magentoIdentityProvider) {
		this.magentoIdentityProvider = magentoIdentityProvider;
	}

	private static final String NEW_SIMILAC = "new_similac";
	private static final String SIZE = "size";
	private static final String NAME = "name";
	private static final String FLAVOR = "flavor";
	private static final String AEM_STATUS = "aem_status";
	private static final String CONFIGURABLE = "configurable";
	private static final String PRODUCT_OBJECT_SKU = "/var/commerce/products/abbott";
	private static final String SIMPLE = "simple";
	private static final String DESCRIPTION = "description";
	private static final String THUMBNAIL = "thumbnail";
	private static final String MMRF_LINK = "mmrf_link";
	private static final String SIZE_OR_WEIGHT = "size_or_weight";
	private static final String CASE_OF_PRODUCT = "case_of_product";
	private static final String AW_SUBSCRIPTION_TYPE = "aw_sarp2_subscription_type";
	private static final String IMAGE = "image";
	private static final String MEDIA_GALLERY_ENTRIES = "media_gallery_entries";
	private static final String CATEGORY_IDS = "category_ids";
	private static final String URL_KEY = "url_key";
	private static final String LEVEL = "level";
	private static final String LABEL = "label";
	private static final String VALUE = "value";
	private static final String DISCOUNT = "discount";
	private static final String PLAN_ID = "plan_id";
	private static final String SUBSCRIPTION = "subscription";
	private static final String PARENT_SKU = "parent_sku";
	private static final String SIMILAC = "similac";
	private static final String GLUCERNA = "glucerna";
	public static final String FORWARD_SLASH = "/";
	public static final String ABBOTT_SUBSCRIPTION_PATH = "/content/cq:tags/abbott/abbott-subscription";
	public static final String ABBOTT = "abbott";
	public static final String AEM_URL_KEY = "aem_url_key";

	private static final Logger log = LoggerFactory.getLogger(MagentoProductImporter.class);

	// CJAIN - Commenting the below variable and all relevant code with this.
	public static final String PRODUCT_ROOT_PATH = "products.root.path";
	public static final String PRODUCT_PAGES_ROOT_PATH = "products.pages.root.path";
	private String productPagesRoot;
	private String similacProductPagesRoot;
	public static final String PRODUCT_PAGES_TEMPLATE = "template.product.pages";
	private String abbottProductPageTemplate;
	private String glucernaProductPageTemplate;
	private String similacProductPageTemplate;
	public static final String SUBSCRIPTION_WEEK = "subscription-week";
	private String similacAssetsRootPath;
	private String assetsRootPath;
	private String assetsPrefix;
	private boolean requiredAssets;
	private boolean requiredShortening;
	private String defaultImage;
	private MagentoConnectorService magentoConnectorService;
	private final int MESSAGE_CAP = 0;
	private List<String> messages;

	private Replicator replicator;

	@Reference
	public void bindReplicator(Replicator replicator) {
		this.replicator = replicator;
	}

	public void unbindReplicator(Replicator replicator) {
		this.replicator = replicator;
	}

	private HashMap<String, AbbottTags> needByAndBrnadTagsMap;
	private HashMap<String, AbbottTags> newSimilacTagsMap;
	private List<ProductRootCatConfigService> configurationList;
	private HashMap<String, String> defaultCategoryMap;
	private HashMap<String, String> storeIdMap;
	private HashMap<String, String> categoryIdMap;

	@ObjectClassDefinition(name = "Magento Product Importer", description = "Magento product importer")
	public @interface Config {

		@AttributeDefinition(name = "PRODUCT_PAGES_ROOT_PATH", description = "Product pages root path")
		String productPagesRootPath() default "/content/abbott/en";

		@AttributeDefinition(name = "SIMILAC2_PRODUCT_PAGES_ROOT_PATH", description = "SimilacProduct pages root path")
		String similacproductPagesRootPath() default "/content/an/similac/global/en/products";

		@AttributeDefinition(name = "ABBOTT_PRODUCT_PAGES_TEMPLATE", description = "Abbott product page template")
		String abbottProductPageTemplate() default "/conf/abbott/settings/wcm/templates/abbott-product-template";

		@AttributeDefinition(name = "GLUCERNA_PRODUCT_PAGE_TEMPLATE", description = "Glucerna product page template")
		String glucernaProductPageTemplate() default "/conf/abbott/settings/wcm/templates/glucerna-product-template";

		@AttributeDefinition(name = "SIMILAC_PRODUCT_PAGE_TEMPLATE", description = "SIMILAC product page template")
		String similacProductPageTemplate() default "/conf/an/similac/settings/wcm/templates/product-page";

		@AttributeDefinition(name = "PRODUCT_ROOT_PATH", description = "Product root path")
		String productRootPath() default "/var/commerce/products/";

		@AttributeDefinition(name = "ASSET_ROOT_PATH", description = "Assets root path")
		String assetsRootPath() default "/content/dam/abbott/images";

		@AttributeDefinition(name = "SIMILAC_ASSET_ROOT_PATH", description = "Similac Assets root path")
		String similacAssetsRootPath() default "/content/dam/an/similac/products";

		@AttributeDefinition(name = "ASSET_PREFIX", description = "Assets folder location in magento")
		String assetsPrefix() default "/media/catalog/product";

		@AttributeDefinition(name = "SIZE_ID", description = "Id to get sizes")
		String sizeId() default "236";

		@AttributeDefinition(name = "FLAVOR_ID", description = "Id to get flavors")
		String flavorId() default "253";

		@AttributeDefinition(name = "ABBOTT LISTING TEMPLATE", description = "Abbott listing template")
		String abbottListingTemplate() default "/conf/abbott/settings/wcm/templates/listing-template";

		@AttributeDefinition(name = "SIMILAC2_LISTING_TEMPLATE", description = "Similac listing Template")
		String similacListingTemplate() default "/conf/an/similac/settings/wcm/templates/landing-page";

		@AttributeDefinition(name = "ASSETS IMPORT REQUIRED?", description = "Switch to import assets magento")
		boolean requiredAssets() default true;

		@AttributeDefinition(name = "SHORTENING REQUIRED?", description = "Shorten the PDP url to update on magento")
		boolean requiredShortening() default true;

		@AttributeDefinition(name = "DEFAULT IMAGE", description = "Default to be used if images doesnt exist in source")
		String defaultImage() default "/content/dam/abbott/mandatory/Unavailable-Product-1300x1300.jpg";

	}

	@Activate
	protected final void activate(final Config config) {

		this.productPagesRoot = config.productPagesRootPath();
		this.similacProductPagesRoot = config.similacproductPagesRootPath();
		this.abbottProductPageTemplate = config.abbottProductPageTemplate();
		this.glucernaProductPageTemplate = config.glucernaProductPageTemplate();
		this.similacProductPageTemplate = config.similacProductPageTemplate();
		// CJAIN - commenting the below line
		this.assetsRootPath = config.assetsRootPath();
		this.assetsPrefix = config.assetsPrefix();
		config.sizeId();
		config.flavorId();
		this.requiredAssets = config.requiredAssets();
		this.defaultImage = config.defaultImage();
		this.requiredShortening = config.requiredShortening();
		this.similacAssetsRootPath = config.similacAssetsRootPath();
	}


	public MagentoProductImporter() {
		super();
	}

	public MagentoProductImporter(MagentoConnectorService magentoConnectorService) {
		super();
		this.magentoConnectorService = magentoConnectorService;
	}


	//@Override // CJAIN - Commenting this line
	protected void respondWithMessages(SlingHttpServletResponse response, String summary) throws IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("UTF-8");
		PrintWriter pw = response.getWriter();
		pw.println("<html><body>");
		pw.println("<pre>");
		pw.println(summary);
		if (this.MESSAGE_CAP > 0) {
			pw.println("");
			for (String msg : this.messages)
				pw.println(msg);
			if (this.messages.size() == this.MESSAGE_CAP)
				pw.println("...");
		}
		pw.println("</pre>");
		pw.println("</body></html>");
		pw.flush();
	}

	public void processCustomVariationsTagsMetadata(ResourceResolver resourceResolver, String value, String path,
													String token) {
		log.debug("creating abbott Custom Variation  tags");
		List<HashMap<String,Object>> allVariations = magentoConnectorService.getAbbottVariationCategories(value, token);
		if (null != allVariations && !allVariations.isEmpty()) {
			createAbbottCustomVariationTags(resourceResolver, path, allVariations);
		}
	}

	public void processCustomVariationsTagsMetadata(ResourceResolver resourceResolver, String value, String path,
													String token, MagentoConnectorService magentoConnectorService) {
		this.magentoConnectorService = magentoConnectorService;
		if (StringUtils.equals(value, SUBSCRIPTION)) {
			processSubscriptionTagsMetaData(resourceResolver, token);
		} else {
			processCustomVariationsTagsMetadata(resourceResolver, value, path, token);
		}
	}

	private void processSubscriptionTagsMetaData(ResourceResolver resourceResolver, String token) {
		log.trace("processSubscriptionTagsMetaData starts");
		MagentoSubscriptionList magentoSubscriptionList = magentoConnectorService
				.getAbbottSubscriptionVariationCategories(token);
		try {
			TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
			for (MagentoSubscription subscriptionVal : magentoSubscriptionList.items) {
				if (StringUtils.isNotBlank(subscriptionVal.planId)) {
					String tagPath = ABBOTT_SUBSCRIPTION_PATH + FORWARD_SLASH + subscriptionVal.planId;
					Tag tag = tagManager.resolve(tagPath);
					if (null == tag) {
						tag = tagManager.createTag(tagPath, subscriptionVal.planId, "");
					}
					Resource tagResource = tag.adaptTo(Resource.class);
					ModifiableValueMap tagProperties = tagResource.adaptTo(ModifiableValueMap.class);
					tagProperties.put(PLAN_ID, subscriptionVal.planId);
					tagProperties.put(NAME, subscriptionVal.name);
					Integer val = 100 - Integer.parseInt(subscriptionVal.regularpricePatternpercent);
					tagProperties.put(DISCOUNT, val.toString());
					log.debug("discount Price :: {}", subscriptionVal.regularpricePatternpercent);
				}
			}
			log.trace("processSubscriptionTagsMetaData ends");
		} catch (InvalidTagFormatException e) {
			log.error("InvalidTagFormatException while creating tag :: {}", e.getMessage());
		}
	}

	private void createAbbottCustomVariationTags(ResourceResolver resourceResolver, String path,
												 List<HashMap<String, Object>> sizeInfo) {
		log.debug("creating abbott Custom Variation tag for :: {}", path);
		try {
			TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
			for (HashMap<String, Object> size : sizeInfo) {
				if (StringUtils.isNotBlank(size.get(VALUE).toString())) {
					String tagPath = path + FORWARD_SLASH + size.get(VALUE).toString();
					Tag tag = tagManager.resolve(tagPath);
					if (null == tag) {
						tag = tagManager.createTag(tagPath, size.get(VALUE).toString(), "");
					}
					Resource tagResource = tag.adaptTo(Resource.class);
					ModifiableValueMap tagProperties = tagResource.adaptTo(ModifiableValueMap.class);
					tagProperties.put(LABEL, size.get(LABEL).toString());
					tagProperties.put(VALUE, size.get(VALUE).toString());
				}
			}
		} catch (InvalidTagFormatException e) {
			log.error("InvalidTagFormatException while creating tag :: {}", e.getMessage());
		}
	}

	private String getFullPagePath(MagentoProduct item, String productRootPagePath, String categoryUrl,
								   String storeName) {

		String url;
		StringBuilder sb = new StringBuilder().append(productRootPagePath);
		if (storeName.contentEquals(NEW_SIMILAC) && item.type_id.contentEquals(SIMPLE)) {
			url = item.getAttribute(AEM_URL_KEY);
		} else {
			url = item.getAttribute(URL_KEY);
		}

		String urlKey = StringUtils.isNotBlank(url) ? StringUtils.replace(url, "_", "-") : url;
		if (StringUtils.isEmpty(urlKey)) {
			urlKey = magentoConnectorService.createValidJcrName(item.name);
		}
		if (StringUtils.isNotEmpty(categoryUrl) && !StringUtils.startsWith(productRootPagePath, "/content/similac/")) {
			sb.append(categoryUrl);
		}
		return sb.append(FORWARD_SLASH).append(urlKey).toString();
	}

	private List<String> getBaseStructurePath(MagentoProduct item, ResourceResolver resourceResolver,
											  HashMap<String, AbbottTags> genericTagsMap, String storeName) {

		List<String> categories = item.getCategoryIds(CATEGORY_IDS);
		String defaultCatgory = defaultCategoryMap.get(storeName);

		List<String> basePaths;
		if (genericTagsMap != null) {
			basePaths = addLevelId(categories, genericTagsMap, resourceResolver, defaultCatgory);
		} else {
			basePaths = getCategoryPathsFromTags(resourceResolver, categories, storeName);
		}
		return basePaths;
	}

	private List<String> addLevelId(List<String> categories, HashMap<String, AbbottTags> genericTagsMap, ResourceResolver resourceResolver, String defaultCatgory){
		List<String> level4Ids = new ArrayList<>();
		List<String> basePaths = new ArrayList<>();
		for (String categoryId : categories) {
			if (genericTagsMap.containsKey(categoryId)) {
				AbbottTags abbottTagsName = genericTagsMap.get(categoryId);

				if (abbottTagsName.level == 4) {
					level4Ids.add(Long.toString(abbottTagsName.id));
				}
			}
		}
		if (level4Ids.isEmpty() && !categories.isEmpty()) {
			level4Ids.add(categories.get(categories.size() - 1));

		}
		if (!level4Ids.isEmpty()) {
			Map<String, String> responsePaths = getBasePaths(resourceResolver, level4Ids, defaultCatgory);
			if (!responsePaths.isEmpty()) {
				for (String level4Id : level4Ids) {
					basePaths.add(responsePaths.get(level4Id));
					log.debug("required base path :: {}", basePaths);
				}
			}
		}
		return basePaths;
	}

	private Map<String, String> getBasePaths(ResourceResolver resourceResolver, List<String> level4Ids,
											 String category) {
		Map<String, String> responseMap = new LinkedHashMap<>();
		List<Hit> responseList = executeQuery(resourceResolver, level4Ids, category, "id");

		for (Hit hit : responseList) {
			try {
				if (hit.getProperties().containsKey("id")) {
					responseMap.put(hit.getProperties().get("id").toString(), hit.getResource().getPath());
				}
			} catch (RepositoryException e) {
				log.error("Repository exception while getting the base structure path during import :{}", e.getMessage());
			}
		}
		return responseMap;
	}

	private String createProductPage(ResourceResolver resourceResolver, MagentoProduct item, String productRootPagePath,
									 String template, boolean update, String server, String storeName) throws WCMException {

		List<String> basePaths;
		if (storeName!=null && storeName.contentEquals(NEW_SIMILAC)) {
			basePaths = getBaseStructurePath(item, resourceResolver, newSimilacTagsMap, storeName);
		} else {
			basePaths = getBaseStructurePath(item, resourceResolver, needByAndBrnadTagsMap, storeName);
		}
		if (StringUtils.equalsIgnoreCase(item.type_id, CONFIGURABLE)) {
			return processProduct(resourceResolver, item, productRootPagePath, !basePaths.isEmpty() ? basePaths : null,
					template, server, storeName);
		} else {
			return processProduct(resourceResolver, item, productRootPagePath,
					(update && !basePaths.isEmpty()) ? basePaths : null, template, server,
					storeName);
		}
	}

	private String processProduct(ResourceResolver resourceResolver, MagentoProduct item, String productRootPagePath,
								  List<String> categoryUrls, String template, String server, String storeName) throws WCMException {
		String basePath = null;

		if (null != categoryUrls) {

			basePath = StringUtils.substringAfter(categoryUrls.get(0), defaultCategoryMap.get(storeName));

		}

		Page prodPage = getPage(resourceResolver, item, productRootPagePath, template, basePath, storeName);
		Resource productCmpRes = prodPage.getContentResource();
		log.info("product page path {}", productCmpRes.getPath());
		try {
			updateProperties(resourceResolver, item, productCmpRes, server, storeName, magentoIdentityProvider);
		} catch (JsonParseException | RepositoryException | IOException e) {
			log.error("Exception in createProductPage : {}", e.getMessage());
		}
		return prodPage.getPath();
	}

	private Page getPage(ResourceResolver resourceResolver, MagentoProduct item, String productRootPagePath,
						 String template, String categoryUrl, String storeName) throws WCMException {

		PageManager pm = resourceResolver.adaptTo(PageManager.class);
		String fullPagePath = getFullPagePath(item, productRootPagePath, categoryUrl, storeName);
		Page prodPage = pm.getPage(fullPagePath.trim());
		if (null == prodPage) {
			String parent = Text.getRelativeParent(fullPagePath, 1);
			String nodeName = Text.getName(fullPagePath);
			prodPage = pm.create(parent, nodeName, template, item.name);
			log.debug("created page at {}", prodPage.getPath());
		}
		return prodPage;
	}

	private void updateProperties(ResourceResolver resourceResolver, MagentoProduct item, Resource productCmpRes,
								  String server, String storeName, IdentityProvider magentoIdentityProvider) throws IOException, RepositoryException {
		removeChildNode(productCmpRes);

		ModifiableValueMap mvp = productCmpRes.adaptTo(ModifiableValueMap.class);
		Map<String, String> prodProps = removeItems(item);
		MagentoProduct.MediaGalleryEntry[] mediaGalleryEntries = item.mediaGalleryEntries;
		Set<String> images = new LinkedHashSet<>();
		mvp = removeKeyItem(mvp,"message");
		mvp = removeKeyItem(mvp,"special_price");
		String primaryImage = null;
		log.debug("Required Assets value is :: {}", requiredAssets);
		if (requiredAssets) {
			if (null != mediaGalleryEntries && mediaGalleryEntries.length > 0) {
				log.debug("mediaGalleryEntries value is :: {} and length is :: {}", mediaGalleryEntries,mediaGalleryEntries.length);
				primaryImage = addMediaGalleryEntry(mediaGalleryEntries,item,resourceResolver,images,storeName,magentoIdentityProvider);

				log.debug("MVP formed is:: {}",mvp);
				mvp = removeKeyItem(mvp,MEDIA_GALLERY_ENTRIES);
			}
			if (images.isEmpty()) {
				log.debug("Images are empty....");
				images.add(this.defaultImage);
			}
			Set<String> orderedImages = orderMediaGallery(images, primaryImage);
			mvp.put(MEDIA_GALLERY_ENTRIES, orderedImages.toArray());
			log.debug("MVP formed after adding orderedImages::{}",mvp);
		}
		mvp = addConfigurableProduct(item,mvp,resourceResolver,productCmpRes);
		HashMap<String, String> customAttributes = (HashMap<String, String>) item.getCustomAttributes();
		mvp = addKeyValue(customAttributes,resourceResolver,item,productCmpRes,server,storeName,mvp);
		if (customAttributes.containsKey(CASE_OF_PRODUCT)
				&& StringUtils.equalsIgnoreCase(customAttributes.get(CASE_OF_PRODUCT), "null")) {
			customAttributes.remove(CASE_OF_PRODUCT);
			mvp = removeKeyItem(mvp,CASE_OF_PRODUCT);
			log.debug("MVP formed after removing case_of_product::{}",mvp);
		}
		if (customAttributes.containsKey(SIZE_OR_WEIGHT) && StringUtils.equalsIgnoreCase(customAttributes.get(SIZE_OR_WEIGHT), "null")) {
			customAttributes.remove(SIZE_OR_WEIGHT);
			mvp = removeKeyItem(mvp,SIZE_OR_WEIGHT);
		}

		if (customAttributes.containsKey(THUMBNAIL)) {
			Set<String> thumbimages;
			thumbimages = createThumbnailAssets(customAttributes,resourceResolver,item,storeName,magentoIdentityProvider);
			mvp.remove(THUMBNAIL);
			customAttributes.put(THUMBNAIL, thumbimages.iterator().next());
			log.debug("After Removing thumbnail asset...{}",mvp);
		}

		if (customAttributes.containsKey(MMRF_LINK)) {
			Set<String> pdfLink;
			pdfLink = createPdfAssets(customAttributes,resourceResolver,item,storeName,magentoIdentityProvider);
			mvp.remove(MMRF_LINK);
			customAttributes.put(MMRF_LINK, pdfLink.iterator().next());
			log.debug("After Removing pdf asset...{}",mvp);
		}else {mvp = removeKeyItem(mvp,MMRF_LINK);}

		if (customAttributes.containsKey(DESCRIPTION)) {
			mvp.remove(DESCRIPTION);
			customAttributes.put(DESCRIPTION, StringEscapeUtils.unescapeHtml4(customAttributes.get(DESCRIPTION)));
		}
		log.debug("Before putting prodpros into map...{},{}",prodProps,customAttributes);
		mvp.putAll(prodProps);
		mvp.putAll(customAttributes);
		mvp.put(NameConstants.PN_PAGE_LAST_MOD, Calendar.getInstance());
		log.debug("Final MVP formed ::{}",mvp);
		resourceResolver.commit();
		updateUrlPathMagento(item,primaryImage,images,productCmpRes,storeName,server);

	}

	private Set<String> createThumbnailAssets(HashMap<String, String> customAttributes, ResourceResolver resourceResolver, MagentoProduct item, String storeName, IdentityProvider magentoIdentityProvider) {
		Set<String> thumbnailImages = new LinkedHashSet<>();
		if (StringUtils.isNotBlank(customAttributes.get(THUMBNAIL))) {
			log.debug("thumbnail_file :: {}", customAttributes.get(THUMBNAIL));
			log.debug("Before creating assets::{}",item.sku);
			createAssets(customAttributes.get(THUMBNAIL), resourceResolver, item.sku, true, thumbnailImages, storeName,magentoIdentityProvider);
			log.debug("After creating assets...");
		}
		return thumbnailImages;
	}

	private Set<String> createPdfAssets(HashMap<String, String> customAttributes, ResourceResolver resourceResolver, MagentoProduct item, String storeName, IdentityProvider magentoIdentityProvider) {
		Set<String> pdfPaths = new LinkedHashSet<>();
		if (StringUtils.isNotBlank(customAttributes.get(MMRF_LINK))) {
			log.debug("pdf_file :: {}", customAttributes.get(MMRF_LINK));
			log.debug("Before creating assets::{}",item.sku);
			createAssets(customAttributes.get(MMRF_LINK), resourceResolver, item.sku, true, pdfPaths, storeName,magentoIdentityProvider);
			log.debug("After creating pdf assets...");
		}
		return pdfPaths;
	}

	private ModifiableValueMap addConfigurableProduct(MagentoProduct item, ModifiableValueMap mvp, ResourceResolver resourceResolver, Resource productCmpRes) {
		MagentoProduct.ExtensionAttributes extension_attributes = item.extensionAttributes;
		if (null != extension_attributes && null != extension_attributes.configurableProductOptions) {
			processConfigurableOptions(resourceResolver, productCmpRes, extension_attributes);
			int[] configurable_product_links = extension_attributes.configurableProductLinks;
			mvp.put("configurable_product_links", configurable_product_links);
			log.debug("MVP formed after adding configurable_product_links::{}",mvp);
		}
		return mvp;
	}

	private String addMediaGalleryEntry(MagentoProduct.MediaGalleryEntry[] mediaGalleryEntries, MagentoProduct item, ResourceResolver resourceResolver, Set<String> images, String storeName, IdentityProvider magentoIdentityProvider) {
		String primaryImagePath = null;
		for (MagentoProduct.MediaGalleryEntry mediaGalleryEntry : mediaGalleryEntries) {

			if (StringUtils.isNotBlank(mediaGalleryEntry.file) && mediaGalleryEntry.disabled == false) {
				log.debug("media_gallery_entry_file :: {}", mediaGalleryEntry.file);
				createAssets(mediaGalleryEntry.file, resourceResolver, item.sku, true, images, storeName, magentoIdentityProvider);
			}
			if (mediaGalleryEntry.types.length != 0 && Arrays.asList(mediaGalleryEntry.types).contains(IMAGE)) {
				log.debug("Inside if and mediaGallery entry value :: {},{},{}", mediaGalleryEntry.file, item.sku, storeName);
				primaryImagePath = getImagePath(mediaGalleryEntry.file, item.sku, storeName);
				log.debug("Primary Image formed is:: {}", primaryImagePath);
			}
		}
		return primaryImagePath;
	}

	private void updateUrlPathMagento(MagentoProduct item, String primaryImage, Set<String> images, Resource productCmpRes, String storeName, String server) {
		if (StringUtils.equalsIgnoreCase(item.type_id, SIMPLE) && requiredAssets) {
			String dam_image = this.defaultImage;
			if (null != primaryImage) {
				dam_image = primaryImage;
			} else {
				if (null != images && !images.isEmpty()) {
					dam_image = images.iterator().next();
				}
			}
			String aem_url = productCmpRes.getParent().getPath();
			if (requiredShortening) {
				aem_url = getShortenPath(aem_url, storeName);
			}
			magentoConnectorService.updateURLPathInMagento(item.sku, aem_url, dam_image,
					magentoConnectorService.getMagentoStoreCode(productCmpRes.getParent().getPath()), server, magentoIdentityProvider);
		}
	}

	private ModifiableValueMap addKeyValue(HashMap<String, String> customAttributes, ResourceResolver resourceResolver, MagentoProduct item, Resource productCmpRes, String server, String storeName, ModifiableValueMap modifiableValueMap) throws RepositoryException {
		if (null != item.tierPrices) {
			processTierPrices(item, productCmpRes);
		}
		if (StringUtils.equalsIgnoreCase(item.type_id, CONFIGURABLE)) {
			modifiableValueMap.put("hideInNav", "true");
		}
		if (!modifiableValueMap.containsKey("generateNutritionFacts")) {
			modifiableValueMap.put("generateNutritionFacts", true);
		}
		if (customAttributes.containsKey(AW_SUBSCRIPTION_TYPE)) {
			modifiableValueMap.put(AW_SUBSCRIPTION_TYPE, customAttributes.get(AW_SUBSCRIPTION_TYPE));
			processSubscriptionInfo(resourceResolver, item, productCmpRes, server, storeName);
		} else {
			modifiableValueMap.put(AW_SUBSCRIPTION_TYPE, "1");
		}
		return modifiableValueMap;
	}

	private ModifiableValueMap removeKeyItem(ModifiableValueMap modifiableValueMap, String key) {
		if (modifiableValueMap.containsKey(key)) {
			modifiableValueMap.remove(key);
		}
		return modifiableValueMap;
	}

	private Map<String, String> removeItems(MagentoProduct item) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		Gson gson = new Gson();
		Map<String, String> properties = objectMapper.readValue(gson.toJson(item), Map.class);
		log.debug("Product page properties :: {}", properties);
		properties.remove(MEDIA_GALLERY_ENTRIES);
		properties.remove("custom_attributes");
		if (StringUtils.isNotBlank(item.name)) {
			if (properties.containsKey(NAME)) {
				properties.remove(NAME);
			}
			properties.put(NAME, item.name);
		}
		return properties;
	}

	private void removeChildNode(Resource productCmpRes) throws RepositoryException {
		Node childNode = productCmpRes.adaptTo(Node.class);
		NodeIterator itr = childNode.getNodes();
		while (itr.hasNext()) {
			Node subChildNode = itr.nextNode();
			if (subChildNode.getName().equals(SIZE) || subChildNode.getName().equals(FLAVOR)) {
				subChildNode.remove();
			}
		}
	}

	private String getShortenPath(String aemUrl, String storeName) {
		String[] allPieces = aemUrl.split(FORWARD_SLASH);
		int getAbsoluteParent = storeName.equalsIgnoreCase(NEW_SIMILAC) ? 6 : 4;
		StringBuilder shortUrl = new StringBuilder();
		for (int i = getAbsoluteParent; i < allPieces.length; i++) {
			shortUrl.append(FORWARD_SLASH).append(allPieces[i]);
		}
		return shortUrl.toString();
	}

	private Set<String> orderMediaGallery(Set<String> images, String primaryImage) {
		Set<String> orderedImages = new LinkedHashSet<>();
		if (null != primaryImage) {
			orderedImages.add(primaryImage);
		}
		if (null != images) {
			if (images.contains(primaryImage)) {
				images.remove(primaryImage);
			}
			orderedImages.addAll(images);
		}
		return orderedImages;
	}

	private void processTierPrices(MagentoProduct item, Resource productCmpRes) {
		LinkedHashMap<Object, LinkedHashMap<Double,Double>> customerGroups = new LinkedHashMap<>();
		LinkedHashMap<Double, Double> customerGroupProps = null;
		for (MagentoProduct.TierPrice tierPrice : item.tierPrices) {
			if (customerGroups.containsKey(tierPrice.customerGroupId)) {
				customerGroups.get(tierPrice.customerGroupId).put(tierPrice.qty, tierPrice.value);
			} else {
				customerGroupProps = new LinkedHashMap<Double, Double>();
				customerGroupProps.put(tierPrice.qty, tierPrice.value);
				customerGroups.put(Long.toString(tierPrice.customerGroupId), customerGroupProps);
			}
		}
		Node productNode = productCmpRes.adaptTo(Node.class);
		Node tierPriceNode = createSubNode(productNode, "tier_prices", new HashMap<>());
		for (Map.Entry<?,?> entry : customerGroups.entrySet()) {
			createSubNode(tierPriceNode, (String) entry.getKey(), (Map<String, Object>) entry.getValue());
		}
	}

	private Node createSubNode(Node productResourceNode, String nodeName, Map<String, Object> variantAttributes) {
		String reqVariantNodeName = magentoConnectorService.createValidJcrName(nodeName);
		try {
			if (null != productResourceNode && productResourceNode.hasNode(reqVariantNodeName)) {
				if (StringUtils.equals( reqVariantNodeName, SUBSCRIPTION_WEEK ) || StringUtils.equals( reqVariantNodeName, DISCOUNT ) ) {
					log.debug("Node name :: {}", reqVariantNodeName);
					productResourceNode.getNode( reqVariantNodeName ).remove();
					productResourceNode.getSession().save();
					productResourceNode = productResourceNode.addNode(reqVariantNodeName);
				} else {
					productResourceNode = productResourceNode.getNode( reqVariantNodeName );
				}
			} else if (null != productResourceNode && !productResourceNode.hasNode(reqVariantNodeName)) {
				productResourceNode = productResourceNode.addNode(reqVariantNodeName);
			}
			if (null != productResourceNode) {
				for (Map.Entry<String, Object> entry : variantAttributes.entrySet()) {
					log.debug("Entry Value :: {}", entry.getValue());
					setProperty(productResourceNode, entry, nodeName);
				}
			}
		} catch (RepositoryException e) {
			log.error("RepositoryException in create sub node : {}", e.getMessage());
		}
		return productResourceNode;
	}

	private Node setProperty(Node productResourceNode, Map.Entry<String, Object> entry, String nodeName) {
		try {
			if (entry.getValue() instanceof String) {
				productResourceNode.setProperty(entry.getKey().toString(), entry.getValue().toString());
			} else if (entry.getValue() instanceof HashMap) {
				HashMap<?,?> subscriptionEntry = (HashMap) entry.getValue();
				String value = StringUtils.equals(nodeName, SUBSCRIPTION_WEEK) ? NAME : DISCOUNT;
				if (subscriptionEntry.containsKey(value)) {
					log.debug("subscriptionEntry :: {}", subscriptionEntry.get(value));
					productResourceNode.setProperty(entry.getKey().toString(), subscriptionEntry.get(value).toString());
				}
			}
		} catch (RepositoryException e) {
			log.error("RepositoryException in setProperty :: {}", e.getMessage());
		}

		return productResourceNode;
	}

	private void processSubscriptionInfo(ResourceResolver resourceResolver, MagentoProduct item, Resource productCmpRes,
										 String server, String storeName) throws RepositoryException {
		try {
			MagentoProduct magentoSubscriptionProduct;
			if (StringUtils.isBlank(server)) {
				magentoSubscriptionProduct = magentoConnectorService.getProductSubscription(
						new String(item.sku.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8), storeName);
			} else {
				magentoSubscriptionProduct = item;
			}
			List<String> planIds = magentoSubscriptionProduct.getCategoryIds("aw_sarp2_subscription_options");
			log.debug("aw_sarp2_subscription_options :: {}", planIds.size());
			if (planIds.size() > 1) {
				Map<String, Object> variantAttributes = getVariantAttributes(resourceResolver, planIds,
						ABBOTT_SUBSCRIPTION_PATH, PLAN_ID);
				if (!variantAttributes.isEmpty()) {
					Node productResourceNode = productCmpRes.adaptTo(Node.class);
					Node subscriptionNode;
					if (productResourceNode.hasNode(SUBSCRIPTION)) {
						subscriptionNode = productResourceNode.getNode(SUBSCRIPTION);
					} else {
						subscriptionNode = productResourceNode.addNode(SUBSCRIPTION);
					}
					createSubNode(subscriptionNode, SUBSCRIPTION_WEEK, variantAttributes);
					createSubNode(subscriptionNode, DISCOUNT, variantAttributes);
				}
			}
		} catch (CommerceException e) {
			log.error("CommerceException in importing subscription product with given Sku :: {}", e.getMessage());
		}
	}

	private void processConfigurableOptions(ResourceResolver resourceResolver, Resource productCmpRes,
											MagentoProduct.ExtensionAttributes extensionAttributes) {
		MagentoProduct.ConfigurableProductOptions[] options = extensionAttributes.configurableProductOptions;
		for (MagentoProduct.ConfigurableProductOptions configurable_product_option : options) {
			List<String> sizesList = new ArrayList<>();
			for (MagentoProduct.Value valueMap : configurable_product_option.values) {
				sizesList.add(Integer.toString(valueMap.valueIndex));
			}
			String searchPath = StringUtils.equalsIgnoreCase(configurable_product_option.label, "Size")
					? "/content/cq:tags/abbott/abbott-sizes"
					: "/content/cq:tags/abbott/abbott-flavors";
			Map<String, Object> variantAttributes = getVariantAttributes(resourceResolver, sizesList, searchPath,
					VALUE);
			if (!variantAttributes.isEmpty()) {
				Node productResourceNode = productCmpRes.adaptTo(Node.class);
				createSubNode(productResourceNode, configurable_product_option.label, variantAttributes);
			}
		}
	}

	private Map<String, Object> getVariantAttributes(ResourceResolver resourceResolver, List<String> sizeIds,
													 String sizeTagsPath, String propertyName) {
		List<Hit> results = executeQuery(resourceResolver, sizeIds, sizeTagsPath, propertyName);
		Map<String, Object> sizesMap = new HashMap<>();
		for (Hit hit : results) {
			try {
				ValueMap properties = hit.getProperties();
				String val = null;
				if (StringUtils.equalsIgnoreCase(propertyName, PLAN_ID)) {
					Map<String, String> subscriptionMap = new HashMap<>();
					subscriptionMap.put(NAME, properties.get(NAME).toString());
					subscriptionMap.put(DISCOUNT, properties.get(DISCOUNT).toString());
					sizesMap.put(properties.get(propertyName).toString(), subscriptionMap);
					log.debug("Subscription Map :: {}", subscriptionMap);
				} else {
					val = properties.get(LABEL).toString();
					sizesMap.put(properties.get(propertyName).toString(), val);
				}

			} catch (RepositoryException e) {
				log.error("RepositoryException while reading the size attributes {}", e.getMessage());
			}
		}
		return sizesMap;
	}

	private List<Hit> executeQuery(ResourceResolver resourceResolver, List<String> sizeIds, String sizeTagsPath,
								   String propertyName) {
		final Map<String, Object> queryMap = new HashMap<>();
		QueryBuilder queryBuilder = resourceResolver.adaptTo(QueryBuilder.class);
		queryMap.put("path", sizeTagsPath);
		queryMap.put("type", TagConstants.NT_TAG);
		queryMap.put("property", propertyName);
		for (int i = 1; i <= sizeIds.size(); i++) {
			queryMap.put("property." + i + "_value", sizeIds.get(i - 1));
		}
		queryMap.put("p.limit", "-1");
		log.debug("Query map formed is::{}",queryMap);
		com.day.cq.search.Query query = queryBuilder.createQuery(PredicateGroup.create(queryMap),
				resourceResolver.adaptTo(Session.class));
		SearchResult result = query.getResult();
		return result.getHits();
	}

	public void deleteProduct(ResourceResolver resourceResolver, String storePath, String sku) {
		try {
			Resource product = resourceResolver.getResource(getProductPath(storePath, sku));
			if (product == null) {
				return;
			}
			Node productNode = product.adaptTo(Node.class);
			productNode.remove();
		} catch (RepositoryException e) {
			log.error("Failed to delete product :{} because :{} ", sku, e);
		}

	}

	protected String getProductPath(String storePath, String sku) {
		String path = "";
		String productSKU = sku;
		boolean variation = false;
		if (null != sku) {
			if (sku.contains(".")) {
				productSKU = sku.substring(0, sku.indexOf('.'));
				variation = true;
			}
			if (sku.length() >= 4) {
				path = storePath + FORWARD_SLASH + sku.substring(0, 2) + FORWARD_SLASH + sku.substring(0, 4)
						+ FORWARD_SLASH + productSKU;
			} else {
				path = storePath + FORWARD_SLASH + sku;
			}
			if (variation) {
				path += FORWARD_SLASH + sku;
			}
			log.debug("Node path :: {}", path);
			return path;
		}
		return path;
	}

	protected void createAssets(String imgUrl, ResourceResolver resourceResolver, String sku,
								boolean fromCreateProductCall, Set<String> assetsList, String storeName, IdentityProvider magentoIdentityProvider) {
		try {
			if (fromCreateProductCall) {
				String imagePath = createAssetStream(imgUrl, resourceResolver, sku, storeName,magentoIdentityProvider);
				if (null != imagePath) {
					assetsList.add(imagePath);
				}
			}
			resourceResolver.commit();
		} catch (PersistenceException e) {
			log.error("Failed to upload asset : {}", e.getMessage());
		}
	}

	private String getImagePath(String imgUrl, String sku, String storeName) {
		String imageName;
		if(imgUrl.contains(".pdf")){
			imageName = FORWARD_SLASH+imgUrl;
			log.debug("PDF Name :{} ",imageName);
		}else{
			imageName = StringUtils.substring(imgUrl, StringUtils.lastIndexOf(imgUrl, '/'));
			log.debug("Image Name :{} ",imageName);
		}
		String imagePath = assetsRootPath + FORWARD_SLASH + sku + imageName;
		if (storeName.equalsIgnoreCase(NEW_SIMILAC)) {
			imagePath = similacAssetsRootPath + FORWARD_SLASH + sku + imageName;
		}
		log.trace("Image creating at :{}", imagePath);
		return imagePath;
	}

	private String createAssetStream(String imgUrl, ResourceResolver resourceResolver, String sku, String storeName, IdentityProvider magentoIdentityProvider) {
		URLConnection urlConnection;
		AssetManager assetMgr = resourceResolver.adaptTo(AssetManager.class);
		Session session = resourceResolver.adaptTo(Session.class);
		String damUrl = getImagePath(imgUrl, sku, storeName);
		String assetsServer = magentoIdentityProvider.getServer();
		log.debug("dam url :: {}", damUrl);
		Resource imageResource = resourceResolver.getResource(damUrl);
		if(imgUrl.contains(".pdf")){
			imgUrl = FORWARD_SLASH+imgUrl;
		}
		log.debug("server :: {} mediafolderpath :: {} imgUrl :: {} ", assetsServer, assetsPrefix, imgUrl);
		try {
			if (null == imageResource) {
				urlConnection = new URL(assetsServer + assetsPrefix + imgUrl).openConnection();
				urlConnection.setRequestProperty(X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE);
				urlConnection.setConnectTimeout(7000);
				urlConnection.setReadTimeout(7000);
				InputStream inputStream = urlConnection.getInputStream();
				ValueFactory factory = session.getValueFactory();
				Binary binary = factory.createBinary(inputStream);
				log.debug("final dam url after connection :: {}", damUrl);
				if(imgUrl.contains(".pdf")){
					assetMgr.createOrReplaceAsset(damUrl, binary, "application/pdf", true);
				}else {
					assetMgr.createOrReplaceAsset(damUrl, binary, "image/jpeg", true);
				}
				inputStream.close();
			}
			return damUrl;
		} catch (IOException e) {
			log.error("IOException occured during creation of image in dam:{}", e.getMessage());
		} catch (UnsupportedRepositoryOperationException e) {
			log.error("UnsupportedRepositoryOperationException occurred during creation of image in dam:", e);
		} catch (RepositoryException e) {
			log.error("RepositoryException occurred during creation of image in dam:", e);
		}
		return null;
	}

	public String getProductPagesRootPath(String storeName) {
		return StringUtils.isNotBlank(storeName) && storeName.equalsIgnoreCase(NEW_SIMILAC) ? similacProductPagesRoot
				: productPagesRoot;
	}
	@Override
	public void addAndUpdateProducts(ResourceResolver resourceResolver, String contentRoot,
									 MagentoProduct productObject, String token, MagentoConnectorService magentoConnectorService,
									 String storeName, String storeServer) {
		log.debug("In add and update Product");
		try {
			this.magentoConnectorService = magentoConnectorService;
			Map<String, String> customProperties = productObject.getCustomAttributes();
			String parentSku = customProperties.get(PARENT_SKU);
			log.debug("parentSku :: {}", parentSku);
			StringBuilder fullPagePath = new StringBuilder().append(contentRoot);
			List<String> categories = null;
			String configProdPageName = null;
			MagentoProduct configProduct = null;
			if (!StringUtils.equals(storeName, SIMILAC) && parentSku != null) {
				log.debug("inside Abbott  Store Cat");
				configProduct = magentoConnectorService.getStoreBasedProduct(token, parentSku, storeServer);
				categories = configProduct.getCategoryIds(CATEGORY_IDS);
				configProdPageName = getConfigProdPageName(configProduct);
				log.debug("configProdPageName in add and update :: {}", configProdPageName);
			} else {
				categories = productObject.getCategoryIds(CATEGORY_IDS);
			}
			List<String> urlPaths = getCategoryPathsFromTags(resourceResolver, categories, storeName);
			fullPagePath = appendFullPagePath(fullPagePath,configProdPageName,storeName,urlPaths,productObject);
			log.debug("fullPage path ::{}", fullPagePath);
			if(StringUtils.equalsIgnoreCase(fullPagePath.toString(), String.format("%s/", productPagesRoot)) || StringUtils.equalsIgnoreCase(fullPagePath.toString(), String.format("%s/", similacProductPagesRoot))) {
				log.info("Full page path and product root page path are same");
			}else {
				doAddAndUpdateOperation(configProduct,resourceResolver,storeName,storeServer,
						contentRoot,productObject,urlPaths);
			}
		} catch (ReplicationException | CommerceException | WCMException | IOException | RepositoryException  e) {
			log.error("Exception in addAndUpdate products method :{} ", e.getMessage());
		}
	}

	private void doAddAndUpdateOperation(MagentoProduct configProduct, ResourceResolver resourceResolver, String storeName, String storeServer, String contentRoot, MagentoProduct productObject, List<String> urlPaths) throws WCMException, ReplicationException, RepositoryException, IOException {
		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		Map<String, String> customProperties = productObject.getCustomAttributes();
		String configProdPageName = null;
		if(configProduct != null){
			configProdPageName = getConfigProdPageName(configProduct);
			log.debug("configProdPageName ::{}", configProdPageName);
		}
		StringBuilder fullPagePath = appendFullPagePath(new StringBuilder().append(contentRoot),configProdPageName,storeName,urlPaths,productObject);
		log.debug("fullPage path in doAddAndUpdateOperation ::{}", fullPagePath);
		Page page = pageManager.getPage(fullPagePath.toString());
		if (null == page) {
			doPageOperations(fullPagePath,configProduct,contentRoot,resourceResolver,storeName,storeServer,productObject);

		} else {
			if (customProperties.get(AEM_STATUS).equals("0") && productObject.type_id.equalsIgnoreCase(SIMPLE)) {
				deActivatePage(resourceResolver.adaptTo(Session.class), page.getPath());
				deleteProduct(resourceResolver, PRODUCT_OBJECT_SKU, productObject.sku);
				resourceResolver.delete(resourceResolver.getResource(page.getPath()));
				resourceResolver.commit();
			} else {
				log.debug("updateProperties ::{} {} {} {} {} {} {}", resourceResolver, productObject, page.getContentResource(), urlPaths, storeServer,
						storeName, this.magentoIdentityProvider);
				updateProperties(resourceResolver, productObject, page.getContentResource(), storeServer,
						storeName, this.magentoIdentityProvider);
				activatePage(resourceResolver.adaptTo(Session.class), page.getPath());
			}
		}
	}

	private void doPageOperations(StringBuilder fullPagePath,MagentoProduct configProduct, String contentRoot, ResourceResolver resourceResolver, String storeName, String storeServer, MagentoProduct productObject) throws WCMException, ReplicationException {

		PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
		Map<String, String> customProperties = productObject.getCustomAttributes();
		String parentSku = customProperties.get(PARENT_SKU);
		String requiredTemplate = getTemplate(storeName);

		Page page = pageManager.getPage(Text.getRelativeParent(fullPagePath.toString(), 1));
		String pagePath = Text.getRelativeParent(fullPagePath.toString(), 1);
		boolean independant = parentSku != null ? false : true;
		if (page == null && configProduct != null) {
			pagePath = updateProductAndPage(resourceResolver, configProduct, contentRoot, requiredTemplate,
					true, storeServer, storeName);
			log.debug("New Page ::{}", pagePath);
			activatePage(resourceResolver.adaptTo(Session.class), pagePath);
		}
		if (productObject.type_id.equals(SIMPLE) && customProperties.get(AEM_STATUS).equals("0")) {
			log.debug("simple Page::{}", pagePath);
		} else {
			String skuPath = updateProductAndPage(resourceResolver, productObject,
					independant ? contentRoot : pagePath, requiredTemplate, independant,
					storeServer, storeName);
			activatePage(resourceResolver.adaptTo(Session.class), skuPath);
		}
	}

	private StringBuilder appendFullPagePath(StringBuilder fullPagePath, String configProdPageName, String storeName, List<String> urlPaths, MagentoProduct productObject) {
		if (!StringUtils.equals(storeName, SIMILAC) && null != urlPaths && !urlPaths.isEmpty()) {
			String basePath = StringUtils.substringAfter(urlPaths.get(0), defaultCategoryMap.get(storeName));
			log.debug("Base Path :: {}", basePath);
			fullPagePath.append(basePath);
		}

		if (null != configProdPageName) {
			fullPagePath.append("/").append(configProdPageName);
		}
		fullPagePath.append("/");
		log.debug("fullPage path::{}", fullPagePath);

		if (StringUtils.isEmpty(productObject.getAttribute(URL_KEY))) {
			fullPagePath.append(magentoConnectorService.createValidJcrName(productObject.name));
		} else if (storeName.contentEquals(NEW_SIMILAC) && productObject.type_id.equals(SIMPLE)) {
			fullPagePath.append(productObject.getAttribute(AEM_URL_KEY));
		} else {
			fullPagePath.append(productObject.getAttribute(URL_KEY));
		}

		return fullPagePath;
	}

	private String getTemplate(String storeName){
		String requiredTemp;
		if (StringUtils.equalsIgnoreCase(storeName, GLUCERNA)) {
			requiredTemp = glucernaProductPageTemplate;
		} else {
			if (StringUtils.equalsIgnoreCase(storeName, NEW_SIMILAC)) requiredTemp = similacProductPageTemplate;
			else requiredTemp = abbottProductPageTemplate;
		}
		return requiredTemp;
	}

	private String getConfigProdPageName(MagentoProduct configProduct){
		String confProdPageName;
		if (StringUtils.isEmpty(configProduct.getAttribute(URL_KEY))) {
			confProdPageName = magentoConnectorService.createValidJcrName(configProduct.name);
		} else {
			confProdPageName = configProduct.getAttribute(URL_KEY);
		}
		return confProdPageName;
	}

	@Override
	public void deleteProductPage(ResourceResolver resourceResolver, String storeName, MagentoProduct productObject,
								  String contentRoot, String token, MagentoConnectorService magentoConnectorService, String storeServer) {
		log.debug("delete product page");
		log.debug("StoreName, contentRoot and StoreServer are ::{},{},{}",storeName,contentRoot,storeServer);
		try {
			Map<String, String> customProperties = productObject.getCustomAttributes();
			String parentSku = customProperties.get(PARENT_SKU);
			log.info("parentSku :: {}", parentSku);
			StringBuilder fullPagePath = new StringBuilder().append(contentRoot);
			List<String> categories = null;
			String configProdPageName = null;
			MagentoProduct configProduct = null;
			this.magentoConnectorService = magentoConnectorService;
			if (!StringUtils.equals(storeName, SIMILAC) && parentSku != null) {
				configProduct = magentoConnectorService.getStoreBasedProduct(token, parentSku, storeServer);
				categories = configProduct.getCategoryIds(CATEGORY_IDS);
				log.debug("configProduct value  and categories value are :: {},{}", configProduct,categories);
				configProdPageName = getConfigProdPageName(configProduct);
				log.debug("configProdPageName value :: {}", configProdPageName);
			} else {
				categories = productObject.getCategoryIds(CATEGORY_IDS);
			}
			log.debug("categories value :: {}", categories);
			List<String> urlPaths = getCategoryPathsFromTags(resourceResolver, categories, storeName);
			log.debug("urlPaths values are :: {}", urlPaths);
			if (!StringUtils.equals(storeName, SIMILAC) && (null != urlPaths && !urlPaths.isEmpty())) {
				String basePath = StringUtils.substringAfter(urlPaths.get(0), defaultCategoryMap.get(storeName));
				log.debug("Base Path :: {}", basePath);
				fullPagePath.append(basePath);
			}
			if (null != configProdPageName) {
				fullPagePath.append(FORWARD_SLASH).append(configProdPageName);
			}
			fullPagePath.append(FORWARD_SLASH);
			log.debug("URL_Key, TypeId and AEM_URL_Key are ::{},{},{}",productObject.getAttribute(URL_KEY),productObject.type_id,productObject.getAttribute(URL_KEY));
			if (StringUtils.isEmpty(productObject.getAttribute(URL_KEY))) {
				fullPagePath.append(magentoConnectorService.createValidJcrName(productObject.name));
			} else if (storeName.contentEquals(NEW_SIMILAC) && productObject.type_id.equals(SIMPLE)) {
				fullPagePath.append(productObject.getAttribute(AEM_URL_KEY));
			} else {
				fullPagePath.append(productObject.getAttribute(URL_KEY));
			}
			log.debug("fullPage path ::{}", fullPagePath);
			if(StringUtils.equalsIgnoreCase(fullPagePath.toString(), String.format("%s/", productPagesRoot)) || StringUtils.equalsIgnoreCase(fullPagePath.toString(), String.format("%s/", similacProductPagesRoot))) {
				log.info("Full page path and product root page path are same");
			}else {
				log.debug("fullPage path before deactivating page::{}", fullPagePath);
				log.debug("Product SKU::{}", productObject.sku);
				deActivatePage(resourceResolver.adaptTo(Session.class), fullPagePath.toString());
				deleteProduct(resourceResolver, PRODUCT_OBJECT_SKU, productObject.sku);
				resourceResolver.delete(resourceResolver.getResource(fullPagePath.toString()));
				resourceResolver.commit();
			}
		} catch (IOException | ReplicationException | CommerceException e) {
			log.error("Exception in add and upadate products method ::{}",  e.getMessage());
		}
	}

	private String updateProductAndPage(ResourceResolver resourceResolver, MagentoProduct parentProduct,
										String contentRoot, String requiredTemplate, boolean update, String server, String storeName)
			throws WCMException {
		return createProductPage(resourceResolver, parentProduct, contentRoot, requiredTemplate, update, server,
				storeName);
	}

	private List<String> getCategoryPathsFromTags(ResourceResolver resourceResolver, List<String> categories,
												  String storeName) {
		List<String> basePaths = new ArrayList<>();
		HashMap<String, String> responseMap = new LinkedHashMap<>();
		List<Hit> responseList;
		log.debug("Default Category Map Store Name ::{}",defaultCategoryMap.get(storeName));
		responseList = executeQuery(resourceResolver, categories, defaultCategoryMap.get(storeName), "id");

		for (Hit hit : responseList) {
			try {
				ValueMap properties = hit.getProperties();
				String level = properties.get(LEVEL).toString();
				if (level.equals("4")) {
					responseMap.put(properties.get("id").toString(), hit.getResource().getPath());
				}
			} catch (RepositoryException e) {
				log.error("RepositoryException while getting base URLs :{}", e.getMessage());
			}
		}
		addCategoryBasePath(responseMap, categories, basePaths, responseList);
		return basePaths;
	}

	public void addCategoryBasePath(Map<String, String> responseMap, List<String> categories, List<String> basePaths,
									List<Hit> responseList) {
		if (!responseMap.isEmpty()) {
			log.debug("Response map is ::{}",responseMap);
			log.debug("Categories are ::{}",categories);
			for (String category : categories) {
				if (responseMap.containsKey(category)) {
					basePaths.add(responseMap.get(category));
				}
			}
			log.debug("Base Paths returning is ::{}",basePaths);
		} else {
			String lastCategory = categories.get(categories.size() - 1);
			log.debug("Last Category is ::{}",lastCategory);
			for (Hit hit : responseList) {
				try {
					ValueMap properties = hit.getProperties();
					log.debug("Id from valueMap is ::{}",properties.get("id"));
					if (StringUtils.equals(lastCategory, properties.get("id").toString())) {
						basePaths.add(hit.getResource().getPath());
					}
				} catch (RepositoryException e) {
					log.error("RepositoryException while getting base URLs :{}", e.getMessage());
				}
			}
			log.debug("Base Paths returning is ::{}",basePaths);
		}
	}

	public void activatePage(Session session, String path) throws ReplicationException {
		log.debug("Inside Activate Method ::session {} :::path::{}:::replicator", session,path);
		replicator.replicate(session, ReplicationActionType.ACTIVATE, path);
	}

	public void deActivatePage(Session session, String path) throws ReplicationException {
		replicator.replicate(session, ReplicationActionType.DEACTIVATE, path);
	}

	@Reference(name = "configurationFactory", cardinality = ReferenceCardinality.MULTIPLE, policy = ReferencePolicy.DYNAMIC)
	public void bindConfigurationFactory(final ProductRootCatConfigService config) {
		log.debug("bindConfigurationFactory: {}", config.getStoreName());
		if (configurationList == null) {
			configurationList = new ArrayList<>();
		}
		configurationList.add(config);
		populateCategoryMap();
		populateStoreID();
		populateCategoryID();
	}

	private void populateCategoryMap() {
		defaultCategoryMap = new HashMap<>();
		for (ProductRootCatConfigService categoryConfig : configurationList) {
			if (categoryConfig.getDefaultCategory() != null) {
				defaultCategoryMap.put(categoryConfig.getStoreName(), categoryConfig.getDefaultCategory());
			}
		}
	}

	private void populateStoreID() {
		storeIdMap = new HashMap<>();
		for (ProductRootCatConfigService categoryConfig : configurationList) {
			storeIdMap.put(categoryConfig.getStoreName(), categoryConfig.getStoreID());
		}
	}

	private void populateCategoryID() {
		categoryIdMap = new HashMap<>();
		for (ProductRootCatConfigService categoryConfig : configurationList) {
			categoryIdMap.put(categoryConfig.getStoreName(), categoryConfig.getCategoryId());
		}
	}

	public void unbindConfigurationFactory(final ProductRootCatConfigService config) {
		configurationList.remove(config);
	}

}