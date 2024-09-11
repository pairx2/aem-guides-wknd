package com.abbott.aem.an.similac.core.beans;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.HcpInfo;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.Offer;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.TargetOffer;
import com.abbott.aem.an.similac.core.beans.CurrentOffersBean.Tpg;

@ExtendWith(MockitoExtension.class)
class TestCurrentOfferBean {

	CurrentOffersBean currentOffersBean;

	@Test
	void testPOJO() {
		currentOffersBean = new CurrentOffersBean();
		currentOffersBean.setAmazonOffer(new OfferCouponBean());
		currentOffersBean.setAvailableLabel("avail");
		currentOffersBean.setButtonLabelMarkRedeem("button mark redeem");
		currentOffersBean.setButtonLabelRedeem("button redeem");
		currentOffersBean.setButtonLabelSelectRetailer("button select retailer");
		currentOffersBean.setCouponLogo("coupon logo");
		currentOffersBean.setDataGtmLabel("data GTM");
		currentOffersBean.setDataGtmMarkRedeemed("data GTM mark redeemed");
		currentOffersBean.setDataGtmRedeemOffer("data GTM offer");
		currentOffersBean.setDigitalMessage("digital message");

		HcpInfo hcpInfo = currentOffersBean.new HcpInfo();
		hcpInfo.setErrorText("error text");
		hcpInfo.setOfferText("offer text");
		currentOffersBean.setHcpInfo(hcpInfo);
		currentOffersBean.setMarkAsRedeemed(new MarkRedeemedBean());
		currentOffersBean.setMoreDaysLabel("more days");
		currentOffersBean.setMoreDaysLabelBogo("more days");
		currentOffersBean.setEarnPointsText("(and earn 5 pts)");

		TargetOffer newTargetOffer = currentOffersBean.new TargetOffer();
		newTargetOffer.setHeaderTitle("header title");
		newTargetOffer.setExpiryTitle("expiry title");
		newTargetOffer.setTitle("title");
		newTargetOffer.setTitle1("title1");
		newTargetOffer.setSubTitle("sub title");
		newTargetOffer.setSubTitle1("sub title1");
		newTargetOffer.setSubTitle2("sub title2");
		newTargetOffer.setSubTitle3("sub title3");
		newTargetOffer.setOfferCriteria("offer criteria");
		newTargetOffer.setOfferCriteriaOnline("offer criteria online");
		newTargetOffer.setOfferCriteriaStore("offer criteria store");
		newTargetOffer.setOfferDescription1("offer description1");
		newTargetOffer.setOfferDescription2("offer description2");
		newTargetOffer.setButtonLabelRedeem("button redeem");
		newTargetOffer.setButtonLabelMarkRedeem("button mark redeem");
		newTargetOffer.setButtonLabelOnline("button online");
		newTargetOffer.setButtonLabelStore("button store");
		newTargetOffer.setPromoCodeTitle("promo code title");
		newTargetOffer.setOpenedOfferTitle("opened offer title");
		newTargetOffer.setOpenedOfferInfo("opened offer info");
		newTargetOffer.setPromoURL("promo url");
		newTargetOffer.setDataGtmLabel("data gtm");
		newTargetOffer.setDataGtmLabelOnline("data gtm online");
		newTargetOffer.setDataGtmLabelStore("data gtm store");
		newTargetOffer.setImgUrl("img url");
		newTargetOffer.setImgSMUrl("imgs url");
		newTargetOffer.setPageUrl("page url");
		newTargetOffer.setShowOfferValue(true);
		currentOffersBean.setNewOfferTarget(newTargetOffer);
		currentOffersBean.setOfferAvailableLabel("offer available");

		Offer offerItem = currentOffersBean.new Offer();
		offerItem.setButtonLabel("button");
		offerItem.setDataGtmLabel("data GTM");
		offerItem.setDescription("desc");
		offerItem.setHref("href");
		offerItem.setImgUrl("Img URL");
		offerItem.setTitle("title");
		
		List<Offer> offersList = new ArrayList<CurrentOffersBean.Offer>();
		offersList.add(offerItem);
		currentOffersBean.setOfferList(offersList);
		currentOffersBean.setOffersLabel("offer");
		currentOffersBean.setOpenOfferTarget(currentOffersBean.new TargetOffer());
		currentOffersBean.setPaperMessage("paper msg");
		currentOffersBean.setRedeemedOfferTarget(currentOffersBean.new TargetOffer());
		currentOffersBean.setRedeemExpireOfferMessage("redeem expire offer msg");
		currentOffersBean.setRedeemOfferMessage("redeem offer msg");
		currentOffersBean.setRetailerAlreadySelected("retailer already selected");
		currentOffersBean.setRetailerPageURL("retailer page URL");
		currentOffersBean.setRetailerCouponPageURL("retailer coupon page URL");
		currentOffersBean.setSaveFiveImgUrl("save five Img URL");
		currentOffersBean.setSaveTenImgUrl("save ten ImgURL");
		currentOffersBean.setGgImgUrl("GG ImgURL");
		currentOffersBean.setSelectRetailerNote("select retailer note");
		currentOffersBean.setShippingLabel("shipping");
		currentOffersBean.setShippingLink("shipping link");
		currentOffersBean.setTargetCouponTitle("target Coupon URL");
		currentOffersBean.setTargetImgUrl("target Img URL");
		currentOffersBean.setThanksDigitalLabel("thanks digital");
		currentOffersBean.setThanksLabel("thanks");
		currentOffersBean.setTitle("title");
		currentOffersBean.setTitleExpire("title expire");
		currentOffersBean.setTpgImgUrl("tpg Img URL");

		Tpg element = currentOffersBean.new Tpg();
		element.setImgSMUrl("Img SM URL");
		element.setImgUrl("Img URL");
		element.setNewOffer(new OfferCouponBean().new Coupon());
		element.setOfferDisclaimer("offer disclaimer");
		element.setOfferType("offer type");
		element.setOpenOffer(new OfferCouponBean().new Coupon());
		element.setPageUrl("page URL");
		element.setRedeemedOffer(new OfferCouponBean().new Coupon());
		element.setShowOfferValue(true);
		element.setSubTitle("subtitle");
		element.setTitle("title");
		element.setTpgOfferImage("tpg Offer Image");
		
		List<Tpg> tpgOffersList = new ArrayList<Tpg>();
		tpgOffersList.add(element);
		currentOffersBean.setTpgOffers(tpgOffersList);
		currentOffersBean.setUnassignedOffer(new OfferCouponBean());

		assertNotNull(currentOffersBean.getAmazonOffer());
		assertEquals("avail", currentOffersBean.getAvailableLabel());
		assertEquals("button mark redeem", currentOffersBean.getButtonLabelMarkRedeem());
		assertEquals("button redeem", currentOffersBean.getButtonLabelRedeem());
		assertEquals("button select retailer", currentOffersBean.getButtonLabelSelectRetailer());
		assertEquals("coupon logo", currentOffersBean.getCouponLogo());
		assertEquals("data GTM", currentOffersBean.getDataGtmLabel());
		assertEquals("data GTM mark redeemed", currentOffersBean.getDataGtmMarkRedeemed());
		assertEquals("data GTM offer", currentOffersBean.getDataGtmRedeemOffer());
		assertEquals("digital message", currentOffersBean.getDigitalMessage());
		assertEquals("error text", currentOffersBean.getHcpInfo().getErrorText());
		assertEquals("offer text", currentOffersBean.getHcpInfo().getOfferText());
		assertNotNull(currentOffersBean.getMarkAsRedeemed());
		assertEquals("more days", currentOffersBean.getMoreDaysLabel());
		assertEquals("more days", currentOffersBean.getMoreDaysLabelBogo());
		assertEquals("(and earn 5 pts)", currentOffersBean.getEarnPointsText());
		assertEquals("header title", currentOffersBean.getNewOfferTarget().getHeaderTitle());
		assertEquals("expiry title", currentOffersBean.getNewOfferTarget().getExpiryTitle());
		assertEquals("title", currentOffersBean.getNewOfferTarget().getTitle());
		assertEquals("title1", currentOffersBean.getNewOfferTarget().getTitle1());
		assertEquals("sub title", currentOffersBean.getNewOfferTarget().getSubTitle());
		assertEquals("sub title1", currentOffersBean.getNewOfferTarget().getSubTitle1());
		assertEquals("sub title2", currentOffersBean.getNewOfferTarget().getSubTitle2());
		assertEquals("sub title3", currentOffersBean.getNewOfferTarget().getSubTitle3());
		assertEquals("offer criteria", currentOffersBean.getNewOfferTarget().getOfferCriteria());
		assertEquals("offer criteria online", currentOffersBean.getNewOfferTarget().getOfferCriteriaOnline());
		assertEquals("offer criteria store", currentOffersBean.getNewOfferTarget().getOfferCriteriaStore());
		assertEquals("offer description1", currentOffersBean.getNewOfferTarget().getOfferDescription1());
		assertEquals("offer description2", currentOffersBean.getNewOfferTarget().getOfferDescription2());
		assertEquals("button redeem", currentOffersBean.getNewOfferTarget().getButtonLabelRedeem());
		assertEquals("button mark redeem", currentOffersBean.getNewOfferTarget().getButtonLabelMarkRedeem());
		assertEquals("button online", currentOffersBean.getNewOfferTarget().getButtonLabelOnline());
		assertEquals("button store", currentOffersBean.getNewOfferTarget().getButtonLabelStore());
		assertEquals("promo code title", currentOffersBean.getNewOfferTarget().getPromoCodeTitle());
		assertEquals("opened offer title", currentOffersBean.getNewOfferTarget().getOpenedOfferTitle());
		assertEquals("opened offer info", currentOffersBean.getNewOfferTarget().getOpenedOfferInfo());
		assertEquals("promo url", currentOffersBean.getNewOfferTarget().getPromoURL());
		assertEquals("data gtm", currentOffersBean.getNewOfferTarget().getDataGtmLabel());
		assertEquals("data gtm online", currentOffersBean.getNewOfferTarget().getDataGtmLabelOnline());
		assertEquals("data gtm store", currentOffersBean.getNewOfferTarget().getDataGtmLabelStore());
		assertEquals("img url", currentOffersBean.getNewOfferTarget().getImgUrl());
		assertEquals("imgs url", currentOffersBean.getNewOfferTarget().getImgSMUrl());
		assertEquals("page url", currentOffersBean.getNewOfferTarget().getPageUrl());
		assertEquals(true, currentOffersBean.getNewOfferTarget().isShowOfferValue());
		assertEquals("offer available", currentOffersBean.getOfferAvailableLabel());
		assertEquals("button", currentOffersBean.getOfferList().get(0).getButtonLabel());
		assertEquals("data GTM", currentOffersBean.getOfferList().get(0).getDataGtmLabel());
		assertEquals("desc", currentOffersBean.getOfferList().get(0).getDescription());
		assertEquals("href", currentOffersBean.getOfferList().get(0).getHref());
		assertEquals("Img URL", currentOffersBean.getOfferList().get(0).getImgUrl());
		assertEquals("title", currentOffersBean.getOfferList().get(0).getTitle());
		assertEquals("offer", currentOffersBean.getOffersLabel());
		assertNotNull(currentOffersBean.getOpenOfferTarget());
		assertEquals("paper msg", currentOffersBean.getPaperMessage());
		assertNotNull(currentOffersBean.getRedeemedOfferTarget());
		assertEquals("redeem expire offer msg", currentOffersBean.getRedeemExpireOfferMessage());
		assertEquals("redeem offer msg", currentOffersBean.getRedeemOfferMessage());
		assertEquals("retailer already selected", currentOffersBean.getRetailerAlreadySelected());
		assertEquals("retailer page URL", currentOffersBean.getRetailerPageURL());
		assertEquals("retailer coupon page URL", currentOffersBean.getRetailerCouponPageURL());
		assertEquals("save five Img URL", currentOffersBean.getSaveFiveImgUrl());
		assertEquals("save ten ImgURL", currentOffersBean.getSaveTenImgUrl());
		assertEquals("GG ImgURL", currentOffersBean.getGgImgUrl());
		assertEquals("select retailer note", currentOffersBean.getSelectRetailerNote());
		assertEquals("shipping", currentOffersBean.getShippingLabel());
		assertEquals("shipping link", currentOffersBean.getShippingLink());
		assertEquals("target Coupon URL", currentOffersBean.getTargetCouponTitle());
		assertEquals("target Img URL", currentOffersBean.getTargetImgUrl());
		assertEquals("thanks digital", currentOffersBean.getThanksDigitalLabel());
		assertEquals("thanks", currentOffersBean.getThanksLabel());
		assertEquals("title", currentOffersBean.getTitle());
		assertEquals("title expire", currentOffersBean.getTitleExpire());
		assertEquals("tpg Img URL", currentOffersBean.getTpgImgUrl());
		assertEquals("Img SM URL", currentOffersBean.getTpgOffers().get(0).getImgSMUrl());
		assertEquals("Img URL", currentOffersBean.getTpgOffers().get(0).getImgUrl());
		assertNotNull(currentOffersBean.getTpgOffers().get(0).getNewOffer());
		assertEquals("offer disclaimer", currentOffersBean.getTpgOffers().get(0).getOfferDisclaimer());
		assertEquals("offer type", currentOffersBean.getTpgOffers().get(0).getOfferType());
		assertNotNull(currentOffersBean.getTpgOffers().get(0).getOpenOffer());
		assertEquals("page URL", currentOffersBean.getTpgOffers().get(0).getPageUrl());
		assertNotNull(currentOffersBean.getTpgOffers().get(0).getRedeemedOffer());
		assertEquals(true, currentOffersBean.getTpgOffers().get(0).getShowOfferValue());
		assertEquals("subtitle", currentOffersBean.getTpgOffers().get(0).getSubTitle());
		assertEquals("title", currentOffersBean.getTpgOffers().get(0).getTitle());
		assertEquals("tpg Offer Image", currentOffersBean.getTpgOffers().get(0).getTpgOfferImage());
		assertNotNull(currentOffersBean.getUnassignedOffer());
	}
}
