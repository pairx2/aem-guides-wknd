package com.abbott.aem.an.division.core.utils;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.TreeMap;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.http.HttpHost;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.DefaultProxyRoutePlanner;
import org.apache.http.util.EntityUtils;
import org.apache.jackrabbit.api.JackrabbitSession;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.core.models.dynamicproduct.Availability;
import com.abbott.aem.an.division.core.models.dynamicproduct.Footnote;
import com.abbott.aem.an.division.core.models.dynamicproduct.Image;
import com.abbott.aem.an.division.core.models.dynamicproduct.Ingredients;
import com.abbott.aem.an.division.core.models.dynamicproduct.Instructions;
import com.abbott.aem.an.division.core.models.dynamicproduct.NutritionalInfo;
import com.abbott.aem.an.division.core.models.dynamicproduct.Product;
import com.abbott.aem.an.division.core.models.dynamicproduct.ProductInformationClaim;
import com.abbott.aem.an.division.core.models.dynamicproduct.ProductInformationReference;
import com.abbott.aem.an.division.core.models.dynamicproduct.ServingSize;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.day.cq.commons.jcr.JcrUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.google.common.collect.Iterators;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import javax.print.attribute.standard.ReferenceUriSchemesSupported;

@Component(service = Utils.class, immediate = true)
public class Utils {

	private static final Logger LOGGER = LoggerFactory.getLogger(Utils.class);
	private static String xApplicationId = Constants.EMPTY;
	private static String xOriginSecret = Constants.EMPTY;
	private static String xCountryCode = Constants.EMPTY;
	private static String xPrefferedLanguage = Constants.EMPTY;
	private static String xSecretheader = Constants.EMPTY;
	private static String apiUrl = Constants.EMPTY;
	private static String proxylbabbottCorp;
	private static String productsRootPath;
	private static String unavailableImagePath;
	private static String environment;
	private static String productBaseImagePath;
	private boolean isAuthorrunmode =false;
	private HashMap<String, String> grandNutrientData = new HashMap<>();
	private HashMap<String, String> grandVitminData = new HashMap<>();
	private HashMap<String, String> grandMineralsData = new HashMap<>();

	public List<Product> getMultiProductFromPIM(String productId, PIMConfigurationService pimConfigs) {

		boolean isMultiProduct = false;
		isMultiProduct = checkIfMultiproduct(productId);
		productId = removeSpacefromMultiProductString(productId);
		String productJSON = callProductApi(productId, pimConfigs);
		List<Product> lstProduct = fillProduct(productJSON, isMultiProduct);
		List<Product> lstProductUpdated = new ArrayList<>();
		List<Product> lstProductOrdered = new ArrayList<>();
		String[] mproduct = productId.split(",");
		TreeMap<String, String> sortedgrandMineralsData = new TreeMap<>(grandMineralsData);
		TreeMap<String, String> sortedgrandNutrientData = new TreeMap<>(grandNutrientData);
		TreeMap<String, String> sortedgrandVitminData = new TreeMap<>(grandVitminData);
		for (Product objProductItem : lstProduct) {
			objProductItem.setMasterMinerals(sortedgrandMineralsData);
			objProductItem.setMasterNutrientData(sortedgrandNutrientData);
			objProductItem.setMasterVitamins(sortedgrandVitminData);
			try {
				ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
				String json = ow.writeValueAsString(objProductItem);
				objProductItem.setProductJson(json);
			} catch (RuntimeException | IOException ex) {
				LOGGER.error("Error Occurred Utils getMultiProductFromPIM", ex);
			}
			lstProductUpdated.add(objProductItem);
		}
		if (!lstProductUpdated.isEmpty()) {
			for (String mproductid : mproduct) {
				LOGGER.debug("Mproductid:{}" , mproductid);
				Product product = lstProductUpdated.stream().filter(p -> mproductid.equals(p.getId())).findAny()
						.orElse(null);
				if (product != null) {
					lstProductOrdered.add(product);
				}

			}
		}
		return lstProductOrdered;
	}

