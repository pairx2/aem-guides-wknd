package com.abbott.magento.catalog.connector;

import com.abbott.magento.catalog.connector.models.*;
import com.abbott.magento.exception.CommerceException;
import com.abbott.magento.identity.models.ProductStock;
import com.abbott.magento.services.IdentityProvider;
import com.day.cq.commons.jcr.JcrUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET;
import static com.abbott.magento.constants.MagentoConstants.X_ORIGIN_SECRET_VALUE;

public class MagentoConnectorService {

	private static final String NEW_SIMILAC = "new_similac";

	private static final Logger log = LoggerFactory.getLogger(MagentoConnectorService.class);

	private String server;
	private String username;
	private String password;
	private String authToken;
	private static final int PAGE_SIZE = 2500;
	private static final String AUTHORIZATION="Authorization";
	private static final String PRODUCTS="/rest/V1/products/";
	private static final String CATEGORIES="/rest/V1/categories/";
	private static final String PRODUCTS_ATTRIBUTES="/rest/V1/products/attributes/";
	private static final String PRODUCTS_TIER_PRICES_INFORMATION="/rest/V1/products/tier-prices-information";
	private static final String LOG_MESSAGE="Magento connector service get product--- SKU is  {}";

	private ObjectMapper mapper = new ObjectMapper();

	public MagentoConnectorService() {
		mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
	}

	public MagentoConnectorService(String server) {
		this.server = server;
		mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
	}

	public MagentoConnectorService(String server, String username, String password) {
		this.server = server;
		this.username = username;
		this.password = password;

		mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

		this.authToken = getToken();

	}

