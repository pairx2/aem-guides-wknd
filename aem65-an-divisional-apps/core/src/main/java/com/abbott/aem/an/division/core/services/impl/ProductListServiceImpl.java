package com.abbott.aem.an.division.core.services.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.jcr.Node;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.division.api.jobs.EmailRunJobConfiguration;
import com.abbott.aem.an.division.core.dto.ProductDTO;
import com.abbott.aem.an.division.core.services.DeactivatePageService;
import com.abbott.aem.an.division.core.services.PIMConfigurationService;
import com.abbott.aem.an.division.core.services.ProductListService;
import com.abbott.aem.an.division.core.services.PublishPageService;
import com.abbott.aem.an.division.core.utils.Constants;
import com.abbott.aem.an.division.core.utils.EmailNotificationUtils;
import com.abbott.aem.an.division.core.utils.Utils;
import com.abbott.aem.cloud.platform.core.constants.CommonConstants;
import com.adobe.cq.dam.cfm.ContentElement;
import com.adobe.cq.dam.cfm.ContentFragment;
import com.adobe.cq.dam.cfm.ContentFragmentException;
import com.adobe.cq.dam.cfm.ContentFragmentManager;
import com.adobe.cq.dam.cfm.FragmentTemplate;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;

public class ProductListServiceImpl implements ProductListService {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductListServiceImpl.class);

	private static String xApplicationId = Constants.EMPTY;
	private static String xOriginSecret = Constants.EMPTY;
	private static String xCountryCode = Constants.EMPTY;
	private static String xPrefferedLanguage = Constants.EMPTY;
	private static String xSecretheader = Constants.EMPTY;
	private static String apiUrl = Constants.EMPTY;

	private static String productsRootPath;

	private static String productsRootParentPath;
	private static String pdpTemplate;
	private static String environmentType;

	private static String pdpSeoContentFragmentPath;
	private static String pdpSeoContentFragmentModel;

	private static String pdpWorkflowModel = CommonConstants.GLOBAL_WORKFLOW_MODEL;
	private static String pdpSeoTitle = Constants.PDP_SEO_TITLE;
	private static String pdpSeoDescription = Constants.PDP_SEO_DESCRIPTION;

	Map<String, String> activeProducts = new HashMap<>();
	Map<String, String> discontinuedProducts = new HashMap<>();
	Map<String, String> objSearchCategoryMap = new HashMap<>();

	private String itemType = "";

	@Reference
	private ResourceResolverFactory resourceResolverFactory;

	@Reference
	ResourceResolver resourceResolver;

	@Reference
	private ContentFragmentManager fragmentManager;

	@Override
	public void getProducts(ResourceResolverFactory resourceResolverFactory, PIMConfigurationService pimConfigs,
			EmailRunJobConfiguration emailJobs) throws LoginException {
		try {
			this.resourceResolverFactory = resourceResolverFactory;
			getPIMConfigurations(pimConfigs);
			createPDPPages(pimConfigs, emailJobs);
		} catch (RuntimeException | WCMException e) {
			LOGGER.error("getProducts exception : {0}", e);
		}

	}

	private static void getPIMConfigurations(PIMConfigurationService pimConfigs) {

		LOGGER.debug("in get pim configs ---- {} ", pimConfigs);
		apiUrl = pimConfigs.getApiUrl();
		xApplicationId = pimConfigs.getxApplicationId();
		xOriginSecret = pimConfigs.getxOriginSecret();
		xCountryCode = pimConfigs.getxCountryCode();
		xPrefferedLanguage = pimConfigs.getxPreferredLanguage();
		xSecretheader = pimConfigs.getxSecretHeader();
		productsRootPath = pimConfigs.getProductsRootPath();
		environmentType = pimConfigs.getEnvironmentType();
		productsRootParentPath = pimConfigs.getProductsParentRootPath();
		pdpTemplate = pimConfigs.getPdpTemplate();
		pdpSeoContentFragmentPath = pimConfigs.pdpSeoContentFragmentPath();
		pdpSeoContentFragmentModel = pimConfigs.pdpSeoContentFragmentModel();
	}

	private void createPDPPages(PIMConfigurationService pimConfigs, EmailRunJobConfiguration emailJobs)
			throws WCMException {
		Session session = null;
		try {
			boolean approvalLookBack = true;
			Page pdpPage = null;
			PageManager pageManager = null;
			getResourceResolver();
			pageManager = resourceResolver.adaptTo(PageManager.class);
			session = resourceResolver.adaptTo(Session.class);
			pdpPage = checkPdpExist(session, pageManager);
			LOGGER.debug("before pdp page creation -- {}", pdpPage.getPath());
			approvalLookBack = getAprovalLookBack(approvalLookBack, pdpPage, session);
			// Get the products name to create product pages.
			List<ProductDTO> productDetails = getProductDetails(approvalLookBack, pimConfigs);
			LOGGER.info("Total Products Retrievd from PIM API:{}", productDetails.size());
			// pageManager.
			if (session != null) {
				createOrUpdatedPage(productDetails, pdpPage, pageManager, session);
				publishPages(emailJobs);
				unpublishPages(emailJobs);
			}

		} catch (RuntimeException | RepositoryException e) {
			LOGGER.error("createPDPPages-exception ::::{0}", e);
		}

		finally {
			if (session != null && session.isLive()) {
				session.logout();
			}
			if (resourceResolver != null && resourceResolver.isLive()) {
				resourceResolver.close();
			}
		}
	}

	// check pdp exist
	private Page checkPdpExist(Session session, PageManager pageManager) throws RepositoryException, WCMException {
		Page pdpPagevar = null;
		try {
			pdpPagevar = resourceResolver.getResource(productsRootPath).adaptTo(Page.class);
		} catch (RuntimeException ex) {
			pageManager.create(productsRootParentPath, Constants.PRODUCTS_ROOT_PARENT_NAME, Constants.EMPTY,
					Constants.PRODUCTS_ROOT_PARENT_NAME_TITLE, true);
			session.save();
			session.refresh(true);
			pdpPagevar = resourceResolver.getResource(productsRootPath).adaptTo(Page.class);
			Node productNode = session.getNode(pdpPagevar.getPath() + Constants.JCR_CONTENT_WITH_SLASH);
			productNode.setProperty("hideInNav", "true");
			session.save();
			session.refresh(true);
		}
		return pdpPagevar;
	}

	// publish the modified pages.
	private void publishPages(EmailRunJobConfiguration emailJobs) {
		PublishPageService pageService = new PublishPageServiceImpl();
		if (activeProducts.size() > 0) {

			LOGGER.debug("Start publishing pages.Number of pages to publish::{}", activeProducts.size());
			pageService.publishPages(pdpWorkflowModel, productsRootPath, activeProducts, this.resourceResolver,
					environmentType);
			String emailContent = pageService.sendEmailContent();
			itemType = "Activated_Items";
			EmailNotificationUtils emailNotification = new EmailNotificationUtils();
			String emailResponse = emailNotification.sendEmailNotification(emailContent, emailJobs, itemType);
			LOGGER.debug("Email sent successfully for Activated Items{}", emailResponse);
		}
	}

	// get the getAprovalLookBack.
	private boolean getAprovalLookBack(boolean approvalLookBack, Page pdpPage, Session session)
			throws RepositoryException {
		// check in case page count is zero
		if (approvalLookBack) {
			int count = 0;
			Iterator<Page> checkChild = pdpPage.listChildren();
			while (checkChild.hasNext()) {
				Page existingPage = checkChild.next();
				Node existingProdNode = session.getNode(existingPage.getPath() + Constants.JCR_CONTENT_WITH_SLASH);
				if (existingProdNode.hasProperty(Constants.PRODUCTID)) {
					count = count + 1;
					break;
				}
			}
			if (count == 1) {
				approvalLookBack = true;
				LOGGER.debug("delta products load started into AEM");
			} else {
				approvalLookBack = false;
				LOGGER.debug("full products load started into AEM");
			}
		}
		return approvalLookBack;
	}

	// deactivate the discontinued pages.
	private void unpublishPages(EmailRunJobConfiguration emailJobs) {
		DeactivatePageService deactivatePageService = new DeactivatePageServiceImpl();
		if (discontinuedProducts.size() > 0) {
			LOGGER.debug("Start deactivating pages.Number of pages to deactivate ::{}", discontinuedProducts.size());
			deactivatePageService.deactivatePages(pdpWorkflowModel, productsRootPath, discontinuedProducts,
					this.resourceResolver, environmentType);
			String emailContent = deactivatePageService.sendEmailContent();
			itemType = "De-Activated_Items";
			EmailNotificationUtils emailNotification = new EmailNotificationUtils();
			String emailResponse = emailNotification.sendEmailNotification(emailContent, emailJobs, itemType);
			LOGGER.debug("Email sent successfully for De-Activated Items{}", emailResponse);
		}
	}

	// create or update pdp page
	private void createOrUpdatedPage(List<ProductDTO> productDetails, Page pdpPage, PageManager pageManager,
			Session session) throws RepositoryException {
		Collections.sort(productDetails);
		for (ProductDTO prodDto : productDetails) {
			updatePdp(pdpPage, prodDto, session, pageManager);
		}

	}

	private void updatePdp(Page pdpPage, ProductDTO prodDto, Session session, PageManager pageManager)
			throws RepositoryException {
		boolean isExisting = false;
		Iterator<Page> existingPdpPages = pdpPage.listChildren();
		try {
			if (existingPdpPages.hasNext()) {
				do {
					isExisting = false;
					Page existingPage = existingPdpPages.next();
					Node existingProdNode = session.getNode(existingPage.getPath() + Constants.JCR_CONTENT_WITH_SLASH);
					if (existingProdNode.hasProperty(Constants.PRODUCTID)) {
						Property existingProductID = existingProdNode.getProperty(Constants.PRODUCTID);
						if (existingProductID.getValue().toString().equalsIgnoreCase(prodDto.getProductID())) {
							setDataInAem(existingProdNode, prodDto);
							isExisting = true;
							session.save();
							session.refresh(true);
							setListData(existingPage, prodDto);
							break;
						}
					}
				} while (existingPdpPages.hasNext());
				if (!isExisting) {
					createNewPDPPage(pageManager, prodDto, session);
				}
			} else {
				createNewPDPPage(pageManager, prodDto, session);
			}
		} catch (RuntimeException e) {
			LOGGER.error("createPDPPages-exception occurred while creating page:::: {0} ", e);
		}
	}

	private void setListData(Page existingPage, ProductDTO prodDto) {
		if (prodDto.isActiveProduct()) {
			activeProducts.put(existingPage.getName(), prodDto.getProductID());
			LOGGER.debug("Activate Product Name :{}", existingPage.getName());
		} else {
			discontinuedProducts.put(existingPage.getName(), prodDto.getProductID());
			LOGGER.debug("Discontinued Product Name :{}", existingPage.getName());
		}
	}

	private void getResourceResolver() {
		Map<String, Object> param = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, Constants.SUBSERVICE);
		try {
			this.resourceResolver = this.resourceResolverFactory.getServiceResourceResolver(param);
		} catch (LoginException e) {
			LOGGER.error("Could not get resource resolver! {0}", e);
		}
	}

	private void setDataInAem(Node node, ProductDTO prodDto) {
		try {

			String productTitle = prodDto.getProductPageTitle();
			node.setProperty(Constants.PRODUCTID, prodDto.getProductID());
			if (!ObjectUtils.isEmpty(productTitle)) {
				node.setProperty(JcrConstants.JCR_TITLE,
						productTitle.replace(Constants.REGSYMBOL, "®").replace(Constants.TRADESYMBOL, "™"));
				node.setProperty("navTitle",
						productTitle.replace(Constants.REGSYMBOL, "®").replace(Constants.TRADESYMBOL, "™"));
				node.setProperty("displayTitle", productTitle.replace(Constants.REGSYMBOL, "<sup>®</sup>")
						.replace(Constants.TRADESYMBOL, "<sup>™</sup>"));
			} else {
				node.setProperty(JcrConstants.JCR_TITLE, productTitle);
				node.setProperty("navTitle", productTitle);
				node.setProperty("displayTitle", productTitle);
			}
			node.setProperty("business", prodDto.getBusinessUnit());
			node.setProperty(Constants.COMMONNAME, prodDto.getCommonName());
			node.setProperty(JcrConstants.JCR_DESCRIPTION, prodDto.getDescription());
			node.setProperty("pdpDescription", prodDto.getDescription());
			if (prodDto.getSkuContainerSize() != null && !prodDto.getSkuContainerSize().isEmpty())
				node.setProperty("skuContainerSize", prodDto.getSkuContainerSize().toArray(new String[0]));
			if (prodDto.getSkuServingSize() != null && !prodDto.getSkuServingSize().isEmpty())
				node.setProperty("skuServingSize", prodDto.getSkuServingSize().toArray(new String[0]));
			if (prodDto.getSkuServingSizeId() != null && !prodDto.getSkuServingSizeId().isEmpty())
				node.setProperty("skuServingSizeId", prodDto.getSkuServingSizeId().toArray(new String[0]));
			node.setProperty("productImage", prodDto.getCommonImage());
			node.setProperty(Constants.LISTNUMBER, prodDto.getListNumber());
			node.setProperty("defaultFormulationCode", prodDto.getProductDefaultformualtionCode());
			node.setProperty("formulationCode", prodDto.getFormulationCode().toArray(new String[0]));
			node.setProperty(Constants.FORMULATION_TYPE, prodDto.getFormulationType().toArray(new String[0]));
			node.setProperty("flavour", prodDto.getFlavor().toArray(new String[0]));
			node.setProperty("formulationTypeandflavour", prodDto.getFormulationTypeandflavor().toArray(new String[0]));
			node.setProperty("productRefrenceValue", prodDto.getProductRefrenceValue().toArray(new String[0]));
			node.setProperty("contentCategory", "product");
			node.setProperty("coveoPush", "true");
			if (!ObjectUtils.isEmpty(productTitle)) {
				node.setProperty(Constants.OGTITLE, productTitle.replace("&reg;", "®").replace("&trade;", "™"));
			} else {
				node.setProperty(Constants.OGTITLE, productTitle);
			}
			node.setProperty("ogType", "website");
			node.setProperty("hideBreadcrumb", Constants.FALSE);
			node.setProperty("ogDescription", prodDto.getDescription());
			// Coveo Search property
			node.setProperty("productBrands", prodDto.getProductBrands());
			node.setProperty("productMetabolics", prodDto.getProductMetabolics());
			node.setProperty("productIngestionMethod", prodDto.getProductIngestionMethod());
			node.setProperty("productFormFactor", prodDto.getProductFormFactor());
			node.setProperty("productDietaryRestriction", prodDto.getProductDietaryRestriction());
			node.setProperty("productPatientAge", prodDto.getProductPatientAge());
			node.setProperty("pimdbLastModifiedTime", prodDto.getLastmodifiedTime());
			node.setProperty("productImageList", prodDto.getProductImageList().toArray(new String[0]));
			node.setProperty("searchResultButtonLabel", Constants.SEARCHRESULT_BUTTON_LABEL);
			setSeoDynamicData(node, prodDto);

		} catch (RuntimeException | RepositoryException e) {
			LOGGER.error("setDataInAem exception :::: {0} ", e);
		}
	}

	private void setSeoDynamicData(Node node, ProductDTO prodDto) {
		String pdpCFpath = pdpSeoContentFragmentPath + Constants.PATH_DELIMITER + prodDto.getProductID();
		try {
			Resource cfParentResource = resourceResolver.resolve(pdpCFpath);
			ContentFragment contentFragment = cfParentResource.adaptTo(ContentFragment.class);
			if (Objects.nonNull(contentFragment)) {
				ContentElement ce = contentFragment.getElement(pdpSeoTitle);
				String title = ce.getContent();
				if (title != null && !title.isEmpty()) {
					node.setProperty("ogTitle", title);
					node.setProperty("pageTitle", title);
				}
				ce = contentFragment.getElement(pdpSeoDescription);
				String description = ce.getContent();
				if (description != null && !description.isEmpty()) {
					node.setProperty("ogDescription", description);
					node.setProperty(JcrConstants.JCR_DESCRIPTION, description);
				}
			} else {
				createContenFragment(prodDto);
			}
		} catch (RuntimeException | RepositoryException e) {
			LOGGER.error("setSeoDynamicData exception :::: {0} ", e);
		}
	}

	private void createContenFragment(ProductDTO prodDto) {
		try {
			String productTitle = prodDto.getProductPageTitle();
			if (!ObjectUtils.isEmpty(productTitle)) {
				productTitle = productTitle.replace("&reg;", "®").replace("&trade;", "™");
			}
			Resource cfParentResource = resourceResolver.resolve(pdpSeoContentFragmentPath);
			Resource templateOrModelRsc = resourceResolver.getResource(pdpSeoContentFragmentModel);
			FragmentTemplate tpl = templateOrModelRsc.adaptTo(FragmentTemplate.class);
			ContentFragment newFragment = tpl.createFragment(cfParentResource, prodDto.getProductID(), productTitle);
			if (newFragment != null) {
				newFragment.setTitle(productTitle);
				ContentElement title = newFragment.getElement("pdpMetaTitle");
				title.setContent(productTitle, "text/plain");
				ContentElement description = newFragment.getElement("pdpMetaDescription");
				description.setContent(prodDto.getDescription(), "text/plain");
				resourceResolver.commit();
			}
		} catch (ContentFragmentException | PersistenceException e) {
			LOGGER.error("CreateContenFragment exception :::: {0} ", e);
		}
	}

	private void createNewPDPPage(PageManager pageManager, ProductDTO prodDto, Session session) {
		LOGGER.debug("In createNewPDPPage method");
		Page newPDPPage;
		Node jcrNode;
		Utils objutils = new Utils();
		try {
			String name = objutils.createValidPageName(prodDto.getProductPageTitle());
			newPDPPage = pageManager.create(productsRootPath, name, pdpTemplate,
					StringEscapeUtils.escapeHtml4(prodDto.getProductPageTitle()), true);
			jcrNode = this.resourceResolver.getResource(newPDPPage.getPath() + Constants.JCR_CONTENT_WITH_SLASH)
					.adaptTo(Node.class);
			setDataInAem(jcrNode, prodDto);
			session.save();
			session.refresh(true);
			LOGGER.debug("Product page {} created at path {}", name, newPDPPage.getPath());
			// New pages for workflow
			if (prodDto.isActiveProduct()) {
				activeProducts.put(newPDPPage.getName(), prodDto.getProductID());
				LOGGER.debug("Activate Product Name :{}", newPDPPage.getName());
			} else {
				discontinuedProducts.put(newPDPPage.getName(), prodDto.getProductID());
				LOGGER.debug("Discontinued Product Name :{}", newPDPPage.getName());
			}

		} catch (RuntimeException | RepositoryException | WCMException e) {
			LOGGER.error("createNewPDPPage exception :{0} ", e);
		}

	}

	private List<ProductDTO> getProductDetails(boolean approvallookback, PIMConfigurationService pimConfigs)
			throws JsonIOException, JsonSyntaxException {

		JsonArray productArray = new JsonArray();
		List<ProductDTO> productDetails = new ArrayList<>();
		Iterator<JsonElement> iterator = null;
		getProductArray(productArray, approvallookback, pimConfigs);
		iterator = productArray.iterator();
		Utils objUtils = new Utils();
		while (iterator.hasNext()) {
			JsonObject prodObj = iterator.next().getAsJsonObject();
			ProductDTO productData = new ProductDTO();
			List<String> imageArray = new ArrayList<>();
			String pageTitle = prodObj.get("name").getAsString();
			String learnmore = objUtils.getLearnMore(pageTitle);
			productData.setLearnMore(learnmore);
			productData.setActiveProduct(!prodObj.get("discontinued").getAsBoolean());
			productData.setProductPageTitle(pageTitle);
			productData.setProductID(prodObj.get("productID").getAsString());
			productData.setLastmodifiedTime(getData("lastmodifiedTime", prodObj));
			productData.setBusinessUnit(getData("businessUnitName", prodObj));
			productData.setCommonName(getData(Constants.COMMONNAME, prodObj));
			JsonArray claims = getDataJsonArray("productClaims", prodObj);
			JsonArray productRefrences = getDataJsonArray("productRefrences", prodObj);
			JsonArray formulations = getDataJsonArray("productFormulations", prodObj);
			getProductClaims(claims, productData);
			getProductRefrences(productRefrences, productData);
			List<String> lstformulationType = new ArrayList<>();
			List<String> lstflavor = new ArrayList<>();
			List<String> lstformulationTypeandflavr = new ArrayList<>();
			List<String> lstformulationCode = new ArrayList<>();
			for (JsonElement objFormulation : formulations) {
				JsonObject formulationObj = objFormulation.getAsJsonObject();
				JsonArray productSkus = null;
				JsonArray productNutritionalInformationServingSize = null;
				String isDefault = getData("isDefault", formulationObj);
				lstformulationType.add(getData(Constants.FORMULATION_TYPE, formulationObj));
				if (!checkNullValue(Constants.FLAVOR, formulationObj)) {
					String fourmulationCode = formulationObj.get(Constants.ACODE).getAsString();
					lstflavor.add(fourmulationCode + "|" + formulationObj.get(Constants.FLAVOR).getAsString());
				}
				if (!checkNullValue(Constants.FORMULATION_TYPE, formulationObj)
						&& !checkNullValue(Constants.FLAVOR, formulationObj)) {
					String formulationTypeandflavr = formulationObj.get(Constants.FLAVOR).getAsString() + " "
							+ formulationObj.get(Constants.FORMULATION_TYPE).getAsString();
					lstformulationTypeandflavr.add(formulationTypeandflavr);
				}
				lstformulationCode.add(getData(Constants.ACODE, formulationObj));
				imageArray.add(objUtils.getImagePathUrl(getData(Constants.IMAGE, formulationObj)));
				if (isDefault.equalsIgnoreCase("true")) {
					productData.setProductDefaultformualtionCode(getData(Constants.ACODE, formulationObj));
					productData.setCommonImage(getData(Constants.IMAGE, formulationObj));
					productSkus = getDataJsonArray("productSkus", formulationObj);
					productNutritionalInformationServingSize = getDataJsonArray(
							"productNutritionalInformationServingSize", formulationObj);
					getProductSkusData(productSkus, productData);
					getProductSkusSkusServingSizeData(productNutritionalInformationServingSize, productData);
				}

			}
			productData.setFormulationCode(lstformulationCode);
			JsonArray productCategories = getDataJsonArray("productCategories", prodObj);
			getProductSearchCategory(productCategories, productData);
			productData.setFormulationTypeandflavor(lstformulationTypeandflavr);
			productData.setFormulationType(lstformulationType);
			productData.setFlavor(lstflavor);
			productData.setProductImageList(imageArray);
			productDetails.add(productData);

		}

		return productDetails;

	}

	private boolean checkNullValue(String element, JsonObject jsonObject) {
		return jsonObject.get(element) == null;
	}

	private String getData(String element, JsonObject jsonObject) {
		return !checkNullValue(element, jsonObject) ? jsonObject.get(element).getAsString() : "";
	}

	private JsonArray getDataJsonArray(String element, JsonObject jsonObject) {
		return !checkNullValue(element, jsonObject) ? (JsonArray) jsonObject.get(element) : new JsonArray();
	}

	private void getProductArray(JsonArray productArray, boolean approvallookback, PIMConfigurationService pimConfigs) {
		String productJson;
		JsonParser jsonParser = new JsonParser();
		JsonObject productDataJson = null;
		int loopCount = Constants.MAXPRODUCTCOUNT / Constants.PAGESIZE;
		for (int pageNumber = 1; pageNumber <= loopCount; pageNumber++) {
			String payload = getRequestParams(approvallookback, pageNumber, Constants.PAGESIZE);
			LOGGER.info("payload {}", payload);
			JsonArray productArraySecond = new JsonArray();
			productJson = getProductFromPIM(payload, pimConfigs);
			JsonElement jsonElement = jsonParser.parse(productJson);
			productDataJson = jsonElement.getAsJsonObject();
			if (!checkNullValue(Constants.RESPONSE, productDataJson))
				productArraySecond = (JsonArray) productDataJson.get(Constants.RESPONSE);
			if (productArraySecond != null && productArraySecond.size() > 0)
				productArray.addAll(productArraySecond);
			if (approvallookback && productArraySecond != null && productArraySecond.size() == 0)
				break;
		}

	}

	private void getProductSkusData(JsonArray productSkus, ProductDTO productData) {
		List<String> containerSize = new ArrayList<>();
		for (JsonElement objproductSkus : productSkus) {
			JsonObject productSkusObj = objproductSkus.getAsJsonObject();
			String marketSegment = getData("marketSegment", productSkusObj);
			if (marketSegment.equalsIgnoreCase("Retail")) {
				containerSize.add(getData("containerSize", productSkusObj));
				productData.setListNumber(getData(Constants.LISTNUMBER, productSkusObj));
			}
		}
		productData.setSkuContainerSize(containerSize);
	}

	private void getProductSkusSkusServingSizeData(JsonArray productNutritionalInformationServingSize,
			ProductDTO productData) {
		List<String> servingSize = new ArrayList<>();
		List<String> servingSizeId = new ArrayList<>();
		for (JsonElement objproductNutritionalInformationServingSize : productNutritionalInformationServingSize) {
			JsonObject productNutritionalInformationServingSizeObj = objproductNutritionalInformationServingSize
					.getAsJsonObject();
			servingSize.add(getData("servingSize", productNutritionalInformationServingSizeObj));
			servingSizeId.add(getData("id", productNutritionalInformationServingSizeObj));
		}
		productData.setSkuServingSize(servingSize);
		productData.setSkuServingSizeId(servingSizeId);
	}

	private void getProductClaims(JsonArray claims, ProductDTO productData) {
		StringBuilder usageClaimContent = new StringBuilder();
		for (JsonElement objClaim : claims) {
			JsonObject claimObj = objClaim.getAsJsonObject();
			String category = getData(Constants.CATEGORY, claimObj);
			if (category.equalsIgnoreCase("Usage") && !checkNullValue(Constants.CONTENT, claimObj)) {
				if (usageClaimContent.length() == 0)
					usageClaimContent.append(claimObj.get(Constants.CONTENT).getAsString());
				else
					usageClaimContent.append(" ").append(claimObj.get(Constants.CONTENT).getAsString());
			}
		}
		productData.setDescription(usageClaimContent.toString());

	}

	private void getProductRefrences(JsonArray productRefrences, ProductDTO productData) {
		List<String> value = new ArrayList<>();
		for (JsonElement objproductRefrences : productRefrences) {
			JsonObject productRefrencesObj = objproductRefrences.getAsJsonObject();
			if (!checkNullValue(Constants.VALUE, productRefrencesObj)
					&& !checkNullValue(Constants.CATEGORY, productRefrencesObj)) {
				String category = productRefrencesObj.get(Constants.CATEGORY).getAsString();
				if (category.equalsIgnoreCase("Usage")) {
					String refrences = productRefrencesObj.get("symbol").getAsString()
							+ productRefrencesObj.get(Constants.VALUE).getAsString();
					value.add(refrences);
				}
			}
		}
		productData.setProductRefrenceValue(value);

	}

	private void getProductSearchCategory(JsonArray productCategories, ProductDTO productData) {
		objSearchCategoryMap.put(Constants.BRANDS, Constants.BRANDS);
		objSearchCategoryMap.put(Constants.METABOLICS, Constants.METABOLICS);
		objSearchCategoryMap.put(Constants.INGESTION_METHOD, Constants.INGESTION_METHOD);
		objSearchCategoryMap.put(Constants.FORM_FACTOR, Constants.FORM_FACTOR);
		objSearchCategoryMap.put(Constants.DIETTARY_RESTRICTIONS, Constants.DIETTARY_RESTRICTIONS);
		objSearchCategoryMap.put(Constants.PATIENT_AGE, Constants.PATIENT_AGE);
		StringBuilder productBrands = new StringBuilder();
		StringBuilder productFormFactor = new StringBuilder();
		StringBuilder productMetabolics = new StringBuilder();
		StringBuilder productIngestionMethod = new StringBuilder();
		StringBuilder productPatientAge = new StringBuilder();
		StringBuilder productDietaryRestriction = new StringBuilder();
		String categoryValue = null;
		for (JsonElement objproductCategories : productCategories) {
			JsonObject productCategoriesObj = objproductCategories.getAsJsonObject();
			categoryValue = productCategoriesObj.get("value").getAsString();
			setCategoryDataforBrandFormFactorMetabolics(categoryValue, productData, productBrands, productFormFactor,
					productMetabolics);
			setCategoryDataforOthers(categoryValue, productData, productIngestionMethod, productPatientAge,
					productDietaryRestriction);

		}
	}

	private void setCategoryDataforBrandFormFactorMetabolics(String categoryValue, ProductDTO productData,
			StringBuilder productBrands, StringBuilder productFormFactor, StringBuilder productMetabolics) {
		if (!Objects.isNull(categoryValue)) {
			String[] splitValue = categoryValue.split("[.]");
			if (splitValue.length > 1) {
				setCategoryforBrandformfactorandMetabolics(productData, splitValue, productBrands, productFormFactor,
						productMetabolics);
			}
		}
	}

	private void setCategoryDataforOthers(String categoryValue, ProductDTO productData,
			StringBuilder productIngestionMethod, StringBuilder productPatientAge,
			StringBuilder productDietaryRestriction) {
		if (!Objects.isNull(categoryValue)) {
			String[] splitValue = categoryValue.split("[.]");
			if (splitValue.length > 1) {
				setCategoryforOthers(productData, splitValue, productIngestionMethod, productPatientAge,
						productDietaryRestriction);
			}
		}
	}

	private void setCategoryforBrandformfactorandMetabolics(ProductDTO productData, String[] splitValue,
			StringBuilder productBrands, StringBuilder productFormFactor, StringBuilder productMetabolics) {

		String key = objSearchCategoryMap.get(splitValue[0]);
		if (!Objects.isNull(key)) {
			switch (key.toLowerCase()) {
			case "brands":
				getSearchCategoryString(productBrands, splitValue);
				productData.setProductBrands(productBrands.toString());
				break;
			case "form factor":
				getSearchCategoryString(productFormFactor, splitValue);
				productData.setProductFormFactor(productFormFactor.toString());
				break;
			case "metabolics":
				getSearchCategoryString(productMetabolics, splitValue);
				productData.setProductMetabolics(productMetabolics.toString());
				break;
			default:
				break;
			}
		}
	}

	private void setCategoryforOthers(ProductDTO productData, String[] splitValue, StringBuilder productIngestionMethod,
			StringBuilder productPatientAge, StringBuilder productDietaryRestriction) {

		String key = objSearchCategoryMap.get(splitValue[0]);
		if (!Objects.isNull(key)) {
			switch (key.toLowerCase()) {
			case "ingestion method":
				getSearchCategoryString(productIngestionMethod, splitValue);
				productData.setProductIngestionMethod(productIngestionMethod.toString());
				break;
			case "patient age":
				getSearchCategoryString(productPatientAge, splitValue);
				productData.setProductPatientAge(productPatientAge.toString());
				break;
			case "dietary restrictions":
				getSearchCategoryString(productDietaryRestriction, splitValue);
				productData.setProductDietaryRestriction(productDietaryRestriction.toString());
				break;
			default:
				break;
			}
		}
	}

	private StringBuilder getSearchCategoryString(StringBuilder strvalue, String[] splitValue) {
		if (strvalue.length() == 0)
			strvalue.append(splitValue[1]);
		else
			strvalue.append(";").append(splitValue[1]);
		return strvalue;
	}

	private String getRequestParams(boolean approvalLookBack, int pageNumber, int pageSize) {
		JsonObject requestParams = new JsonObject();
		requestParams.addProperty("detailed", Constants.NONDETAILEDFLAG);
		requestParams.addProperty("pagenumber", pageNumber);
		requestParams.addProperty("pagesize", pageSize);
		requestParams.addProperty("approvalLookBack", approvalLookBack);
		requestParams.addProperty("brandFamilyName", Constants.BRANDFAMILYNAME);
		requestParams.addProperty("productID", Constants.EMPTY);
		requestParams.addProperty("instance", Constants.AUTHOR);
		return requestParams.toString();
	}

	private String getProductFromPIM(String payload, PIMConfigurationService pimConfigs) {
		HttpPost post = new HttpPost(apiUrl);

		JsonArray productArray = new JsonArray();
		StringEntity entity = new StringEntity(payload, ContentType.APPLICATION_JSON);
		post.setEntity(entity);
		post.setHeader(Constants.APPLICATION_ID, xApplicationId);
		post.setHeader(Constants.COUNTRY_CODE, xCountryCode);
		post.setHeader(Constants.PREFERRED_LANGUAGE, xPrefferedLanguage);
		post.setHeader(Constants.ORIGIN_SECRET, xOriginSecret);
		post.setHeader(Constants.SECRET_HEADER, xSecretheader);
		String productJSON = null;
		JsonElement jsonElement;
		JsonObject productDataJson;
		JsonParser jsonParser = new JsonParser();
		Utils objutils = new Utils();
		try {
			productJSON = objutils.callRestAPI(post, pimConfigs);
			jsonElement = jsonParser.parse(productJSON);
			productDataJson = jsonElement.getAsJsonObject();
			if (productDataJson.get("status").getAsString().equalsIgnoreCase("true")
					&& productDataJson.get("errorCode").getAsString().equalsIgnoreCase("0")) {
				productArray = (JsonArray) productDataJson.get(Constants.RESPONSE);
				LOGGER.debug("Product Data received from PIM API successfully!! Product count {}", productArray.size());
			} else {
				LOGGER.debug("Product Data try first time");
				productJSON = objutils.callRestAPI(post, pimConfigs);
				jsonElement = jsonParser.parse(productJSON);
				productDataJson = jsonElement.getAsJsonObject();
				if (productDataJson.get("status").getAsString().equalsIgnoreCase(Constants.FALSE)
						&& !productDataJson.get("errorCode").getAsString().equalsIgnoreCase("0")) {
					throw new JsonParseException("Try one more time");
				}
				LOGGER.debug("Product Data received from PIM API successfully!! Product count {}", productArray.size());
			}

		} catch (JsonParseException | IOException ex) {
			try {
				productJSON = objutils.callRestAPI(post, pimConfigs);

			} catch (RuntimeException | IOException e) {
				LOGGER.error("Product Data received from PIM API-> Error:{0}", e);
			}
		}
		return productJSON;
	}

}