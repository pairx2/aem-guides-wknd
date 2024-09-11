package com.abbott.aem.an.similac.core.beans;

/**
 * The Class ProductBean.
 */
public class ProductBean {

	/** The name. */
	private String name;

	/** The link. */
	private String link;

	/** The size or weight. */
	private String sizeOrWeight;

	/** The price. */
	private double price;

	/** The Special price. */
	private double specialPrice;

	/** The mobile image. */
	private String mobileImage;

	/** The tablet image. */
	private String tabletImage;

	/** The desktop image. */
	private String desktopImage;

	/** The image. */
	private String image;

	/** The description. */
	private String description;

	/** The meta description. */
	private String metaDescription;

	/** The meta description. */
	private String sku;

	/** The bazaar_voice. */
	private String bazaarVoiceID;

	public String getBazaarVoiceID() {
		return bazaarVoiceID;
	}

	public void setBazaarVoiceID(String bazaarVoiceID) {
		this.bazaarVoiceID = bazaarVoiceID;
	}

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Gets the link.
	 *
	 * @return the link
	 */
	public String getLink() {
		return link;
	}

	/**
	 * Sets the link.
	 *
	 * @param link
	 */
	public void setLink(String link) {
		this.link = link;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the price.
	 *
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}

	/**
	 * Sets the price.
	 *
	 * @param price the new price
	 */
	public void setPrice(double price) {
		this.price = price;
	}

	/**
	 * @return the specialPrice
	 */
	public double getSpecialPrice() {
		return specialPrice;
	}

	/**
	 * @param specialPrice the specialPrice to set
	 */
	public void setSpecialPrice(double specialPrice) {
		this.specialPrice = specialPrice;
	}

	/**
	 * Gets the size or weight.
	 *
	 * @return the size or weight
	 */
	public String getSizeOrWeight() {
		return sizeOrWeight;
	}

	/**
	 * Sets the size or weight.
	 *
	 * @param image the new image
	 */
	public void setSizeOrWeight(String sizeOrWeight) {
		this.sizeOrWeight = sizeOrWeight;
	}

	/**
	 * @return the desktopImage
	 */
	public String getDesktopImage() {
		return desktopImage;
	}

	/**
	 * @param desktopImage the desktopImage to set
	 */
	public void setDesktopImage(String desktopImage) {
		this.desktopImage = desktopImage;
	}

	/**
	 * @return the mobileImage
	 */
	public String getMobileImage() {
		return mobileImage;
	}

	/**
	 * @param mobileImage the mobileImage to set
	 */
	public void setMobileImage(String mobileImage) {
		this.mobileImage = mobileImage;
	}

	/**
	 * @return the tabletImage
	 */
	public String getTabletImage() {
		return tabletImage;
	}

	/**
	 * @param tabletImage the tabletImage to set
	 */
	public void setTabletImage(String tabletImage) {
		this.tabletImage = tabletImage;
	}

	/**
	 * @return the image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * @param image
	 */
	public void setImage(String image) {
		this.image = image;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the metaDescription
	 */
	public String getMetaDescription() {
		return metaDescription;
	}

	/**
	 * @param metaDescription the metaDescription to set
	 */
	public void setMetaDescription(String metaDescription) {
		this.metaDescription = metaDescription;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}
}
