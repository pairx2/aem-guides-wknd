package com.abbott.aem.platform.common.components.models.impl.v1;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

/**
 * The Class SearchFacetItem.
 */
@Model(adaptables = Resource.class,
	   defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class SearchFacetV1Item {

	/**
	 * The title.
	 */
	@Inject
	@Named("title")
	private String title;

	/**
	 * The field name.
	 */
	@Inject
	@Named("fieldName")
	private String fieldName;

	/**
	 * The is multiple.
	 */
	@Inject
	@Named("isMultiSelect")
	private String isMultiple;
	
	/**
	 * The is TruncationEnable.
	 */
	@Inject
	@Named("isTruncationEnable")
	private String isTruncationEnable;
	
	/**
	 * The showText.
	 */
	@Inject
	@Named("showText")
	private String showText;
	
	/**
	 * The hideText.
	 */
	@Inject
	@Named("hideText")
	private String hideText;
	
	/**
	 * The numberOfItemsVisible.
	 */
	@Inject
	@Named("numberOfItemsVisible")
	private Integer numberOfItemsVisible;

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Gets the field name.
	 *
	 * @return the field name
	 */
	public String getFieldName() {
		return fieldName;
	}

	/**
	 * Gets the checks if is multiple.
	 *
	 * @return the checks if is multiple
	 */
	public String getIsMultiple() {
		return isMultiple;
	}
	
	/**
	 * Gets the checks if is TruncationEnable.
	 *
	 * @return the checks if is TruncationEnable
	 */
	public String getIsTruncationEnable() {
		return isTruncationEnable;
	}
	
	/**
	 * Gets the showText.
	 *
	 * @return the showText
	 */
	public String getShowText() {
		return showText;
	}
	
	/**
	 * Gets the hideText.
	 *
	 * @return the hideText
	 */
	public String getHideText() {
		return hideText;
	}
	
	/**
	 * Gets the numberOfItemsVisible.
	 *
	 * @return the numberOfItemsVisible
	 */
	public Integer getNumberOfItemsVisible() {
		return numberOfItemsVisible;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public void setTitle (String title) {
		this.title = title;
	}

	public void setIsTruncationEnable (String isTruncationEnable) {
		this.isTruncationEnable = isTruncationEnable;
	}
	
	public void setIsMultiple (String isMultiple) {
		this.isMultiple = isMultiple;
	}
	
	public void setShowText (String showText) {
		this.showText = showText;
	}
	
	public void setHideText (String hideText) {
		this.hideText = hideText;
	}
	
	public void setNumberOfItemsVisible (Integer numberOfItemsVisible) {
		this.numberOfItemsVisible = numberOfItemsVisible;
	}
}