	public String getToken() {
		String token = "";
		try {
			com.abbott.magento.identity.models.AuthCredentials authCredentials = new com.abbott.magento.identity.models.AuthCredentials(
					username, password);
			log.debug("Getting Admin Token: {},{}",server,username);
			token = Request.Post( server + "/rest/V1/integration/admin/token" ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.bodyString( mapper.writeValueAsString( authCredentials ), ContentType.APPLICATION_JSON ).execute()
					.returnContent().asString();
		} catch (IOException e) {
			log.error("Unable to get the token : {}", e.getMessage());
		}
		return "Bearer " + token.replace("\"", "");
	}

	public MagentoProductCategories getProductCategories(String sku) {
		log.debug("Getting product cats for SKU: {}", sku);
		MagentoProductCategories productCategories = null;
		String response;
		try {
			response = Request.Get(server + PRODUCTS + sku).addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute()
					.returnContent().asString();
			log.debug("response :: {}", response);
			if(null!=response){
				productCategories = mapper.readValue(response, MagentoProductCategories.class);
			}

		} catch (IOException e) {
			log.error("Unable to get the product Categories  : {}", e.getMessage());
		}
		return productCategories;
	}

	/* Method to return product stock information */

	public ProductStock getProductStock(String sku) {

		log.debug("Getting product stock status directly from magento for SKU: {}", sku);
		ProductStock productStock = null;
		String response;
		try {
			response = Request.Get( server + "/rest/V1/stockStatuses/" + sku ).addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			productStock = mapper.readValue(response, ProductStock.class);
			return productStock;
		} catch (IOException e) {
			log.error("Unable to get the product Stock  : {}", e.getMessage());
		}

		return productStock;
	}

	public List<MagentoProduct> getProducts(Integer storeId){
		MagentoProductList response = getProductsbyPage(storeId);
		return (null != response)?response.getProducts():null;
	}

	public List<MagentoProduct> getProducts() {

		List<MagentoProduct> magentoProducts = null;
		MagentoProductList response = null;

		response = getProductsbyPage();
		if (null != response) {
			magentoProducts = response.getProducts();
		}
		log.debug("magentoProducts :: {}", magentoProducts);
		if (null != magentoProducts && !(magentoProducts.isEmpty())) {
			return magentoProducts;
		}
		return magentoProducts;
	}
	public Map<String, Object> getAbbottProducts(String store,String storeID){
		Map<String, Object> abbottProducts = new HashMap<String, Object>();
		abbottProducts.put(store, getProducts(Integer.parseInt(storeID)));
		return abbottProducts;
	}


	public String getCategoryName(String categoryId) {
		log.debug("Getting categoryName");
		MagentoCategory category;
		String categoryName = null;
		String response;
		try {
			response = Request.Get( server + CATEGORIES + categoryId ).addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			log.debug("category response :: {}",response);
			category = mapper.readValue(response, MagentoCategory.class);
			Long parentId = category.parentId;
			if (parentId > 2) {
				response = Request.Get(server + CATEGORIES + category.parentId)
						.addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute().returnContent().asString();
				category = mapper.readValue(response, MagentoCategory.class);
			}
			categoryName = category.name;
		} catch (IOException e) {
			log.error("Error getting categoryName: ERROR:{} ", e.getMessage());
		}
		return categoryName;
	}

	private MagentoProductList getProductsbyPage(Integer storeId){
		log.debug("Getting products");
		MagentoProductList productList = null;
		String response;
		try {
			log.debug("getting products service call -=-= {}/rest/V1/products?searchCriteria[pageSize]={}&searchCriteria[currentPage]=0&searchCriteria[filterGroups][0][filters][0][field]=store_id&searchCriteria[filterGroups][0][filters][0][value]={}",server, PAGE_SIZE,storeId);
			// need to make dynamic for larger catalogs
			response = Request.Get( server + "/rest/V1/products?searchCriteria[pageSize]=" + PAGE_SIZE + "&searchCriteria[currentPage]=0&searchCriteria[filterGroups][0][filters][0][field]=store_id&searchCriteria[filterGroups][0][filters][0][value]=" + storeId )
					.addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			log.debug("Products json :{}",response);
			productList =  mapper.readValue(response, MagentoProductList.class);
		} catch (IOException e) {
			log.error("Error getting Product List: ERROR: {} ", e.getMessage());
		}
		return productList;
	}
	private MagentoProductList getProductsbyPage() {
		log.debug("Getting products");
		MagentoProductList productList = null;
		String response;
		try {
			response = Request
					.Get(server + "/rest/V1/products?searchCriteria[pageSize]=399&searchCriteria[currentPage]=0")
					.addHeader(AUTHORIZATION, authToken).execute().returnContent().asString();
			productList = mapper.readValue(response, MagentoProductList.class);
		} catch (IOException e) {
			log.error("Error getting Product List: ERROR: {}", e.getMessage());
		}
		return productList;
	}
	public AbbottTags getAbbottCategories(){
		AbbottTags category = null;
		String response;
		try {
			response = Request.Get( server + "/rest/V1/categories" )
					.addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			category =  mapper.readValue(response, AbbottTags.class);
		} catch (IOException e) {
			log.error("Error Getting Tags from Server: ERROR: {}", e.getMessage());
		}
		return category;
	}


	public AbbottTags getAbbottCategoriesUsingGraphQL(String categoryId) {
		log.trace("get abbott catergories using graphql method");
		AbbottTags category = null;
		String query = "{\"query\":\"    {\\r\\n  categoryList(filters: {ids: {in: [\\\""+categoryId+"\\\"]}}) {\\r\\n    children_count\\r\\n    children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n     children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n      children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n        children {\\r\\n      id\\r\\n      level\\r\\n      name\\r\\n      path\\r\\n      url_path\\r\\n      url_key\\r\\n      meta_title\\r\\n      meta_keywords\\r\\n      meta_description\\r\\n      }\\r\\n      }\\r\\n    }\\r\\n    }\\r\\n  }\\r\\n}\\r\\n\",\"variables\":{}}";
		try {
			log.debug("get categories using graphQl {} - ", query);
			String responseString = Request.Post(server+"/graphql").addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.bodyString(query, ContentType.APPLICATION_JSON).execute().returnContent().asString();
			JsonObject json = new JsonParser().parse(responseString).getAsJsonObject();
			JsonObject data = json.getAsJsonObject("data");
			JsonArray jsonArray = data.getAsJsonArray("categoryList");
			category =  mapper.readValue(jsonArray.get(0).toString(), AbbottTags.class);
		} catch (IOException e) {
			log.error("Exception in getting categories from magento using graphql : {}", e.getMessage());
		}
		return category;
	}

	public List<HashMap<String,Object>> getAbbottVariationCategories(String value, String token){
		if(StringUtils.isBlank(token)) {
			getToken();
		}else {
			authToken = token;
		}
		String response;
		List<HashMap<String,Object>> sizesMap = null;
		try {
			response = Request.Get( server + PRODUCTS_ATTRIBUTES + value + "/options" )
					.addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			sizesMap = (List<HashMap<String, Object>>) mapper.readValue(response, Object.class);
			log.debug("HashMap :: {}", sizesMap);

		} catch (IOException e) {
			log.error("Error Getting Tags from Server: ERROR :: {}", e.getMessage());
		}
		return sizesMap;
	}

	public List<MagentoProduct> getProductVariants(String sku) {
		log.debug("Getting Product Variants for SKU: {}", sku);

		List<MagentoProduct> productList = null;
		String response;
		try {
			response = Request.Get(server + "/rest/V1/configurable-products/" + sku + "/children")
					.addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute().returnContent().asString();
			log.debug("getProductVariants response");
			productList = mapper.readValue(response, new TypeReference<List<MagentoProduct>>() {
			});
			log.debug("Found {}  variants for: {}", productList.size(), sku);
		} catch (IOException e) {
			log.error("Error getting Variants for sku: ERROR: {}", e.getMessage());
		}
		return productList;
	}

	public MagentoCategory getCategories() {
		MagentoCategory category = null;
		String response;
		try {
			response = Request.Get(server + "/rest/V1/categories").addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute()
					.returnContent().asString();
			category = mapper.readValue(response, MagentoCategory.class);
		} catch (IOException e) {
			log.error("Error Getting Cats from Server: ERROR : {}", e.getMessage());
		}
		return category;
	}

	/*
	 * code to retrieve the tier prices of a product for whom the sku is defined
	 * --gaurav.t
	 */
	public List<TierPrices> getTierPrices(String sku) {
		List<TierPrices> tierPrices = null;
		String response;
		try {
			String json = "{\n" + "  \"skus\": [\"" + sku + "\"" + "  ]\n" + "}";
			response = Request.Post(server + PRODUCTS_TIER_PRICES_INFORMATION)
					.addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).bodyString(json, ContentType.APPLICATION_JSON).execute()
					.returnContent().asString();
			tierPrices = mapper.readValue(response, new TypeReference<List<TierPrices>>() {
			});
		} catch (IOException e) {
			log.error("Error Getting Cats from Server: ERROR {}", e.getMessage());
		}
		return tierPrices;
	}