	public Product getProductFromPIM(String productId, PIMConfigurationService pimConfigs) {
		boolean isMultiProduct = false;
		isMultiProduct = checkIfMultiproduct(productId);
		String productJSON = callProductApi(productId, pimConfigs);
		List<Product> lstProduct = fillProduct(productJSON, isMultiProduct);
		Product objproduct = null;
		if (!lstProduct.isEmpty()) {
			objproduct = lstProduct.get(0);
		}
		try {
			if (objproduct != null) {
				ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
				String json = ow.writeValueAsString(objproduct);
				objproduct.setProductJson(json);
				LOGGER.info("getProductFromPIM Product JSON returned to frontend successfully!!");
			}
		} catch (RuntimeException | IOException ex) {
			LOGGER.error("Error Occurred Utils getProductFromPIM", ex);
		}

		return objproduct;
	}

	public String callProductApi(String productId, PIMConfigurationService pimConfigs) {
		getPIMConfigurations(pimConfigs);
		
		boolean approvalLookBack = false;
		HttpPost post = new HttpPost(apiUrl);
		isAuthorrunmode= isAuthorMode(pimConfigs);
		String payload = getRequestParams(approvalLookBack, productId);
		StringEntity entity = new StringEntity(payload, ContentType.APPLICATION_JSON);
		post.setEntity(entity);
		post.setHeader(Constants.APPLICATION_ID, xApplicationId);
		post.setHeader(Constants.COUNTRY_CODE, xCountryCode);
		post.setHeader(Constants.PREFERRED_LANGUAGE, xPrefferedLanguage);
		post.setHeader(Constants.ORIGIN_SECRET, xOriginSecret);
		post.setHeader(Constants.SECRET_HEADER, xSecretheader);
		String productJSON = null;
		try {
			productJSON = callRestAPI(post, pimConfigs);
			JsonParser jsonParser = new JsonParser();
			JsonElement jsonElement = jsonParser.parse(productJSON);
			JsonObject productDataJson = jsonElement.getAsJsonObject();
			if (!checkNullValue("status", productDataJson)
					&& productDataJson.get("status").getAsString().equalsIgnoreCase(Constants.FALSE)
					&& !productDataJson.get("errorCode").getAsString().equalsIgnoreCase("0")) {
				throw new JsonParseException("Try one more time");
			}

		} catch (IOException | JsonParseException ex) {
			try {
				productJSON = callRestAPI(post, pimConfigs);
			} catch (IOException e) {
				LOGGER.error("Product JSON received from PIM API Error: {0}", e);
			}
		}
		return productJSON;
	}

	private static void getPIMConfigurations(PIMConfigurationService pimConfigs) {

		LOGGER.info("in get pim configs ---- {} ", pimConfigs);
		apiUrl = pimConfigs.getApiUrl();
		xApplicationId = pimConfigs.getxApplicationId();
		xOriginSecret = pimConfigs.getxOriginSecret();
		xCountryCode = pimConfigs.getxCountryCode();
		xPrefferedLanguage = pimConfigs.getxPreferredLanguage();
		xSecretheader = pimConfigs.getxSecretHeader();
		proxylbabbottCorp = pimConfigs.getProxylbAbbottCorp();
		productsRootPath = pimConfigs.getProductsRootPath();
		unavailableImagePath = pimConfigs.unavailableImagePath();
		environment = pimConfigs.getEnvironment();		
		productBaseImagePath=pimConfigs.productBaseImagePath();
	}

