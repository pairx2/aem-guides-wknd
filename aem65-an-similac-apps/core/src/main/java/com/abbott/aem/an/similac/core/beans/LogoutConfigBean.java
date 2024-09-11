package com.abbott.aem.an.similac.core.beans;

public class LogoutConfigBean {

	private String logoutURL;

	private String renewURL;

	private String idleTimeout;

	private String logoutPopupDuration;

	private String autoRenewal;

	private LogoutPopupLabel logoutPopupLabel;

	public String getLogoutURL() {
		return logoutURL;
	}

	public void setLogoutURL(String logoutURL) {
		this.logoutURL = logoutURL;
	}

	public String getRenewURL() {
		return renewURL;
	}

	public void setRenewURL(String renewURL) {
		this.renewURL = renewURL;
	}

	public String getIdleTimeout() {
		return idleTimeout;
	}

	public void setIdleTimeout(String idleTimeout) {
		this.idleTimeout = idleTimeout;
	}

	public String getLogoutPopupDuration() {
		return logoutPopupDuration;
	}

	public void setLogoutPopupDuration(String logoutPopupDuration) {
		this.logoutPopupDuration = logoutPopupDuration;
	}

	public String getAutoRenewal() {
		return autoRenewal;
	}

	public void setAutoRenewal(String autoRenewal) {
		this.autoRenewal = autoRenewal;
	}

	public LogoutPopupLabel getLogoutPopupLabel() {
		return logoutPopupLabel;
	}

	public void setLogoutPopupLabel(LogoutPopupLabel logoutPopupLabel) {
		this.logoutPopupLabel = logoutPopupLabel;
	}

	/**
	 * Inner class to populate Logout Popup Label
	 * 
	 * @author Cognizant
	 *
	 */
	public class LogoutPopupLabel {

		private String heading;
		private String desc;
		private String confirm;
		private String cancel;

		public String getHeading() {
			return heading;
		}

		public void setHeading(String heading) {
			this.heading = heading;
		}

		public String getDesc() {
			return desc;
		}

		public void setDesc(String desc) {
			this.desc = desc;
		}

		public String getConfirm() {
			return confirm;
		}

		public void setConfirm(String confirm) {
			this.confirm = confirm;
		}

		public String getCancel() {
			return cancel;
		}

		public void setCancel(String cancel) {
			this.cancel = cancel;
		}

	}

}