	public MagentoProductList updateProductList(String dateString) {
		MagentoProductList productList = null;
		String response;

		StringBuilder url = new StringBuilder();
		url.append(server).append("/rest/V1/products?")
				.append("searchCriteria[filter_groups][0][filters][0][field]=updated_at").append("&")
				.append("searchCriteria[filter_groups][0][filters][0][value]=").append(dateString).append("&")
				.append("searchCriteria[filter_groups][0][filters][0][condition_type]=gteq");

		try {
			response = Request.Get(url.toString()).addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute().returnContent()
					.asString();
			productList = mapper.readValue(response, MagentoProductList.class);
		} catch (IOException e) {
			log.error("Error Getting update product List: ERROR {}", e.getMessage());
		}
		return productList;
	}

	public List<String> getTags(MagentoProduct product){
		List<String> categoryIds = product.getCategoryIds("category_ids");
		List<String> tags = new ArrayList<>();
		if(null != categoryIds && !categoryIds.isEmpty()){
			for (String categoryId : categoryIds) {
				getTag(categoryId, tags);
			}
		}
		log.debug("returning tags {}", tags);
		return tags;
	}
	private void getTag(String categoryId, List<String> tags){
		MagentoCategory productCategory = getCategoryPath(categoryId.trim());
		if( null != productCategory ){
			String categoryUrl = productCategory.getAttribute("url_path");
			log.debug("categoryUrl for tags - {} ",categoryUrl);
			tags.add("abbott:abbott_catalog/" + categoryUrl);
		}
	}
	public MagentoCategory getCategoryPath(String categoryId) {
		if (StringUtils.contains(categoryId, "[")) {
			categoryId = categoryId.replace("[", "");
		}
		if (StringUtils.contains(categoryId, "]")) {
			categoryId = categoryId.replace("]", "");
		}
		log.debug("categoryId: {}", categoryId);
		MagentoCategory productCategory = null;
		String categoryPath = null;
		String response;
		try {
			response = Request.Get( server + CATEGORIES + categoryId ).addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			productCategory = mapper.readValue(response, MagentoCategory.class);

		} catch (IOException e) {
			log.error("IOException {}  occured while getting getCategoryPath for category :: {} :: Categories",
					e, categoryId);
		} catch (IllegalArgumentException e) {
			log.error(
					"IllegalArgumentException {}  occured while getting getCategoryPath for category :: {} :: Categories",
					e, categoryId);
		}
		return productCategory;
	}