	private List<Product> fillProduct(String productJSON, boolean isMultiProduct) {
		JsonArray productArray = new JsonArray();
		JsonParser jsonParser = new JsonParser();
		JsonObject productDataJson = null;
		List<Product> lstproductArray = new ArrayList<>();
		JsonElement jsonElement = jsonParser.parse(productJSON);
		JsonElement jsonElementResponse;
		productDataJson = jsonElement.getAsJsonObject();
		JsonObject prodObj = null;
		jsonElementResponse = productDataJson.get("response");
		if (isMultiProduct) {
			productArray = (JsonArray) jsonElementResponse;
		} else {
			prodObj = jsonElementResponse.getAsJsonObject();
			productArray.add(prodObj);
		}
		LOGGER.info("fillProduct-started");
		for (JsonElement objProducts : productArray) {
			Product productData = new Product();
			prodObj = objProducts.getAsJsonObject();	
			String name = prodObj.get("name").getAsString();
			productData.setProductName(name);
			productData.setId(prodObj.get("productID").getAsString());
			String date = formatDate(getData("approvalDateTime", prodObj));
			productData.setApprovalDateTime(date);
			date = formatDate(getData("publishedDateTime", prodObj));
			productData.setPublishedDateTime(date);			
			productData.setCommonName(getData("commonName", prodObj));			
			String learnmore = getLearnMore(name);
			productData.setLearnmore(learnmore);			
			productData.setBrand(getData(Constants.BRAND_FAMILY_NAME, prodObj));			
			JsonArray claims = getDataJsonArray("productClaims",prodObj);
			JsonArray productRefrences = getDataJsonArray("productRefrences",prodObj);
			JsonArray productInstructions = getDataJsonArray("productInstructions",prodObj);
			JsonArray formulations = getDataJsonArray("productFormulations",prodObj);			
			getClaim(claims,productData);	
			getReferences(productRefrences,productData);			
			getFormulations(formulations,productData);
			getInstructions(productInstructions,productData);			
			lstproductArray.add(productData);
		}
		return lstproductArray;
	}	
	private void getInstructions(JsonArray productInstructions,Product productData ) {
		List<Instructions> lstInstructions = new ArrayList<>();
		for (JsonElement objproductInstructions : productInstructions) {
			JsonObject insobjproductInstructions = objproductInstructions.getAsJsonObject();
			Instructions objInstructions = new Instructions();
			objInstructions.setProductInstructions(getData(Constants.VALUE, insobjproductInstructions));
			objInstructions.setCategory(getData(Constants.CATEGORY, insobjproductInstructions));
			lstInstructions.add(objInstructions);
		}	
		productData.setInstructions(lstInstructions);
	}
	
	private void getFormulations(JsonArray formulations,Product productData ) {
		List<Ingredients> lstIngredients = new ArrayList<>();
		List<Availability> lstAvailability = new ArrayList<>();		
		List<ServingSize> lstServingSize = new ArrayList<>();
		List<Image> lstImages = new ArrayList<>();
		for (JsonElement objFormulation : formulations) {
			List<Availability> lstAvailabilityFormulations = new ArrayList<>();				
			JsonObject formulationObj = objFormulation.getAsJsonObject();
			String discontinuedformulation =getData(Constants.DISCONTINUED, formulationObj);	
			if (discontinuedformulation.equalsIgnoreCase(Constants.FALSE)) {													
				Ingredients objIngredients = new Ingredients();			
				String isDefault = getData("isDefault", formulationObj);		
				String aCode =getData(Constants.ACODE, formulationObj);	
				objIngredients.setACode(aCode);
				if (isDefault.equalsIgnoreCase("true")) {
					productData.setDefaultFormulationCode(aCode);
				}					
				objIngredients.setFormulationType(getData("formulationType", formulationObj));
				objIngredients.setFlavorName(getData("flavor", formulationObj));				
				if (!checkNullValue(Constants.IMAGE, formulationObj)) {
					objIngredients.setImage(formulationObj.get(Constants.IMAGE).getAsString());
					Image objImage = new Image();
					objImage.setFilename(formulationObj.get(Constants.IMAGE).getAsString());
					lstImages.add(objImage);
				} else {
					objIngredients.setImage(Constants.EMPTY);
					Image objImage = new Image();
					objImage.setFilename(Constants.EMPTY);
					lstImages.add(objImage);
				}
				objIngredients.setIngredients(getData("ingredients", formulationObj));	
				objIngredients.setAllergenStatement(getData("allergenStatement", formulationObj));					
				lstIngredients.add(objIngredients);
				JsonArray productSkus = getDataJsonArray("productSkus",formulationObj);					
				getProductSkusData(productSkus,lstAvailabilityFormulations,aCode);
				lstAvailability.addAll(lstAvailabilityFormulations);
				JsonArray productNutritionalInformationServingSize=getDataJsonArray("productNutritionalInformationServingSize",formulationObj);					
				for (JsonElement objproductNutritionalInformationServingSize : productNutritionalInformationServingSize) {
					JsonObject productNutritionalInformationServingSizeObj = objproductNutritionalInformationServingSize
							.getAsJsonObject();
					ServingSize objServingSize = new ServingSize();
					objServingSize.setLineNumber(-1);					
					objServingSize.setId(getData("id", productNutritionalInformationServingSizeObj));
					objServingSize.setLineNumber(getIntData(Constants.LINE_NUMBER,productNutritionalInformationServingSizeObj));							
					objServingSize.setAcode(aCode);
					objServingSize.setServingSizeName(
							getData("servingSize", productNutritionalInformationServingSizeObj));
					objServingSize.setPercentDVSymbol(
							getData("percentDVSymbol", productNutritionalInformationServingSizeObj));						
					objServingSize.setPercentRDISymbol(getData("percentRDISymbol", productNutritionalInformationServingSizeObj));
					getFooterNote(productNutritionalInformationServingSizeObj,objServingSize);
					getNutritionalInfo(productNutritionalInformationServingSizeObj,objServingSize,aCode);					
					lstServingSize.add(objServingSize);
				}
				Collections.sort(lstServingSize);
				productData.setServingSize(lstServingSize);
			}

		}
		productData.setImages(lstImages);
		productData.setIngredients(lstIngredients);
		productData.setAvailability(lstAvailability);
		
	}
	
