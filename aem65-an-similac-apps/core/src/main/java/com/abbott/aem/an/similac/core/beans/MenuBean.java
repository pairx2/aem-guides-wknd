package com.abbott.aem.an.similac.core.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MenuBean {

	private String label;

	private String aemURL;

	private String magURL;

	private String cookieKey;

	private String hideInGroup;

	private String dataGtmLabel;

	private String magentoGroupName;

	private String extraPatternCheck;

	@Setter
	@Getter
	private List<MenuBean> children;

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getAemURL() {
		return aemURL;
	}

	public void setAemURL(String aemURL) {
		this.aemURL = aemURL;
	}

	public String getMagURL() {
		return magURL;
	}

	public void setMagURL(String magURL) {
		this.magURL = magURL;
	}

	public String getCookieKey() {
		return cookieKey;
	}

	public void setCookieKey(String cookieKey) {
		this.cookieKey = cookieKey;
	}

	public String getDataGtmLabel() {
		return dataGtmLabel;
	}

	public void setDataGtmLabel(String dataGtmLabel) {
		this.dataGtmLabel = dataGtmLabel;
	}

	public String getHideInGroup() {
		return hideInGroup;
	}

	public void setHideInGroup(String hideInGroup) {
		this.hideInGroup = hideInGroup;
	}

	public String getMagentoGroupName() {
		return magentoGroupName;
	}

	public void setMagentoGroupName(String magentoGroupName) {
		this.magentoGroupName = magentoGroupName;
	}

	public String getExtraPatternCheck() {
		return extraPatternCheck;
	}

	public void setExtraPatternCheck(String extraPatternCheck) {
		this.extraPatternCheck = extraPatternCheck;
	}
}
