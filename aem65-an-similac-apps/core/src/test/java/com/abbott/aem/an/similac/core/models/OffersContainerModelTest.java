package com.abbott.aem.an.similac.core.models;

import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.CurrentOffersBean;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.Offer;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.Tpg;
import com.abbott.aem.an.similac.core.beans.OfferContainerBean;
import com.abbott.aem.an.similac.core.beans.OfferCouponBean;
import com.abbott.aem.an.similac.core.beans.OfferCouponBean.Coupon;
import com.abbott.aem.an.similac.core.beans.RetailerBean;
import com.abbott.aem.an.similac.core.beans.RetailerBean.Retailer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class OffersContainerModelTest {

	private static final String CONTENT_PATH = "/content";
	private static final String FORM_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/my-offers.json";
	private static final String OFFER_TITLE = "offerTitle";
	private static final String OFFER_DESC = "offerDescription";
	private static final String OFFER_BUTTON_LABEL = "offerButtonLabel";
	private static final String OFFER_IMAGE_URL = "offerImgUrl";
	private static final String OFFER_HREF = "offerHref";
	private static final String TPG_OFFER_TITLE= "tpgOfferTitle";
	private static final String TPG_OFFER_SUBTITLE= "tpgOfferSubTitle";
	private static final String TPG_OFFER_IMAGE_URL= "tpgOfferImgUrl";
	private static final String TPG_OFFER_IMAGE_SMURL= "tpgOfferImgSMUrl";
	private static final String TPG_OFFER_PAGE_URL= "tpgOfferPageUrl";
	private static final String TPG_OFFER_TYPE= "tpgOfferType";
	private static final String TPG_OFFER_TOP_IMAGE_URL= "tpgOfferTopImgUrl";
	private static final String TPG_OFFER_SHOW_OFFER_VALUE= "tpgOfferShowOfferVal";
	private static final String TPG_OFFER_DISCLAIMER= "tpgOfferDisclaimer";
	private static final String NEW_OFFER_TITLE_TPG="newOfferTitleTpg";
    private static final String NEW_OFFER_SUBTITLE_TPG= "newOfferSubTitleTpg";
	private static final String NEW_OFFER_BUTTON_LABEL_TPG= "newOfferButtonLabelTpg";
	private static final String NEW_OFFER_ANALYTIC_LABEL_TPG= "newOfferAnalyticsLabelTpg";
    private static final String OPEN_OFFER_TITLE_TPG= "openOfferTitleTpg";
	private static final String OPEN_OFFER_SUBTITLE_TPG= "openOfferSubTitleTpg";
	private static final String OPEN_OFFER_BUTTON_LABEL_TPG= "openOfferButtonLabelTpg";
	private static final String OPEN_OFFER_ANALYTICS_LABEL_TPG= "newOfferAnalyticsLabelTpg";
	private static final String REDEEMED_OFFER_TITLE_TPG= "redeemedOfferTitleTpg";
	private static final String REDEEMED_OFFER_SUBTITLE_TPG= "redeemedOfferSubTitleTpg";
	private static final String REDEEMED_OFFER_BUTTON_LABEL_TPG= "redeemedOfferButtonLabelTpg";
	private static final String REDEEMED_LABEL_TPG= "redeemedOnLabelTpg";
	private static final String REDEEMED_OFFER_ANALYTICS_LABEL_TPG= "redeemedOfferAnalyticsLabelTpg";
	private static final String LABEL = "label";
	private static final String VALUE = "value";
	private static final String AVAILABLE = "isAvailable";
	private static final String LINE_ONE = "lineOneTxt";
	private static final String LINE_TWO = "lineTwoTxt";
	private static final String IMAGE_URL = "imgUrl";
	private static final String IMAGE_SM_URL = "imgSMUrl";
	private static final String PAGE_URL = "pageUrl";

	private OffersContainerModel offersContainerModel;

	private AemContext context;

	@InjectMocks
	private CurrentOfferModel currentOfferModel = new CurrentOfferModel();

	@InjectMocks
	private RetailerModel retailerModel = new RetailerModel();

	@Mock
	private CurrentOffersBean currentOffersBean;
	
	@Mock
	private OfferCouponBean offerCoupon;

	@Mock
	private RetailerBean retailerBean;

	@Mock
	private Iterable<Resource> childResources;

	@Mock
	private Resource resource;

	@Mock
	private Node node;

	@Mock
	private NodeIterator nodeIterator;

	@Mock
	private Property titleProperty;

	@Mock
	private Property descProperty;

	@Mock
	private Property imgUrlProperty;

	@Mock
	private Property btnLabelProperty;

	@Mock
	private Property hrefProperty;
	
	@Mock
	private Property tpgTitleProperty;
	
	@Mock
	private Property tpgSubTitleProperty;
	
	@Mock
	private Property tpgImgUrlProperty;
	
	@Mock
	private Property tpgImgSMUrlProperty;
	
	@Mock
	private Property tpgTypeProperty;
	
	@Mock
	private Property tpgOfferDisclaimerProperty;
	
	@Mock
	private Property tpgShowOfferProperty;
	
	@Mock
	private Property tpgOfferImgUrlProperty;
	
	@Mock
	private Property tpgPageUrlProperty;
	
	@Mock
	private Property tpgNewOfferTitleProperty;
	
	@Mock
	private Property tpgNewOfferSubTitleProperty;

	@Mock
	private Property tpgNewOfferButtonLabelProperty;
	
	@Mock
	private Property tpgNewOfferAnalyticLabelProperty;
	
	@Mock
	private Property tpgOpenOfferTitleProperty;
	
	@Mock
	private Property tpgOpenOfferSubTitleProperty;

	@Mock
	private Property tpgOpenOfferButtonLabelProperty;
	
	@Mock
	private Property tpgOpenOfferAnalyticLabelProperty;
	
	@Mock
	private Property tpgRedeemedOfferTitleProperty;
	
	@Mock
	private Property tpgRedeemedOfferSubTitleProperty;

	@Mock
	private Property tpgRedeemedOfferButtonLabelProperty;
	
	@Mock
	private Property tpgRedeemedLabelProperty;
	
	@Mock
	private Property tpgRedeemedOfferAnalyticLabelProperty;
	
	@Mock
	private Property labelProperty;

	@Mock
	private Property valueProperty;
	
	@Mock
	private Property availableProperty;
	
	@Mock
	private Property lineOneProperty;
	
	@Mock
	private Property lineTwoProperty;

	@Mock
	private Property imgSMUrlProperty;

	@Mock
	private Property pageUrlProperty;

	@Mock
	private Value titleValue;

	@Mock
	private Value descValue;

	@Mock
	private Value imgUrlValue;

	@Mock
	private Value btnLabelValue;

	@Mock
	private Value hrefValue;
	
	@Mock
	private Value tpgTitleValue;
	
	@Mock
	private Value tpgSubTitleValue;
	
	@Mock
	private Value tpgImgUrlValue;
	
	@Mock
	private Value tpgImgSMUrlValue;
	
	@Mock
	private Value tpgPageUrlValue;
	
	@Mock
	private Value tpgNewOfferTitleValue;
	
	@Mock
	private Value tpgNewOfferSubTitleValue;
	
	@Mock
	private Value tpgNewOfferButtonLabelValue;
	
	@Mock
	private Value tpgNewOfferAnalyticLabelValue;
	
	@Mock
	private Value tpgOpenOfferTitleValue;
	
	@Mock
	private Value tpgOpenOfferSubTitleValue;
	
	@Mock
	private Value tpgOpenOfferButtonLabelValue;
	
	@Mock
	private Value tpgOpenOfferAnalyticLabelValue;
	
	@Mock
	private Value tpgRedeemedOfferTitleValue;
	
	@Mock
	private Value tpgRedeemedOfferSubTitleValue;
	
	@Mock
	private Value tpgRedeemedOfferButtonLabelValue;
	
	@Mock
	private Value tpgRedeemedLabelValue;
	
	@Mock
	private Value tpgRedeemedOfferAnalyticLabelValue;
	
	@Mock
	private Value tpgTypeValue;
	
	@Mock
	private Value tpgOfferDisclaimerValue;
	
	@Mock
	private Value tpgShowOfferValue;
	
	@Mock
	private Value tpgOfferImgUrlValue;

	@Mock
	private Value labelValue;

	@Mock
	private Value retailerValue;
	
	@Mock
	private Value availableValue;
	
	@Mock
	private Value lineOneValue;
	
	@Mock
	private Value lineTwoValue;

	@Mock
	private Value imgSMUrlValue;

	@Mock
	private Value pageUrlValue;

	@BeforeEach
	void setUp() {
		context.load().json(FORM_CONTENT_JSON, CONTENT_PATH);
		context.addModelsForClasses(OffersContainerModel.class);
	}

	@Test
	final void testOfferContainer() {
		context.currentResource(context.resourceResolver().getResource("/content/offers/jcr:content/offerscontainer"));
		offersContainerModel = context.request().adaptTo(OffersContainerModel.class);
		OfferContainerBean offerContainer = offersContainerModel.getContainer();
		validateOfferContainer(offerContainer);
		Assertions.assertNotNull(offersContainerModel.getMyOffersJson());
	}

	@Test
	final void testContainerEmptyResource() {
		context.currentResource(context.resourceResolver().getResource("/content/emptyResource/jcr:content/container"));
		offersContainerModel = context.request().adaptTo(OffersContainerModel.class);
		OfferContainerBean offerContainer = offersContainerModel.getContainer();
		Assertions.assertNull(offerContainer);
		Assertions.assertNull(offersContainerModel.getMyOffersJson());
	}

	@Test
	final void testContainerEmptyChildResource() {
		context.currentResource(context.resourceResolver().getResource("/content/emptyChildResource/jcr:content/offerscontainer"));
		offersContainerModel = context.request().adaptTo(OffersContainerModel.class);
		OfferContainerBean offerContainer = offersContainerModel.getContainer();
		Assertions.assertNotNull(offerContainer);
		Assertions.assertNull(offerContainer.getCurrentOffers());
		Assertions.assertNull(offerContainer.getRetailer());
	}
	
	@Test
	final void testRetailer() {
		context.currentResource(context.resourceResolver().getResource("/content/offers/jcr:content/offerscontainer/retailer"));
		retailerModel = context.request().adaptTo(RetailerModel.class);
		RetailerBean retailerBean = retailerModel.getRetailer();
		validateRetailerBean(retailerBean);
	}
	
	@Test
	final void testCurrentOffers() {
		context.currentResource(context.resourceResolver().getResource("/content/offers/jcr:content/offerscontainer/currentOffers"));
		CurrentOfferModel currentOffersModel = context.request().adaptTo(CurrentOfferModel.class);
		currentOffersBean = currentOffersModel.getCurrentOffers();
		validateCurrentOffersBean(currentOffersBean);
	}
	
	@Test
	final void testAmazonOffers() {
		context.currentResource(context.resourceResolver().getResource("/content/offers/jcr:content/offerscontainer/currentOffers/amazonOffer"));
		CurrentOfferModel currentOffersModel = context.request().adaptTo(CurrentOfferModel.class);
		currentOffersBean = currentOffersModel.getCurrentOffers();
		validateAmazonOfferBean(currentOffersBean);
	}
	
	@Test
	final void testAmazonNewOffers() {
		context.currentResource(context.resourceResolver().getResource("/content/offers/jcr:content/offerscontainer/currentOffers/amazonOffer/newOffer"));
		CurrentOfferModel currentOffersModel = context.request().adaptTo(CurrentOfferModel.class);
		currentOffersBean = currentOffersModel.getCurrentOffers();
		validateAmazonNewOffer(currentOffersBean.getAmazonOffer().getNewOffer());
	}

	@Test
	final void testGetOfferList() throws RepositoryException {
		offerListValueMocking();
		List<Offer> offerList = currentOfferModel.getOfferList(resource);
		validateOfferList(offerList);
	}

	@Test
	final void testGetOfferListMissingData() throws RepositoryException {
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty(OFFER_TITLE)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(OFFER_DESC)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(OFFER_IMAGE_URL)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(OFFER_BUTTON_LABEL)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(OFFER_HREF)).thenReturn(false);
		List<Offer> offerList = currentOfferModel.getOfferList(resource);
		Assertions.assertNotNull(offerList);
		Assertions.assertEquals(1, offerList.size());
	}

	@Test
	final void testGetTpgOffers() throws RepositoryException {
		tpgOffersValueMocking();
		List<Tpg> tpgOffers = currentOfferModel.getTpgOffers(resource);
		validateTPGOffers(tpgOffers);
	} 
	
	@Test
	final void testGetTpgOffersMissingData() throws RepositoryException {
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(false);
		List<Tpg> tpgOffers = currentOfferModel.getTpgOffers(resource);
		Assertions.assertNotNull(tpgOffers);
		Assertions.assertEquals(0, tpgOffers.size());
	}	
	
	@Test
	final void testGetRetailerList() throws RepositoryException {
		retailerListValueMocking();
		Map<String, Retailer> retailerMap = retailerModel.getRetailerList(resource);
		validateRetailer(retailerMap.get("amazon"));
		Assertions.assertNotNull(retailerMap);
		Assertions.assertEquals(1, retailerMap.size());
	}

	@Test
	final void testGetRetailerListMissingData() throws RepositoryException {

		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty(LABEL)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(VALUE)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(AVAILABLE)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(LINE_ONE)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(LINE_TWO)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(IMAGE_URL)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(IMAGE_SM_URL)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(PAGE_URL)).thenReturn(false);
		Map<String, Retailer> retailerMap = retailerModel.getRetailerList(resource);
		Assertions.assertNotNull(retailerMap);
		Assertions.assertEquals(0, retailerMap.size());
	}

	private void validateOfferContainer(OfferContainerBean container) {
		Assertions.assertNotNull(container);
		Assertions.assertNotNull(container.getActionPath());
		Assertions.assertNotNull(container.getActionPathLookupUser());
		Assertions.assertNotNull(container.getCurrentOffers());
		Assertions.assertNotNull(container.getMyOfferPageUrl());
		Assertions.assertNotNull(container.getNoteLabel());
		Assertions.assertNotNull(container.getRegisterPageUrl());
		Assertions.assertNotNull(container.getRegistrationFormName());
		Assertions.assertNotNull(container.getRetailer());
		Assertions.assertNotNull(container.getTitle());
		Assertions.assertNotNull(container.getUpdateLabel());
		Assertions.assertNotNull(container.getPwaDownloadDisruptorFragment());
	}
	
	private void validateRetailerBean(RetailerBean retailerBean) {
		Assertions.assertNotNull(retailerBean);
		Assertions.assertNotNull(retailerBean.getTitle());
		Assertions.assertNotNull(retailerBean.getSubTitle());
		Assertions.assertNotNull(retailerBean.getRetailerNote());
		Assertions.assertNotNull(retailerBean.getRetailerPageUrl());
		Assertions.assertNotNull(retailerBean.getSelectRetailerLabel());
		Assertions.assertNotNull(retailerBean.getError());
		Assertions.assertNotNull(retailerBean.getDeSelectRetailerLabel());
		Assertions.assertNotNull(retailerBean.getRetailersList());
		Assertions.assertNotNull(retailerBean.getRetailerSelected());
	}
	
	private void validateRetailer(Retailer retailer) {
		Assertions.assertNotNull(retailer.getLabel());
		Assertions.assertNotNull(retailer.getValue());
		Assertions.assertNotNull(retailer.getPageUrl());
		Assertions.assertNotNull(retailer.getImgUrl());
		Assertions.assertNotNull(retailer.getImgSMUrl());
		Assertions.assertNotNull(retailer.getIsAvailable());
		Assertions.assertNotNull(retailer.getLineOneTxt());
		Assertions.assertNotNull(retailer.getLineTwoTxt());
	}
	
	private void validateCurrentOffersBean(CurrentOffersBean currentOffersBean) {
		Assertions.assertNotNull(currentOffersBean);
		Assertions.assertNotNull(currentOffersBean.getTitle());
		Assertions.assertNotNull(currentOffersBean.getThanksDigitalLabel());
		Assertions.assertNotNull(currentOffersBean.getThanksLabel());
		Assertions.assertNotNull(currentOffersBean.getDigitalMessage());
		Assertions.assertNotNull(currentOffersBean.getPaperMessage());
		Assertions.assertNotNull(currentOffersBean.getShippingLabel());
		Assertions.assertNotNull(currentOffersBean.getShippingLink());
		Assertions.assertNotNull(currentOffersBean.getAvailableLabel());
		Assertions.assertNotNull(currentOffersBean.getOffersLabel());
		Assertions.assertNotNull(currentOffersBean.getRedeemOfferMessage());
		Assertions.assertNotNull(currentOffersBean.getOfferAvailableLabel());
		Assertions.assertNotNull(currentOffersBean.getMoreDaysLabel());
		Assertions.assertNotNull(currentOffersBean.getMoreDaysLabelBogo());
		Assertions.assertNotNull(currentOffersBean.getEarnPointsText());
		Assertions.assertNotNull(currentOffersBean.getSaveFiveImgUrl());
		Assertions.assertNotNull(currentOffersBean.getSaveTenImgUrl());
		Assertions.assertNotNull(currentOffersBean.getGgImgUrl());
		Assertions.assertNotNull(currentOffersBean.getTargetImgUrl());
		Assertions.assertNotNull(currentOffersBean.getTpgImgUrl());
		Assertions.assertNotNull(currentOffersBean.getCouponLogo());
		Assertions.assertNotNull(currentOffersBean.getTargetCouponTitle());
		Assertions.assertNotNull(currentOffersBean.getTitleExpire());
		Assertions.assertNotNull(currentOffersBean.getRedeemExpireOfferMessage());
		Assertions.assertNotNull(currentOffersBean.getButtonLabelSelectRetailer());
		Assertions.assertNotNull(currentOffersBean.getRetailerAlreadySelected());
		Assertions.assertNotNull(currentOffersBean.getRetailerPageURL());
		Assertions.assertNotNull(currentOffersBean.getRetailerCouponPageURL());
		Assertions.assertNotNull(currentOffersBean.getSelectRetailerNote());
		Assertions.assertNotNull(currentOffersBean.getButtonLabelRedeem());
		Assertions.assertNotNull(currentOffersBean.getButtonLabelMarkRedeem());
		Assertions.assertNotNull(currentOffersBean.getDataGtmMarkRedeemed());
		Assertions.assertNotNull(currentOffersBean.getDataGtmRedeemOffer());
	}
	
	private void validateAmazonOfferBean(CurrentOffersBean currentOffersBean) {
		OfferCouponBean amazonOffer = currentOffersBean.getAmazonOffer();
		Assertions.assertNotNull(amazonOffer);
		Assertions.assertNotNull(amazonOffer.getTitle());
		Assertions.assertNotNull(amazonOffer.getSubTitle());
		Assertions.assertNotNull(amazonOffer.getShowOfferValue());
		Assertions.assertNotNull(amazonOffer.getImgUrl());
		Assertions.assertNotNull(amazonOffer.getImgSMUrl());
		Assertions.assertNotNull(amazonOffer.getPageUrl());
	}
	
	private void validateAmazonNewOffer(Coupon amazonNewOffer) {
		Assertions.assertNotNull(amazonNewOffer);
		Assertions.assertNotNull(amazonNewOffer.getTitle());
		Assertions.assertNotNull(amazonNewOffer.getSubTitle());
	}

	private void validateTPGOffers(List<Tpg> tpgOffers) {
		Assertions.assertNotNull(tpgOffers);
		Assertions.assertEquals(1, tpgOffers.size());
		Assertions.assertNotNull(tpgOffers.get(0).getTitle());
		Assertions.assertNotNull(tpgOffers.get(0).getSubTitle());
		Assertions.assertNotNull(tpgOffers.get(0).getOfferType());
		Assertions.assertNotNull(tpgOffers.get(0).getImgUrl());
		Assertions.assertNotNull(tpgOffers.get(0).getImgSMUrl());
		Assertions.assertNotNull(tpgOffers.get(0).getPageUrl());
		Assertions.assertNotNull(tpgOffers.get(0).getTpgOfferImage());
		Assertions.assertNotNull(tpgOffers.get(0).getShowOfferValue());
		Assertions.assertNotNull(tpgOffers.get(0).getOfferDisclaimer());
		
	}
	
	private void validateOfferList(List<Offer> offerList) {
		Assertions.assertNotNull(offerList);
		Assertions.assertEquals(1, offerList.size());
		Assertions.assertNotNull(offerList.get(0).getTitle());
		Assertions.assertNotNull(offerList.get(0).getImgUrl());
		Assertions.assertNotNull(offerList.get(0).getButtonLabel());
		Assertions.assertNotNull(offerList.get(0).getDescription());
		Assertions.assertNotNull(offerList.get(0).getHref());

	}

	private void offerListValueMocking() throws RepositoryException {
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty(OFFER_TITLE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(OFFER_DESC)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(OFFER_IMAGE_URL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(OFFER_BUTTON_LABEL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(OFFER_HREF)).thenReturn(true);

		Mockito.lenient().when(node.getProperty(OFFER_TITLE)).thenReturn(titleProperty);
		Mockito.lenient().when(node.getProperty(OFFER_DESC)).thenReturn(descProperty);
		Mockito.lenient().when(node.getProperty(OFFER_IMAGE_URL)).thenReturn(imgUrlProperty);
		Mockito.lenient().when(node.getProperty(OFFER_BUTTON_LABEL)).thenReturn(btnLabelProperty);
		Mockito.lenient().when(node.getProperty(OFFER_HREF)).thenReturn(hrefProperty);

		Mockito.lenient().when(titleProperty.getValue()).thenReturn(titleValue);
		Mockito.lenient().when(descProperty.getValue()).thenReturn(descValue);
		Mockito.lenient().when(imgUrlProperty.getValue()).thenReturn(imgUrlValue);
		Mockito.lenient().when(btnLabelProperty.getValue()).thenReturn(btnLabelValue);
		Mockito.lenient().when(hrefProperty.getValue()).thenReturn(hrefValue);

		Mockito.lenient().when(titleValue.getString()).thenReturn("Convenient Savings—Just a Touch Away");
		Mockito.lenient().when(descValue.getString()).thenReturn(
				"You’re just a few Clicks away from enjoying the convenience of digital savings from Similac® StrongMoms® Rewards.Rewards.");
		Mockito.lenient().when(imgUrlValue.getString()).thenReturn("Switch to Digital Offers");
		Mockito.lenient().when(btnLabelValue.getString()).thenReturn("resources/img/255_204.png");
		Mockito.lenient().when(hrefValue.getString()).thenReturn("/retailer_selection.html");
	}
	
	private void tpgOffersValueMocking() throws RepositoryException {
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_TITLE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_SUBTITLE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_IMAGE_URL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_IMAGE_SMURL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_PAGE_URL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_TYPE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_TOP_IMAGE_URL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_SHOW_OFFER_VALUE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(TPG_OFFER_DISCLAIMER)).thenReturn(true);

		Mockito.lenient().when(node.getProperty(TPG_OFFER_TITLE)).thenReturn(tpgTitleProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_SUBTITLE)).thenReturn(tpgSubTitleProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_IMAGE_URL)).thenReturn(tpgImgUrlProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_IMAGE_SMURL)).thenReturn(tpgImgSMUrlProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_PAGE_URL)).thenReturn(tpgPageUrlProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_TYPE)).thenReturn(tpgTypeProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_TOP_IMAGE_URL)).thenReturn(tpgOfferImgUrlProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_SHOW_OFFER_VALUE)).thenReturn(tpgShowOfferProperty);
		Mockito.lenient().when(node.getProperty(TPG_OFFER_DISCLAIMER)).thenReturn(tpgOfferDisclaimerProperty);
		Mockito.lenient().when(node.getProperty(NEW_OFFER_TITLE_TPG)).thenReturn(tpgNewOfferTitleProperty);
		Mockito.lenient().when(node.getProperty(NEW_OFFER_SUBTITLE_TPG)).thenReturn(tpgNewOfferSubTitleProperty);
		Mockito.lenient().when(node.getProperty(NEW_OFFER_BUTTON_LABEL_TPG)).thenReturn(tpgNewOfferButtonLabelProperty);
		Mockito.lenient().when(node.getProperty(NEW_OFFER_ANALYTIC_LABEL_TPG)).thenReturn(tpgNewOfferAnalyticLabelProperty);
		Mockito.lenient().when(node.getProperty(OPEN_OFFER_TITLE_TPG)).thenReturn(tpgOpenOfferTitleProperty);
		Mockito.lenient().when(node.getProperty(OPEN_OFFER_SUBTITLE_TPG)).thenReturn(tpgOpenOfferSubTitleProperty);
		Mockito.lenient().when(node.getProperty(OPEN_OFFER_BUTTON_LABEL_TPG)).thenReturn(tpgOpenOfferButtonLabelProperty);
		Mockito.lenient().when(node.getProperty(OPEN_OFFER_ANALYTICS_LABEL_TPG)).thenReturn(tpgOpenOfferAnalyticLabelProperty);
		Mockito.lenient().when(node.getProperty(REDEEMED_OFFER_TITLE_TPG)).thenReturn(tpgRedeemedOfferTitleProperty);
		Mockito.lenient().when(node.getProperty(REDEEMED_OFFER_SUBTITLE_TPG)).thenReturn(tpgRedeemedOfferSubTitleProperty);
		Mockito.lenient().when(node.getProperty(REDEEMED_OFFER_BUTTON_LABEL_TPG)).thenReturn(tpgRedeemedOfferButtonLabelProperty);
		Mockito.lenient().when(node.getProperty(REDEEMED_LABEL_TPG)).thenReturn(tpgRedeemedLabelProperty);
		Mockito.lenient().when(node.getProperty(REDEEMED_OFFER_ANALYTICS_LABEL_TPG)).thenReturn(tpgRedeemedOfferAnalyticLabelProperty);
		

		Mockito.lenient().when(tpgTitleProperty.getValue()).thenReturn(tpgTitleValue);
		Mockito.lenient().when(tpgSubTitleProperty.getValue()).thenReturn(tpgSubTitleValue);
		Mockito.lenient().when(tpgImgUrlProperty.getValue()).thenReturn(tpgImgUrlValue);
		Mockito.lenient().when(tpgImgSMUrlProperty.getValue()).thenReturn(tpgImgSMUrlValue);
		Mockito.lenient().when(tpgPageUrlProperty.getValue()).thenReturn(tpgPageUrlValue);
		Mockito.lenient().when(tpgTypeProperty.getValue()).thenReturn(tpgTypeValue);
		Mockito.lenient().when(tpgOfferDisclaimerProperty.getValue()).thenReturn(tpgOfferDisclaimerValue);
		Mockito.lenient().when(tpgShowOfferProperty.getValue()).thenReturn(tpgShowOfferValue);
		Mockito.lenient().when(tpgOfferImgUrlProperty.getValue()).thenReturn(tpgOfferImgUrlValue);
		Mockito.lenient().when(tpgNewOfferTitleProperty.getValue()).thenReturn(tpgNewOfferTitleValue);
		Mockito.lenient().when(tpgNewOfferSubTitleProperty.getValue()).thenReturn(tpgNewOfferSubTitleValue);
		Mockito.lenient().when(tpgNewOfferButtonLabelProperty.getValue()).thenReturn(tpgNewOfferButtonLabelValue);
		Mockito.lenient().when(tpgNewOfferAnalyticLabelProperty.getValue()).thenReturn(tpgNewOfferAnalyticLabelValue);
		Mockito.lenient().when(tpgOpenOfferTitleProperty.getValue()).thenReturn(tpgOpenOfferTitleValue);
		Mockito.lenient().when(tpgOpenOfferSubTitleProperty.getValue()).thenReturn(tpgOpenOfferSubTitleValue);
		Mockito.lenient().when(tpgOpenOfferButtonLabelProperty.getValue()).thenReturn(tpgOpenOfferButtonLabelValue);
		Mockito.lenient().when(tpgOpenOfferAnalyticLabelProperty.getValue()).thenReturn(tpgOpenOfferAnalyticLabelValue);
		Mockito.lenient().when(tpgRedeemedOfferTitleProperty.getValue()).thenReturn(tpgRedeemedOfferTitleValue);
		Mockito.lenient().when(tpgRedeemedOfferSubTitleProperty.getValue()).thenReturn(tpgRedeemedOfferSubTitleValue);
		Mockito.lenient().when(tpgRedeemedOfferButtonLabelProperty.getValue()).thenReturn(tpgRedeemedOfferButtonLabelValue);
		Mockito.lenient().when(tpgRedeemedLabelProperty.getValue()).thenReturn(tpgRedeemedLabelValue);
		Mockito.lenient().when(tpgRedeemedOfferAnalyticLabelProperty.getValue()).thenReturn(tpgRedeemedOfferAnalyticLabelValue);
		

		Mockito.lenient().when(tpgTitleValue.getString()).thenReturn("SAVE");
		Mockito.lenient().when(tpgSubTitleValue.getString()).thenReturn(
				"On Any infant formula from SIMILAC®.");
		Mockito.lenient().when(tpgImgUrlValue.getString()).thenReturn("resources/img/160_160.jpg");
		Mockito.lenient().when(tpgImgSMUrlValue.getString()).thenReturn("resources/img/235_50.png");
		Mockito.lenient().when(tpgPageUrlValue.getString()).thenReturn("www.tpg.com");
		Mockito.lenient().when(tpgTypeValue.getString()).thenReturn("tpg_link");
		Mockito.lenient().when(tpgOfferDisclaimerValue.getString()).thenReturn("tpg_link");
		Mockito.lenient().when(tpgShowOfferValue.getString()).thenReturn("tpg_link");
		Mockito.lenient().when(tpgOfferImgUrlValue.getString()).thenReturn("resources/img/160_160.jpg");
		Mockito.lenient().when(tpgNewOfferTitleValue.getString()).thenReturn("SAVE");
		Mockito.lenient().when(tpgNewOfferSubTitleValue.getString()).thenReturn("On any Similac product");
		Mockito.lenient().when(tpgNewOfferButtonLabelValue.getString()).thenReturn("Redeem Offer");
		Mockito.lenient().when(tpgNewOfferAnalyticLabelValue.getString()).thenReturn("TPG New Offer Analytic Label");
		Mockito.lenient().when(tpgOpenOfferTitleValue.getString()).thenReturn("Offer Opened");
		Mockito.lenient().when(tpgOpenOfferSubTitleValue.getString()).thenReturn("Didn’t Use Your Coupon Yet");
		Mockito.lenient().when(tpgOpenOfferButtonLabelValue.getString()).thenReturn("Try Again");
		Mockito.lenient().when(tpgOpenOfferAnalyticLabelValue.getString()).thenReturn("TPG Open Offer Analytic Label");
		Mockito.lenient().when(tpgRedeemedOfferTitleValue.getString()).thenReturn("You Saved");
		Mockito.lenient().when(tpgRedeemedOfferSubTitleValue.getString()).thenReturn("On Similac Products");
		Mockito.lenient().when(tpgRedeemedOfferButtonLabelValue.getString()).thenReturn("Try Again");
		Mockito.lenient().when(tpgRedeemedLabelValue.getString()).thenReturn("Offer was redeemed");
		Mockito.lenient().when(tpgRedeemedOfferAnalyticLabelValue.getString()).thenReturn("TPG Redeemed Offer Analytic Label");
	}

	private void retailerListValueMocking() throws RepositoryException {
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty(LABEL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(VALUE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(AVAILABLE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(LINE_ONE)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(LINE_TWO)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(IMAGE_URL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(IMAGE_SM_URL)).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(PAGE_URL)).thenReturn(true);

		Mockito.lenient().when(node.getProperty(LABEL)).thenReturn(labelProperty);
		Mockito.lenient().when(node.getProperty(VALUE)).thenReturn(valueProperty);
		Mockito.lenient().when(node.getProperty(AVAILABLE)).thenReturn(availableProperty);
		Mockito.lenient().when(node.getProperty(LINE_ONE)).thenReturn(lineOneProperty);
		Mockito.lenient().when(node.getProperty(LINE_TWO)).thenReturn(lineTwoProperty);
		Mockito.lenient().when(node.getProperty(IMAGE_URL)).thenReturn(imgUrlProperty);
		Mockito.lenient().when(node.getProperty(IMAGE_SM_URL)).thenReturn(imgSMUrlProperty);
		Mockito.lenient().when(node.getProperty(PAGE_URL)).thenReturn(pageUrlProperty);

		Mockito.lenient().when(labelProperty.getValue()).thenReturn(labelValue);
		Mockito.lenient().when(valueProperty.getValue()).thenReturn(retailerValue);
		Mockito.lenient().when(availableProperty.getValue()).thenReturn(availableValue);
		Mockito.lenient().when(lineOneProperty.getValue()).thenReturn(lineOneValue);
		Mockito.lenient().when(lineTwoProperty.getValue()).thenReturn(lineTwoValue);
		Mockito.lenient().when(imgUrlProperty.getValue()).thenReturn(imgUrlValue);
		Mockito.lenient().when(imgSMUrlProperty.getValue()).thenReturn(imgSMUrlValue);
		Mockito.lenient().when(pageUrlProperty.getValue()).thenReturn(pageUrlValue);

		Mockito.lenient().when(labelValue.getString()).thenReturn("Amazon");
		Mockito.lenient().when(retailerValue.getString()).thenReturn("Amazon");
		Mockito.lenient().when(availableValue.getString()).thenReturn("true");
		Mockito.lenient().when(lineOneValue.getString()).thenReturn("Redeeming at these retailers is currently unavailable");
		Mockito.lenient().when(lineTwoValue.getString()).thenReturn("Please select another option or try again soon");
		Mockito.lenient().when(imgUrlValue.getString()).thenReturn("resources/img/160_160.jpg");
		Mockito.lenient().when(imgSMUrlValue.getString()).thenReturn("resources/img/255_204.png");
		Mockito.lenient().when(pageUrlValue.getString()).thenReturn("www.amazon.com");
	}

}