	public MagentoProduct getStoreBasedProduct(String authToken, String sku, String server) throws CommerceException {
		try {
			String productPath = server + PRODUCTS + sku;
			log.debug("Server ::{} ", productPath);
			String response = Request.Get( productPath ).addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			log.debug("Response from Magento is::{}",response);
			return mapper.readValue(response, MagentoProduct.class);
		} catch (IOException e) {
			throw new CommerceException(e.getMessage());
		}
	}


	public MagentoProduct getProduct(String authToken, String sku) throws CommerceException {
		try {
			String productPath = server + PRODUCTS + sku;
			log.debug("Server ::{} ", productPath);
			String response = Request.Get( productPath ).addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.execute().returnContent().asString();
			return mapper.readValue(response, MagentoProduct.class);
		} catch (IOException e) {
			throw new CommerceException(e.getMessage());
		}
	}

	public MagentoProduct getProductSubscription(String sku, String storeName) throws CommerceException {
		log.info("Inside get product subscription in magento connector service");
		String response = "";
		try {
			log.debug(LOG_MESSAGE, sku);
			if(storeName.equalsIgnoreCase(NEW_SIMILAC)) {
				response = Request.Get(server + "/rest/"+storeName+"/V1/products/" + sku).addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute()
						.returnContent().asString();
			}else {
				response = Request.Get(server + PRODUCTS + sku).addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute()
						.returnContent().asString();
			}
			return mapper.readValue(response, MagentoProduct.class);
		} catch (IOException e) {
			throw new CommerceException(e.getMessage());
		}

	}

	public MagentoProduct getProductVariant(String sku) throws CommerceException {
		String response = "";
		try {

			log.info(LOG_MESSAGE, sku);
			response = Request.Get(server + PRODUCTS + sku).addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute()
					.returnContent().asString();
			return mapper.readValue(response, MagentoProduct.class);
		} catch (IOException e) {
			throw new CommerceException(e.getMessage());
		}

	}

	/*Price Specific product class*/
	public String getProductForPrice(String sku) throws CommerceException {
		String response = "";
		try {

			log.debug(LOG_MESSAGE, sku);
			response = Request.Get(server + PRODUCTS + sku).addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute()
					.returnContent().asString();
			MagentoProductPriceOnly magentoProductPriceOnly =  mapper.readValue(response, MagentoProductPriceOnly.class);

			return magentoProductPriceOnly.getPrice()+"";
		} catch (IOException e) {
			throw new CommerceException(e.getMessage());
		}

	}
	//dam_images and aem_url

	private JsonObject getCustomAttribute(String attributeCode, String value){
		JsonObject attributeJson = new JsonObject();
		attributeJson.addProperty("attribute_code", attributeCode);
		attributeJson.addProperty("value", value);
		return attributeJson;
	}

