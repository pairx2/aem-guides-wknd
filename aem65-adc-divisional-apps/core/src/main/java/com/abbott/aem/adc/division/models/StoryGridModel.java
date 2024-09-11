package com.abbott.aem.adc.division.models;

import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model; 

/**
 * 
 * @author shukldx10 This model is used for Patient Stories- Share Your Story
 *         component of Freestyle Application
 *
 */
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class StoryGridModel {

	@Inject
	private String block11Image;

	@Inject
	private String block12Image;

	@Inject
	private String block13Image;

	@Inject
	private String block14Image;

	@Inject
	private String block21Image;

	@Inject
	private String block22Image;

	@Inject
	private String block23Image;

	@Inject
	private String block33Image;

	@Inject
	private String cta14ImageV1;

	@Inject
	private String cta14QuoteV1;

	@Inject
	private String cta14TextV1;

	@Inject
	private String cta14LinkV1;

	@Inject
	private String cta31Image1V1;

	@Inject
	private String cta31QuoteV1;

	@Inject
	private String cta31TextV1;

	@Inject
	private String cta31LinkV1;

	@Inject
	private String cta31Image1V2;

	@Inject
	private String cta31QuoteV2;

	@Inject
	private String cta31TextV2;

	@Inject
	private String cta31LinkV2;

	@Inject
	private String cta31Image1V3;

	@Inject
	private String cta31QuoteV3;

	@Inject
	private String cta31TextV3;

	@Inject
	private String cta31LinkV3;

	@Inject
	private String cta32Image2V1;

	@Inject
	private String cta32QuoteV1;

	@Inject
	private String cta32TextV1;

	@Inject
	private String cta32LinkV1;

	@Inject
	private String cta32Image2V2;

	@Inject
	private String cta32QuoteV2;

	@Inject
	private String cta32TextV2;

	@Inject
	private String cta32LinkV2;

	@Inject
	private String header;

	@Inject
	private String description;

	@Inject
	private String storyType;

	@Inject
	private String storyTopic;

	@Inject
	private String productType;

	@Inject
	private String ageRange;

	@Inject
	private String seeMoreText;

	@Inject
	private String leftArrowImage;
	
	public String getLeftArrowImage() {
		return leftArrowImage;
	}

	public void setLeftArrowImage(String leftArrowImage) {
		this.leftArrowImage = leftArrowImage;
	}

	public String getRightArrowImage() {
		return rightArrowImage;
	}

	public void setRightArrowImage(String rightArrowImage) {
		this.rightArrowImage = rightArrowImage;
	}

	public String getStoryPopupAgeRange() {
		return storyPopupAgeRange;
	}

	public void setStoryPopupAgeRange(String storyPopupAgeRange) {
		this.storyPopupAgeRange = storyPopupAgeRange;
	}

	public String getStoryPopupProductType() {
		return storyPopupProductType;
	}

	public void setStoryPopupProductType(String storyPopupProductType) {
		this.storyPopupProductType = storyPopupProductType;
	}

	public String getDisclaimer() {
		return disclaimer;
	}

	public void setDisclaimer(String disclaimer) {
		this.disclaimer = disclaimer;
	}

	public String getStoryPopupShareStoryText() {
		return storyPopupShareStoryText;
	}

	public void setStoryPopupShareStoryText(String storyPopupShareStoryText) {
		this.storyPopupShareStoryText = storyPopupShareStoryText;
	}

	public String getStoryPopupStoryType() {
		return storyPopupStoryType;
	}

	public void setStoryPopupStoryType(String storyPopupStoryType) {
		this.storyPopupStoryType = storyPopupStoryType;
	}

	public String getStoryPopuStoryTopic() {
		return storyPopuStoryTopic;
	}

	public void setStoryPopuStoryTopic(String storyPopuStoryTopic) {
		this.storyPopuStoryTopic = storyPopuStoryTopic;
	}

	public String getFbShareLabel() {
		return fbShareLabel;
	}

	public void setFbShareLabel(String fbShareLabel) {
		this.fbShareLabel = fbShareLabel;
	}

	public String getTwitterShareLabel() {
		return twitterShareLabel;
	}

	public void setTwitterShareLabel(String twitterShareLabel) {
		this.twitterShareLabel = twitterShareLabel;
	}

	public String getLearnMore() {
		return learnMore;
	}

	public void setLearnMore(String learnMore) {
		this.learnMore = learnMore;
	}

	public String getTargetLink() {
		return targetLink;
	}

	public void setTargetLink(String targetLink) {
		this.targetLink = targetLink;
	}

	@Inject
	private String rightArrowImage;
	
	@Inject
	private String storyPopupAgeRange;
	
	@Inject
	private String storyPopupProductType;
	
	@Inject
	private String disclaimer;
	
	@Inject
	private String storyPopupShareStoryText;
	
	@Inject
	private String storyPopupStoryType;
	
	@Inject
	private String storyPopuStoryTopic;
	
	@Inject
	private String fbShareLabel;
	
	@Inject
	private String twitterShareLabel;
	
	@Inject
	private String learnMore;
	
	@Inject
	private String targetLink;
	
	/**
	 * @return the block11Image
	 */
	public String getBlock11Image() {
		return block11Image;
	}

	/**
	 * @return the block12Image
	 */
	public String getBlock12Image() {
		return block12Image;
	}

	/**
	 * @return the block13Image
	 */
	public String getBlock13Image() {
		return block13Image;
	}

	/**
	 * @return the block14Image
	 */
	public String getBlock14Image() {
		return block14Image;
	}

	/**
	 * @return the block21Image
	 */
	public String getBlock21Image() {
		return block21Image;
	}

	/**
	 * @return the block22Image
	 */
	public String getBlock22Image() {
		return block22Image;
	}

	/**
	 * @return the block23Image
	 */
	public String getBlock23Image() {
		return block23Image;
	}

	/**
	 * @return the block33Image
	 */
	public String getBlock33Image() {
		return block33Image;
	}

	/**
	 * @return the cta14ImageV1
	 */
	public String getCta14ImageV1() {
		return cta14ImageV1;
	}

	/**
	 * @return the cta14QuoteV1
	 */
	public String getCta14QuoteV1() {
		return cta14QuoteV1;
	}

	/**
	 * @return the cta14TextV1
	 */
	public String getCta14TextV1() {
		return cta14TextV1;
	}

	/**
	 * @return the cta14LinkV1
	 */
	public String getCta14LinkV1() {
		return cta14LinkV1;
	}

	/**
	 * @return the cta31Image1V1
	 */
	public String getCta31Image1V1() {
		return cta31Image1V1;
	}

	/**
	 * @return the cta31QuoteV1
	 */
	public String getCta31QuoteV1() {
		return cta31QuoteV1;
	}

	/**
	 * @return the cta31TextV1
	 */
	public String getCta31TextV1() {
		return cta31TextV1;
	}

	/**
	 * @return the cta31LinkV1
	 */
	public String getCta31LinkV1() {
		return cta31LinkV1;
	}

	/**
	 * @return the cta31Image1V2
	 */
	public String getCta31Image1V2() {
		return cta31Image1V2;
	}

	/**
	 * @return the cta31QuoteV2
	 */
	public String getCta31QuoteV2() {
		return cta31QuoteV2;
	}

	/**
	 * @return the cta31TextV2
	 */
	public String getCta31TextV2() {
		return cta31TextV2;
	}

	/**
	 * @return the cta31LinkV2
	 */
	public String getCta31LinkV2() {
		return cta31LinkV2;
	}

	/**
	 * @return the cta31Image1V3
	 */
	public String getCta31Image1V3() {
		return cta31Image1V3;
	}

	/**
	 * @return the cta31QuoteV3
	 */
	public String getCta31QuoteV3() {
		return cta31QuoteV3;
	}

	/**
	 * @return the cta31TextV3
	 */
	public String getCta31TextV3() {
		return cta31TextV3;
	}

	/**
	 * @return the cta31LinkV3
	 */
	public String getCta31LinkV3() {
		return cta31LinkV3;
	}

	/**
	 * @return the cta32Image2V1
	 */
	public String getCta32Image2V1() {
		return cta32Image2V1;
	}

	/**
	 * @return the cta32QuoteV1
	 */
	public String getCta32QuoteV1() {
		return cta32QuoteV1;
	}

	/**
	 * @return the cta32TextV1
	 */
	public String getCta32TextV1() {
		return cta32TextV1;
	}

	/**
	 * @return the cta32LinkV1
	 */
	public String getCta32LinkV1() {
		return cta32LinkV1;
	}

	/**
	 * @return the cta32Image2V2
	 */
	public String getCta32Image2V2() {
		return cta32Image2V2;
	}

	/**
	 * @return the cta32QuoteV2
	 */
	public String getCta32QuoteV2() {
		return cta32QuoteV2;
	}

	/**
	 * @return the cta32TextV2
	 */
	public String getCta32TextV2() {
		return cta32TextV2;
	}

	/**
	 * @return the cta32LinkV2
	 */
	public String getCta32LinkV2() {
		return cta32LinkV2;
	}

	/**
	 * @return the header
	 */
	public String getHeader() {
		return header;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @return the storyType
	 */
	public String getStoryType() {
		return storyType;
	}

	/**
	 * @return the storyTopic
	 */
	public String getStoryTopic() {
		return storyTopic;
	}

	/**
	 * @return the productType
	 */
	public String getProductType() {
		return productType;
	}

	/**
	 * @return the ageRange
	 */
	public String getAgeRange() {
		return ageRange;
	}

	/**
	 * @return the seeMoreText
	 */
	public String getSeeMoreText() {
		return seeMoreText;
	}

	/**
	 * @param block11Image the block11Image to set
	 */
	public void setBlock11Image(String block11Image) {
		this.block11Image = block11Image;
	}

	/**
	 * @param block12Image the block12Image to set
	 */
	public void setBlock12Image(String block12Image) {
		this.block12Image = block12Image;
	}

	/**
	 * @param block13Image the block13Image to set
	 */
	public void setBlock13Image(String block13Image) {
		this.block13Image = block13Image;
	}

	/**
	 * @param block14Image the block14Image to set
	 */
	public void setBlock14Image(String block14Image) {
		this.block14Image = block14Image;
	}

	/**
	 * @param block21Image the block21Image to set
	 */
	public void setBlock21Image(String block21Image) {
		this.block21Image = block21Image;
	}

	/**
	 * @param block22Image the block22Image to set
	 */
	public void setBlock22Image(String block22Image) {
		this.block22Image = block22Image;
	}

	/**
	 * @param block23Image the block23Image to set
	 */
	public void setBlock23Image(String block23Image) {
		this.block23Image = block23Image;
	}

	/**
	 * @param block33Image the block33Image to set
	 */
	public void setBlock33Image(String block33Image) {
		this.block33Image = block33Image;
	}

	/**
	 * @param cta14ImageV1 the cta14ImageV1 to set
	 */
	public void setCta14ImageV1(String cta14ImageV1) {
		this.cta14ImageV1 = cta14ImageV1;
	}

	/**
	 * @param cta14QuoteV1 the cta14QuoteV1 to set
	 */
	public void setCta14QuoteV1(String cta14QuoteV1) {
		this.cta14QuoteV1 = cta14QuoteV1;
	}

	/**
	 * @param cta14TextV1 the cta14TextV1 to set
	 */
	public void setCta14TextV1(String cta14TextV1) {
		this.cta14TextV1 = cta14TextV1;
	}

	/**
	 * @param cta14LinkV1 the cta14LinkV1 to set
	 */
	public void setCta14LinkV1(String cta14LinkV1) {
		this.cta14LinkV1 = cta14LinkV1;
	}

	/**
	 * @param cta31Image1V1 the cta31Image1V1 to set
	 */
	public void setCta31Image1V1(String cta31Image1V1) {
		this.cta31Image1V1 = cta31Image1V1;
	}

	/**
	 * @param cta31QuoteV1 the cta31QuoteV1 to set
	 */
	public void setCta31QuoteV1(String cta31QuoteV1) {
		this.cta31QuoteV1 = cta31QuoteV1;
	}

	/**
	 * @param cta31TextV1 the cta31TextV1 to set
	 */
	public void setCta31TextV1(String cta31TextV1) {
		this.cta31TextV1 = cta31TextV1;
	}

	/**
	 * @param cta31LinkV1 the cta31LinkV1 to set
	 */
	public void setCta31LinkV1(String cta31LinkV1) {
		this.cta31LinkV1 = cta31LinkV1;
	}

	/**
	 * @param cta31Image1V2 the cta31Image1V2 to set
	 */
	public void setCta31Image1V2(String cta31Image1V2) {
		this.cta31Image1V2 = cta31Image1V2;
	}

	/**
	 * @param cta31QuoteV2 the cta31QuoteV2 to set
	 */
	public void setCta31QuoteV2(String cta31QuoteV2) {
		this.cta31QuoteV2 = cta31QuoteV2;
	}

	/**
	 * @param cta31TextV2 the cta31TextV2 to set
	 */
	public void setCta31TextV2(String cta31TextV2) {
		this.cta31TextV2 = cta31TextV2;
	}

	/**
	 * @param cta31LinkV2 the cta31LinkV2 to set
	 */
	public void setCta31LinkV2(String cta31LinkV2) {
		this.cta31LinkV2 = cta31LinkV2;
	}

	/**
	 * @param cta31Image1V3 the cta31Image1V3 to set
	 */
	public void setCta31Image1V3(String cta31Image1V3) {
		this.cta31Image1V3 = cta31Image1V3;
	}

	/**
	 * @param cta31QuoteV3 the cta31QuoteV3 to set
	 */
	public void setCta31QuoteV3(String cta31QuoteV3) {
		this.cta31QuoteV3 = cta31QuoteV3;
	}

	/**
	 * @param cta31TextV3 the cta31TextV3 to set
	 */
	public void setCta31TextV3(String cta31TextV3) {
		this.cta31TextV3 = cta31TextV3;
	}

	/**
	 * @param cta31LinkV3 the cta31LinkV3 to set
	 */
	public void setCta31LinkV3(String cta31LinkV3) {
		this.cta31LinkV3 = cta31LinkV3;
	}

	/**
	 * @param cta32Image2V1 the cta32Image2V1 to set
	 */
	public void setCta32Image2V1(String cta32Image2V1) {
		this.cta32Image2V1 = cta32Image2V1;
	}

	/**
	 * @param cta32QuoteV1 the cta32QuoteV1 to set
	 */
	public void setCta32QuoteV1(String cta32QuoteV1) {
		this.cta32QuoteV1 = cta32QuoteV1;
	}

	/**
	 * @param cta32TextV1 the cta32TextV1 to set
	 */
	public void setCta32TextV1(String cta32TextV1) {
		this.cta32TextV1 = cta32TextV1;
	}

	/**
	 * @param cta32LinkV1 the cta32LinkV1 to set
	 */
	public void setCta32LinkV1(String cta32LinkV1) {
		this.cta32LinkV1 = cta32LinkV1;
	}

	/**
	 * @param cta32Image2V2 the cta32Image2V2 to set
	 */
	public void setCta32Image2V2(String cta32Image2V2) {
		this.cta32Image2V2 = cta32Image2V2;
	}

	/**
	 * @param cta32QuoteV2 the cta32QuoteV2 to set
	 */
	public void setCta32QuoteV2(String cta32QuoteV2) {
		this.cta32QuoteV2 = cta32QuoteV2;
	}

	/**
	 * @param cta32TextV2 the cta32TextV2 to set
	 */
	public void setCta32TextV2(String cta32TextV2) {
		this.cta32TextV2 = cta32TextV2;
	}

	/**
	 * @param cta32LinkV2 the cta32LinkV2 to set
	 */
	public void setCta32LinkV2(String cta32LinkV2) {
		this.cta32LinkV2 = cta32LinkV2;
	}

	/**
	 * @param header the header to set
	 */
	public void setHeader(String header) {
		this.header = header;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @param storyType the storyType to set
	 */
	public void setStoryType(String storyType) {
		this.storyType = storyType;
	}

	/**
	 * @param storyTopic the storyTopic to set
	 */
	public void setStoryTopic(String storyTopic) {
		this.storyTopic = storyTopic;
	}

	/**
	 * @param productType the productType to set
	 */
	public void setProductType(String productType) {
		this.productType = productType;
	}

	/**
	 * @param ageRange the ageRange to set
	 */
	public void setAgeRange(String ageRange) {
		this.ageRange = ageRange;
	}

	/**
	 * @param seeMoreText the seeMoreText to set
	 */
	public void setSeeMoreText(String seeMoreText) {
		this.seeMoreText = seeMoreText;
	}
}