	private void getProductSkusData(JsonArray productSkus,List<Availability> lstAvailabilityFormulations,String aCode) {
		for (JsonElement objproductSkus : productSkus) {						
			JsonObject productSkusObj = objproductSkus.getAsJsonObject();
			String discontinuedformulationsku = getData(Constants.DISCONTINUED, productSkusObj);
			if (discontinuedformulationsku.equalsIgnoreCase(Constants.FALSE)) {
				Availability objAvailability = new Availability();
				objAvailability.setMarketSegment(getData("marketSegment", productSkusObj));
				if (!checkNullValue(Constants.LISTNUMBER, productSkusObj)) {
					objAvailability.setListNumber(productSkusObj.get(Constants.LISTNUMBER).getAsInt());
					objAvailability
							.setDisplayListNumber(productSkusObj.get(Constants.LISTNUMBER).getAsString());
				}
				objAvailability.setDescription(getData("description", productSkusObj));
				objAvailability.setId(getData("id", productSkusObj));
				objAvailability.setAcode(aCode);
				lstAvailabilityFormulations.add(objAvailability);
				Collections.sort(lstAvailabilityFormulations, Collections.reverseOrder());
			}

		}
	}
	
	private void getNutritionalInfo(JsonObject productNutritionalInformationServingSizeObj,ServingSize objServingSize,String aCode  ) {
		List<NutritionalInfo> lstNutritionalInfo = new ArrayList<>();
		List<NutritionalInfo> lstNutritionalData = new ArrayList<>();
		List<NutritionalInfo> lstNutritionalVitamins = new ArrayList<>();
		List<NutritionalInfo> lstNutritionalMinerals = new ArrayList<>();
		if (!checkNullValue("productNutritionalInformationItems",
				productNutritionalInformationServingSizeObj)) {
			JsonArray productNutritionalInformationItems = (JsonArray) productNutritionalInformationServingSizeObj
					.get("productNutritionalInformationItems");
			for (JsonElement productNutritionalInformation : productNutritionalInformationItems) {
				NutritionalInfo objNutritionalInfo = new NutritionalInfo();
				objNutritionalInfo.setLineNumber(-1);
				JsonObject productNutritionalInformationObj = productNutritionalInformation
						.getAsJsonObject();
				objNutritionalInfo.setNutritionName(getData("name", productNutritionalInformationObj));
				objNutritionalInfo.setNutritionCategory(getData("categoryName", productNutritionalInformationObj));
				objNutritionalInfo.setNutritionValue(getData(Constants.VALUE, productNutritionalInformationObj));										
				objNutritionalInfo.setLineNumber(getIntData(Constants.LINE_NUMBER,productNutritionalInformationObj));									
				objNutritionalInfo.setPercentDV(getData("percentDV", productNutritionalInformationObj));
				objNutritionalInfo.setIndentCount(getData("indentCount", productNutritionalInformationObj));
				lstNutritionalInfo.add(objNutritionalInfo);
				getGrandListData(productNutritionalInformationObj,objNutritionalInfo,lstNutritionalData,lstNutritionalVitamins,lstNutritionalMinerals,aCode,objServingSize);
			}
			Collections.sort(lstNutritionalInfo);
			Collections.sort(lstNutritionalData);
			Collections.sort(lstNutritionalVitamins);
			Collections.sort(lstNutritionalMinerals);
			objServingSize.setNutritionalInfo(lstNutritionalInfo);
			objServingSize.setNutritionalInfoData(lstNutritionalData);
			objServingSize.setNutritionalInfoVitamins(lstNutritionalVitamins);
			objServingSize.setNutritionalInfoMinerals(lstNutritionalMinerals);

		}
	}
	
