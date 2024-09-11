package com.abbott.aem.an.similac.core.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class LeftNavigationBean {

	private RecentOrder recentOrder;

	private String name;

	private String urlListKey;

	private String hiddenListKey;

	private String mobileOnlyGroupName;

	@Setter
	@Getter
	private List<MenuBean> menuList;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrlListKey() {
		return urlListKey;
	}

	public void setUrlListKey(String urlListKey) {
		this.urlListKey = urlListKey;
	}

	public String getHiddenListKey() {
		return hiddenListKey;
	}

	public void setHiddenListKey(String hiddenListKey) {
		this.hiddenListKey = hiddenListKey;
	}

	public String getMobileOnlyGroupName() {
		return mobileOnlyGroupName;
	}

	public void setMobileOnlyGroupName(String mobileOnlyGroupName) {
		this.mobileOnlyGroupName = mobileOnlyGroupName;
	}

	public RecentOrder getRecentOrder() {
		return recentOrder;
	}

	public void setRecentOrder(RecentOrder recentOrder) {
		this.recentOrder = recentOrder;
	}

	public class RecentOrder {

		private String title;
		private String btn;

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getBtn() {
			return btn;
		}

		public void setBtn(String btn) {
			this.btn = btn;
		}
	}
}
