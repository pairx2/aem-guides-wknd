package com.abbott.aem.adc.division.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * 
 * @author kommedx This model is used for Patient Stories- Ecard
 *         component of Freestyle Application
 *
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ECard {
	
	@Inject
	private String binLabel;
	
	@Inject
	private String groupLabel;
	
	@Inject
	private String memberidLabel;
	
	@Inject
	private String explabel;

	@Inject
	private String cardSectionText;
	
	@Inject
	private String cardNumber;
	
	@Inject
	private String footnotes;

	@Inject
	private String rightheading;
	
	@Inject
	private String rightSubSection;
	
	@Inject
	private String cardheading;
	
	@Inject
	private String pageTypeName;

	@Inject
	private String logoImage;
	
	@Inject
	private String logoImgAltText;

	
	public String getLogoImage() {
		return logoImage;
	}

	public void setLogoImage(String logoImage) {
		this.logoImage = logoImage;
	}

	public String getLogoImgAltText() {
		return logoImgAltText;
	}

	public void setLogoImgAltText(String logoImgAltText) {
		this.logoImgAltText = logoImgAltText;
	}
	
	public String getPageTypeName() {
		return pageTypeName;
	}

	public void setPageTypeName(String pageTypeName) {
		this.pageTypeName = pageTypeName;
	}

	public String getRightheading() {
		return rightheading;
	}

	public void setRightheading(String rightheading) {
		this.rightheading = rightheading;
	}

	public String getRightSubSection() {
		return rightSubSection;
	}

	public void setRightSubSection(String rightSubSection) {
		this.rightSubSection = rightSubSection;
	}

	public String getCardheading() {
		return cardheading;
	}

	public void setCardheading(String cardheading) {
		this.cardheading = cardheading;
	}
	
	public String getBinLabel() {
		return binLabel;
	}

	public void setBinLabel(String binLabel) {
		this.binLabel = binLabel;
	}

	public String getGroupLabel() {
		return groupLabel;
	}

	public void setGroupLabel(String groupLabel) {
		this.groupLabel = groupLabel;
	}

	public String getMemberidLabel() {
		return memberidLabel;
	}

	public void setMemberidLabel(String memberidLabel) {
		this.memberidLabel = memberidLabel;
	}

	public String getExplabel() {
		return explabel;
	}

	public void setExplabel(String explabel) {
		this.explabel = explabel;
	}
	
	public String getCardSectionText() {
		return cardSectionText;
	}

	public void setCardSectionText(String cardSectionText) {
		this.cardSectionText = cardSectionText;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getFootnotes() {
		return footnotes;
	}

	public void setFootnotes(String footnotes) {
		this.footnotes = footnotes;
	}


}