	private void getGrandListData(JsonObject productNutritionalInformationObj,NutritionalInfo objNutritionalInfo ,
			List<NutritionalInfo>  lstNutritionalData,List<NutritionalInfo>  lstNutritionalVitamins,List<NutritionalInfo>  lstNutritionalMinerals,String aCode,ServingSize objServingSize) {
		String key = productNutritionalInformationObj.get("name").getAsString() + "-" + aCode
				+ "-" + objServingSize.getId();
		if (objNutritionalInfo.getNutritionCategory().equalsIgnoreCase("Nutrient Data")) {
			lstNutritionalData.add(objNutritionalInfo);
			if (!grandNutrientData.containsKey(key))
				grandNutrientData.put(
						productNutritionalInformationObj.get("name").getAsString(),
						productNutritionalInformationObj.get("name").getAsString());

		} else if (objNutritionalInfo.getNutritionCategory().equalsIgnoreCase("Vitamins")) {
			lstNutritionalVitamins.add(objNutritionalInfo);
			if (!grandNutrientData.containsKey(key))
				grandVitminData.put(productNutritionalInformationObj.get("name").getAsString(),
						productNutritionalInformationObj.get("name").getAsString());

		} else if (objNutritionalInfo.getNutritionCategory().equalsIgnoreCase("Minerals")) {
			lstNutritionalMinerals.add(objNutritionalInfo);
			if (!grandNutrientData.containsKey(key))
				grandMineralsData.put(
						productNutritionalInformationObj.get("name").getAsString(),
						productNutritionalInformationObj.get("name").getAsString());

		}

		
	}
	
	private void getFooterNote(JsonObject productNutritionalInformationServingSizeObj,ServingSize objServingSize  ) {
		List<Footnote> lstFooterNotes = new ArrayList<>();
		if (!checkNullValue("productNutritionalInformationFooterNotes",
				productNutritionalInformationServingSizeObj)) {						
			JsonArray productNutritionalInformationFooterNotes =getDataJsonArray("productNutritionalInformationFooterNotes",
					productNutritionalInformationServingSizeObj);	
			 setFooterNoteList(productNutritionalInformationFooterNotes,lstFooterNotes);		
			}
			Collections.sort(lstFooterNotes);
			objServingSize.setFootnotes(lstFooterNotes);

		}	
	
	
	private void setFooterNoteList(JsonArray productNutritionalInformationFooterNotes,List<Footnote> lstFooterNotes ) {
		for (JsonElement productNutritionalInformationFooterNotesElement : productNutritionalInformationFooterNotes) 
			{
				JsonObject productNutritionalInformationFooterNotesobj = productNutritionalInformationFooterNotesElement
						.getAsJsonObject();
				Footnote footerNotes = new Footnote();
				footerNotes.setLineNumber(-1);
				footerNotes.setFootnoteValue(getData(Constants.VALUE, productNutritionalInformationFooterNotesobj));
				footerNotes.setLineNumber(getIntData(
						Constants.LINE_NUMBER,productNutritionalInformationFooterNotesobj));								
				footerNotes.setFootnoteSymbol(getData(Constants.SYMBOL, productNutritionalInformationFooterNotesobj));
				lstFooterNotes.add(footerNotes);
			}
		
	}
	
