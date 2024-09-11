package com.abbott.aem.an.similac.core.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

public class ProductComponentBean {
	private String pageName;
	private String categoryId;
	private String filtersLabel;
	private String resultsLabel;
	private String clearAllLabel;
	private String showMoreLabel;
	private String showLessLabel;
	private String addToCartLabel;
	private String findRetailerLabel;
	private String outOfStockLabel;
	private String backOrderLabel;
	private String searchLabel;
	private String searchResultsLabel;
	private String resetLabel;
	private String noResultLabel;
	private String callToOrderLabel;
	private String imgRendition_319;
	private String retailerURL;
	private String learnMoreLabel;
	private String requiredMax;
	private String requiredMin;
	private String returnLabel;
	private String selectLabel;
	private String regularPriceLabel;
	private PopUpInfo popUp;

	private DropDownInfo pageSize;
	private DropDownInfo sortBy;

	@Setter
	@Getter
	private List<String> filters;

	@Setter
	@Getter
	private List<String> excludedPages;
	private String actionPath;

	private DropDownInfo searchFilters;

	public String getActionPath() {
		return actionPath;
	}

	public void setActionPath(String actionPath) {
		this.actionPath = actionPath;
	}

	public DropDownInfo getSearchFilters() {
		return searchFilters;
	}

	public void setSearchFilters(DropDownInfo searchFilters) {
		this.searchFilters = searchFilters;
	}

	public String getRequiredMax() {
		return requiredMax;
	}

	public void setRequiredMax(String requiredMax) {
		this.requiredMax = requiredMax;
	}

	public String getRequiredMin() {
		return requiredMin;
	}

	public void setRequiredMin(String requiredMin) {
		this.requiredMin = requiredMin;
	}

	public String getReturnLabel() {
		return returnLabel;
	}

	public void setReturnLabel(String returnLabel) {
		this.returnLabel = returnLabel;
	}

	public String getSelectLabel() {
		return selectLabel;
	}

	public void setSelectLabel(String selectLabel) {
		this.selectLabel = selectLabel;
	}

	public PopUpInfo getPopUp() {
		return popUp;
	}

	public void setPopUp(PopUpInfo popUp) {
		this.popUp = popUp;
	}

	public String getRetailerURL() {
		return retailerURL;
	}

	public void setRetailerURL(String retailerURL) {
		this.retailerURL = retailerURL;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getFiltersLabel() {
		return filtersLabel;
	}

	public void setFiltersLabel(String filtersLabel) {
		this.filtersLabel = filtersLabel;
	}

	public String getLearnMoreLabel() {
		return learnMoreLabel;
	}

	public void setLearnMoreLabel(String learnMoreLabel) {
		this.learnMoreLabel = learnMoreLabel;
	}

	public String getResultsLabel() {
		return resultsLabel;
	}

	public void setResultsLabel(String resultsLabel) {
		this.resultsLabel = resultsLabel;
	}

	public String getClearAllLabel() {
		return clearAllLabel;
	}

	public void setClearAllLabel(String clearAllLabel) {
		this.clearAllLabel = clearAllLabel;
	}

	public String getImgRendition_319() {
		return imgRendition_319;
	}

	public void setImgRendition_319(String imgRendition_319) {
		this.imgRendition_319 = imgRendition_319;
	}

	public String getShowMoreLabel() {
		return showMoreLabel;
	}

	public void setShowMoreLabel(String showMoreLabel) {
		this.showMoreLabel = showMoreLabel;
	}

	public String getShowLessLabel() {
		return showLessLabel;
	}

	public void setShowLessLabel(String showLessLabel) {
		this.showLessLabel = showLessLabel;
	}

	public String getAddToCartLabel() {
		return addToCartLabel;
	}

	public void setAddToCartLabel(String addToCartLabel) {
		this.addToCartLabel = addToCartLabel;
	}

	public String getFindRetailerLabel() {
		return findRetailerLabel;
	}

	public void setFindRetailerLabel(String findRetailerLabel) {
		this.findRetailerLabel = findRetailerLabel;
	}

	public String getOutOfStockLabel() {
		return outOfStockLabel;
	}

	public void setOutOfStockLabel(String outOfStockLabel) {
		this.outOfStockLabel = outOfStockLabel;
	}

	public String getBackOrderLabel() {
		return backOrderLabel;
	}

	public void setBackOrderLabel(String backOrderLabel) {
		this.backOrderLabel = backOrderLabel;
	}

	public String getSearchLabel() {
		return searchLabel;
	}

	public void setSearchLabel(String searchLabel) {
		this.searchLabel = searchLabel;
	}

	public String getSearchResultsLabel() {
		return searchResultsLabel;
	}

	public void setSearchResultsLabel(String searchResultsLabel) {
		this.searchResultsLabel = searchResultsLabel;
	}

	public String getResetLabel() {
		return resetLabel;
	}

	public void setResetLabel(String resetLabel) {
		this.resetLabel = resetLabel;
	}

	public String getNoResultLabel() {
		return noResultLabel;
	}

	public void setNoResultLabel(String noResultLabel) {
		this.noResultLabel = noResultLabel;
	}

	public DropDownInfo getPageSize() {
		return pageSize;
	}

	public void setPageSize(DropDownInfo pageSize) {
		this.pageSize = pageSize;
	}

	public DropDownInfo getSortBy() {
		return sortBy;
	}

	public void setSortBy(DropDownInfo sortBy) {
		this.sortBy = sortBy;
	}

	public String getCallToOrderLabel() {
		return callToOrderLabel;
	}

	public void setCallToOrderLabel(String callToOrderLabel) {
		this.callToOrderLabel = callToOrderLabel;
	}

	public String getRegularPriceLabel() {
		return regularPriceLabel;
	}

	public void setRegularPriceLabel(String regularPriceLabel) {
		this.regularPriceLabel = regularPriceLabel;
	}

	/**
	 * Inner class to populate size and sort information
	 * 
	 * @author Cognizant + IBM
	 *
	 */
	public class DropDownInfo {
		private String label;
		private String defaultLabel;
		private String defaultValue;
		private String attribute_code;

		@Setter
		@Getter
		private List<DropDownInfo> filterOptions;

		@Setter
		@Getter
		private List<Map<String, String>> filters;

		@Setter
		@Getter
		private List<Map<String, String>> options;

		public String getAttribute_code() {
			return attribute_code;
		}

		public void setAttribute_code(String attribute_code) {
			this.attribute_code = attribute_code;
		}

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public String getDefaultLabel() {
			return defaultLabel;
		}

		public void setDefaultLabel(String defaultLabel) {
			this.defaultLabel = defaultLabel;
		}

		public String getDefaultValue() {
			return defaultValue;
		}

		public void setDefaultValue(String defaultValue) {
			this.defaultValue = defaultValue;
		}
	}

	/**
	 * Inner class to populate pop up information
	 * 
	 * @author Cognizant
	 *
	 */
	public class PopUpInfo {
		private String cancel;
		private String confirm;
		private String title;
		private String eachPrice;
		private String priceHelperText;

		public String getEachPrice() {
			return eachPrice;
		}

		public void setEachPrice(String eachPrice) {
			this.eachPrice = eachPrice;
		}

		public String getPriceHelperText() {
			return priceHelperText;
		}

		public void setPriceHelperText(String priceHelperText) {
			this.priceHelperText = priceHelperText;
		}

		public String getCancel() {
			return cancel;
		}

		public void setCancel(String cancel) {
			this.cancel = cancel;
		}

		public String getConfirm() {
			return confirm;
		}

		public void setConfirm(String confirm) {
			this.confirm = confirm;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}
	}
}
