package com.abbott.aem.an.abbottstore.beans;

/**
 * The Class FeatureProductBean.
 *
 * @author srividya.b
 * The Class FeatureProductBean is bean class used to store product details of feature product.
 */
public class FeatureProductBean {

	
	/** The title. */
	private String title;
	
	/** The price. */
	private String price;
	
	/** The image path. */
	private String imagePath;
	
	/** The product count. */
	private String productCount;
	
	/** The flavour name. */
	private String flavourName;
	
	/** The page path. */
	private String pagePath;

	private String sku;

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	/**
	 * Gets the page path.
	 *
	 * @return the page path
	 */
	public String getPagePath() {
		return pagePath;
	}

	/**
	 * Sets the page path.
	 *
	 * @param pagePath the new page path
	 */
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}

	/** The regular price. */
	private String regularPrice;
	

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Sets the title.
	 *
	 * @param title the new title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * Gets the price.
	 *
	 * @return the price
	 */
	public String getPrice() {
		return price;
	}

	/**
	 * Sets the price.
	 *
	 * @param price the new price
	 */
	public void setPrice(String price) {
		this.price = price;
	}

	/**
	 * Gets the image path.
	 *
	 * @return the image path
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * Sets the image path.
	 *
	 * @param imagePath the new image path
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	/**
	 * Gets the product count.
	 *
	 * @return the product count
	 */
	public String getProductCount() {
		return productCount;
	}

	/**
	 * Sets the product count.
	 *
	 * @param productCount the new product count
	 */
	public void setProductCount(String productCount) {
		this.productCount = productCount;
	}
	
	/**
	 * Gets the flavour name.
	 *
	 * @return the flavour name
	 */
	public String getFlavourName() {
		return flavourName;
	}

	/**
	 * Sets the flavour name.
	 *
	 * @param flavourName the new flavour name
	 */
	public void setFlavourName(String flavourName) {
		this.flavourName = flavourName;
	}
	
	/**
	 * Gets the regular price.
	 *
	 * @return the regular price
	 */
	public String getRegularPrice() {
		return regularPrice;
	}

	/**
	 * Sets the regular price.
	 *
	 * @param regularPrice the new regular price
	 */
	public void setRegularPrice(String regularPrice) {
		this.regularPrice = regularPrice;
	}
	
	
}