	private void getReferences(JsonArray productRefrences,Product productData ) {
		ProductInformationReference objref = null;	
		List<String> value = new ArrayList<>();
		List<ProductInformationReference> productInformationRefUsage = new ArrayList<>();
		List<ProductInformationReference> productInformationRefFeature = new ArrayList<>();
		List<ProductInformationReference> productInformationRefPrecautions = new ArrayList<>();
		for (JsonElement objproductRefrences : productRefrences) {
			JsonObject productRefrencesObj = objproductRefrences.getAsJsonObject();
			if (!checkNullValue(Constants.VALUE, productRefrencesObj)) {
				value.add(productRefrencesObj.get(Constants.VALUE).getAsString());				
			}
			objref = new ProductInformationReference();
			objref.setLineNumber(-1);
			String category = getData(Constants.CATEGORY, productRefrencesObj);							
			if (category.equalsIgnoreCase("Usage") && !checkNullValue(Constants.VALUE, productRefrencesObj)) {
				objref.setLineNumber(getIntData(Constants.LINE_NUMBER,productRefrencesObj));
				objref.setReferenceText(productRefrencesObj.get(Constants.VALUE).getAsString());
				objref.setReferenceSymbol(productRefrencesObj.get(Constants.SYMBOL).getAsString());
				productInformationRefUsage.add(objref);
			}
			if (category.equalsIgnoreCase("Features") && !checkNullValue(Constants.VALUE, productRefrencesObj)) {
				objref.setLineNumber(getIntData(Constants.LINE_NUMBER,productRefrencesObj));
				objref.setReferenceText(productRefrencesObj.get(Constants.VALUE).getAsString());
				objref.setReferenceSymbol(productRefrencesObj.get(Constants.SYMBOL).getAsString());
				productInformationRefFeature.add(objref);
			}
			if (category.equalsIgnoreCase("Precautions") && !checkNullValue(Constants.VALUE, productRefrencesObj)) {				
				objref.setLineNumber(getIntData(Constants.LINE_NUMBER,productRefrencesObj));
				objref.setReferenceText(productRefrencesObj.get(Constants.VALUE).getAsString());
				objref.setReferenceSymbol(productRefrencesObj.get(Constants.SYMBOL).getAsString());
				productInformationRefPrecautions.add(objref);

			}
		}
		Collections.sort(productInformationRefFeature);
		Collections.sort(productInformationRefFeature);
		Collections.sort(productInformationRefPrecautions);
		productData.setFeatureReferences(productInformationRefFeature);
		productData.setPrecautionReferences(productInformationRefPrecautions);
		productData.setUsageReferences(productInformationRefUsage);
	}
	private void getClaim(JsonArray claims,Product productData ) {
		StringBuilder usageClaimContent = new StringBuilder();
		List<ProductInformationClaim> productInformationClaimUsage = new ArrayList<>();
		List<ProductInformationClaim> productInformationClaimFeature = new ArrayList<>();
		List<ProductInformationClaim> productInformationClaimPrecautions = new ArrayList<>();
		ProductInformationClaim obj = null;
		for (JsonElement objClaim : claims) {
			JsonObject claimObj = objClaim.getAsJsonObject();
			obj = new ProductInformationClaim();
			obj.setLineNumber(-1);
			String category=getData(Constants.CATEGORY, claimObj);				
			if (category.equalsIgnoreCase("Usage") && !checkNullValue(Constants.CONTENT, claimObj)) {
				obj.setLineNumber(getIntData(Constants.LINE_NUMBER,claimObj));
				obj.setClaimText(claimObj.get(Constants.CONTENT).getAsString());
				productInformationClaimUsage.add(obj);
				usageClaimContent.append(claimObj.get(Constants.CONTENT).getAsString());
			}
			if (category.equalsIgnoreCase("Features") && !checkNullValue(Constants.CONTENT, claimObj)) {
				obj.setLineNumber(getIntData(Constants.LINE_NUMBER,claimObj));
				obj.setClaimText(claimObj.get(Constants.CONTENT).getAsString());
				productInformationClaimFeature.add(obj);
			}
			if (category.equalsIgnoreCase("Precautions") && !checkNullValue(Constants.CONTENT, claimObj)) {				
				obj.setLineNumber(getIntData(Constants.LINE_NUMBER,claimObj));
				obj.setClaimText(claimObj.get(Constants.CONTENT).getAsString());
				productInformationClaimPrecautions.add(obj);
			}
		}
		Collections.sort(productInformationClaimFeature);
		Collections.sort(productInformationClaimUsage);
		Collections.sort(productInformationClaimPrecautions);
		productData.setDescription(usageClaimContent.toString());
		productData.setFeatures(productInformationClaimFeature);
		productData.setUsage(productInformationClaimUsage);
		productData.setPrecautions(productInformationClaimPrecautions);
	}