	public void updateURLPathInMagento(String sku, String aemUrl, String damImages, String storeName,String serverUrl,IdentityProvider magentoIdentityProvider){
		String response = "";
		try {
			JsonObject productJson = new JsonObject();
			JsonArray customAttributesArray = new JsonArray();
			customAttributesArray.add(getCustomAttribute("aem_url", aemUrl+".html"));
			customAttributesArray.add(getCustomAttribute("dam_images", damImages));
			JsonObject customAttributes = new JsonObject();
			customAttributes.add("custom_attributes", customAttributesArray);
			productJson.add("product", customAttributes);
			log.info("product json in updateURLPathInMagento :{}", productJson);
			if(StringUtils.isBlank(authToken)) {
				username = magentoIdentityProvider.getAdminUser();
				password = magentoIdentityProvider.getAdminPassword();
				server = serverUrl;
				authToken = getToken();
			}
			response = Request.Put( server + "/rest/" + storeName + "/V1/products/" + sku ).addHeader( AUTHORIZATION, authToken ).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.bodyString( productJson.toString(), ContentType.APPLICATION_JSON ).execute()
					.handleResponse( new ResponseHandler <String>() {
						public String handleResponse(final HttpResponse response) throws IOException {
							StatusLine statusLine = response.getStatusLine();
							return Integer.toString( statusLine.getStatusCode() );
						}
					} );
			log.info("Response of updateURLPathInMagento in MagentoConnectorService:: {}", response);
		} catch (IOException e) {
			log.error("Error in updateURLPathInMagento :: {}", e.getMessage());
		}
	}

	public String getMagentoStoreCode(String aemUrl){
		if (StringUtils.startsWith(aemUrl, "/content/abbott/")) {
			return "abbott";
		} else if (StringUtils.startsWith(aemUrl, "/content/glucerna/")) {
			return "glucerna";
		}else if (StringUtils.startsWith(aemUrl, "/content/similac/")) {
			return "similac";
		}else if (StringUtils.startsWith(aemUrl, "/content/an/similac/")) {
			return NEW_SIMILAC;
		}
		return null;
	}

	public String createValidJcrName(String tagName) {
		final String validName = StringUtils.lowerCase(JcrUtil.createValidName(StringUtils.strip(tagName)));
		return  StringUtils.replace(validName, "_", "-");
	}
	public String registerUser(String inputJson) {
		String response = "";
		try {
			response = Request.Post(server + "/rest/V1/customers").addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE )
					.bodyString(inputJson, ContentType.APPLICATION_JSON).execute()
					.handleResponse(new ResponseHandler<String>() {
						public String handleResponse(final HttpResponse response) throws IOException {
							StatusLine statusLine = response.getStatusLine();
							return Integer.toString(statusLine.getStatusCode());
						}
					});
			log.debug("Response in MagentoConnectorService:: {}", response);
		} catch (IOException e) {
			log.error("Error in user registration :: {}", e.getMessage());
		}
		return response;
	}

	public MagentoSubscriptionList getAbbottSubscriptionVariationCategories(String token) {
		String response;
		authToken = null != token ? token :getToken();
		MagentoSubscriptionList magentoSubscriptionList = null;
		try {
			response = Request.Get(server
					+ "/rest/V1/awSarp2/plan/search/?searchCriteria[filter_groups][0][filters][0][field]=plan_id&searchCriteria[filter_groups][0][filters][0][value]=1&searchCriteria[filter_groups][0][filters][0][condition_type]=gteq")
					.addHeader(AUTHORIZATION, authToken).addHeader( X_ORIGIN_SECRET, X_ORIGIN_SECRET_VALUE ).execute().returnContent().asString();
			magentoSubscriptionList = mapper.readValue(response, MagentoSubscriptionList.class);
		} catch (IOException e) {
			log.error("Error Getting Subscription values from Server: ERROR :: {}", e.getMessage());
		}
		return magentoSubscriptionList;
	}

}