	public String getLearnMore(String productTitle) {
		String learnmore = productsRootPath;
		if (null != productTitle && !productTitle.isEmpty()) {
			String name = createValidPageName(productTitle);
			learnmore = learnmore + "/" + name + ".html";
		}
		return learnmore;
	}

	private String getRequestParams(boolean approvalLookBack, String productId) {
		JsonObject requestParams = new JsonObject();
		requestParams.addProperty("detailed", Constants.DETAILEDFLAG);
		requestParams.addProperty("pagenumber", Constants.PAGENUMBER);
		requestParams.addProperty("pagesize", Constants.PAGESIZE);
		requestParams.addProperty("approvalLookBack", approvalLookBack);
		requestParams.addProperty("brandFamilyName", Constants.BRANDFAMILYNAME);
		requestParams.addProperty("productID", productId);
		if (isAuthorrunmode) {
			requestParams.addProperty("instance",Constants.AUTHOR);
		}
		return requestParams.toString();
	}

	private boolean checkNullValue(String element, JsonObject jsonObject) {
		return jsonObject.get(element) == null;
	}

	private String getData(String element, JsonObject jsonObject) {
		return !checkNullValue(element, jsonObject) ? jsonObject.get(element).getAsString() : "";
	}
	
	private Integer getIntData(String element, JsonObject jsonObject) {
		if (!checkNullValue(element, jsonObject)
				&& !jsonObject.get(element).getAsString().equalsIgnoreCase(Constants.EMPTY)) 
		 return jsonObject.get(element).getAsInt();
		else return -1;
	}
	
	private JsonArray getDataJsonArray(String element, JsonObject jsonObject) {
		return !checkNullValue(element, jsonObject) ?(JsonArray) jsonObject.get(element) : new JsonArray() ;
	}

	private boolean checkIfMultiproduct(String productId) {
		boolean isMultiProduct = false;
		String[] mproduct = productId.split(",");
		if (mproduct.length > 1)
			isMultiProduct = true;
		else
			isMultiProduct = false;
		return isMultiProduct;
	}

	private String removeSpacefromMultiProductString(String productIds) {
		String[] resultArray = Arrays.stream(productIds.split(",")).filter(e -> e.trim().length() > 0)
				.toArray(String[]::new);
		StringBuilder newProductIds = new StringBuilder();
		int count = 0;
		for (String str : resultArray) {
			newProductIds.append(str);
			count = count + 1;
			if (count < resultArray.length)
				newProductIds.append(",");
		}
		return newProductIds.toString();
	}

	private String formatDate(String dateString) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");
		SimpleDateFormat formatter1 = new SimpleDateFormat("mm/dd/yyyy");
		try {
			Date date = formatter.parse(dateString);
			dateString = formatter1.format(date);
		} catch (ParseException ex) {
			LOGGER.error("Error Occurred Utils formatDate", ex);
		}
		return dateString;
	}

	public String getImagePathUrl(String commonImage) {
		if (Objects.nonNull(commonImage) && !commonImage.isEmpty()) {
			return productBaseImagePath + commonImage.replace("\\", "/");
		} else {
			return unavailableImagePath;
		}
	}

	public String createValidPageName(String title) {
		List<String> removedUnsedString = new ArrayList<>();
		removedUnsedString.add("&reg;");
		removedUnsedString.add("&trade;");
		String strRegEx = "<[^>]*>";
		String name = title.replaceAll(strRegEx, Constants.EMPTY);
		for (String strchar : removedUnsedString) {
			name = name.replaceAll(strchar, Constants.EMPTY);
		}

		name = name.replace("<sup>®</sup>", Constants.EMPTY).replace("®", Constants.EMPTY);
		name = name.replace(" ", "-").replace("&", "and");
		name = name.replace("%", "-pct").replace("/", "-").replace("(", Constants.EMPTY).replace(")", Constants.EMPTY);
		name = name.replace(".", "dot");
		name = JcrUtil.createValidName(name);
		name = name.replace("dot", "_");
		return name;
	}

	public String callRestAPI(HttpPost post, PIMConfigurationService pimConfigs) throws IOException {
		getPIMConfigurations(pimConfigs);
		String productJSON = null;
		try (CloseableHttpClient httpclient = environment.equalsIgnoreCase("undefined")
				? HttpClients.custom().setRoutePlanner(getRoutePlanner()).build()
				: HttpClients.createDefault(); CloseableHttpResponse response = httpclient.execute(post);) {
			int statusCode = response.getStatusLine().getStatusCode();
			LOGGER.debug("Product JSON received from PIM API-statusCode:{}", statusCode);
			productJSON = EntityUtils.toString(response.getEntity());
		} catch (IOException ex) {			
			throw new IOException("Error Occurred Utils callRestAPI",ex);
		}
		return productJSON;

	}

	private DefaultProxyRoutePlanner getRoutePlanner() {
		
		HttpHost proxy = new HttpHost(proxylbabbottCorp, Constants.PROXYPORT, ReferenceUriSchemesSupported.HTTP.toString());
		return new DefaultProxyRoutePlanner(proxy);
	}

	public boolean isAuthorMode(PIMConfigurationService pimConfigs) {
		boolean isAuthor = false;
		if (pimConfigs != null) {
			String runMode = pimConfigs.getRunMode();
			if (runMode != null && runMode.equalsIgnoreCase("author")) {
				isAuthor = true;
			}
		}
		return isAuthor;
	}

	public boolean verifyGroup(ResourceResolver resourceResolver, String groupId) {
		boolean groupIdIdExist = true;
		try {
			JackrabbitSession session = (JackrabbitSession) resourceResolver.adaptTo(Session.class);
			UserManager userManager = session.getUserManager();

			Authorizable group = userManager.getAuthorizable(groupId);
			if (group == null) {
				LOGGER.error("groupId does not exist- {}", groupId);
				groupIdIdExist = false;
			}
			Group userGroup = (Group) group;
			if (null != userGroup) {
				Iterator<Authorizable> members = userGroup.getMembers();
				int count = Iterators.size(members);
				if (count <= 0) {
					LOGGER.error("group does not have members- {}", groupId);
					groupIdIdExist = false;
				}
			}
		} catch (RepositoryException ex) {
			LOGGER.error("Error occurred in verifyGroup {0}", ex);
		}

		return groupIdIdExist;
	}

}
