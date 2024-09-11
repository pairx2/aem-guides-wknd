package com.abbott.aem.platform.common.components.pojo;

public class TableButton {

	private String buttonHoverColor;

	private String buttonColor;

	private String textColor;

	private String textHoverColor;

	private boolean contextUnsafeRequired;

	private String title;

	private String url;

	private String target;

	private TableButton() {
	}

	/**
	 * @return String Button Hover Color
	 */
	public String getButtonHoverColor() {
		return buttonHoverColor;
	}

	/**
	 * @return String Button Color
	 */
	public String getButtonColor() {
		return buttonColor;
	}

	/**
	 * @return String Text Color
	 */
	public String getTextColor() {
		return textColor;
	}

	/**
	 * @return String Text Hover Color
	 */
	public String getTextHoverColor() {
		return textHoverColor;
	}

	/**
	 * @return boolean if unsafe context in HTL is required
	 */
	public boolean getContextUnsafeRequired() {
		return contextUnsafeRequired;
	}

	/**
	 * @return String Button Text
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @return String Button URL
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @return String Button URL Target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * @param buttonHoverColor Button Hover Color
	 */
	public void setButtonHoverColor(String buttonHoverColor) {
		this.buttonHoverColor = buttonHoverColor;
	}

	/**
	 * @param buttonColor Button Color
	 */
	public void setButtonColor(String buttonColor) {
		this.buttonColor = buttonColor;
	}

	/**
	 * @param textColor Text Color
	 */
	public void setTextColor(String textColor) {
		this.textColor = textColor;
	}

	/**
	 * @param textHoverColor Text Hover Color
	 */
	public void setTextHoverColor(String textHoverColor) {
		this.textHoverColor = textHoverColor;
	}

	/**
	 * @param contextUnsafeRequired Context Unsafe Required
	 */
	public void setContextUnsafeRequired(boolean contextUnsafeRequired) {
		this.contextUnsafeRequired = contextUnsafeRequired;
	}

	/**
	 * @param title Title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @param url URL
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * @param target Target
	 */
	public void setTarget(String target) {
		this.target = target;
	}

	public static class ButtonBuilder {
		private String buttonHoverColor;
		private String buttonColor;
		private String textColor;
		private String textHoverColor;
		private boolean contextUnsafeRequired;
		private String title;
		private String url;
		private String target;

		private ButtonBuilder() {
		}

		/**
		 * 
		 * @return Button
		 */
		public static ButtonBuilder aButton() {
			return new ButtonBuilder();
		}

		/**
		 * 
		 * @param buttonHoverColor Button Hover Color
		 * @return Button with Hover Color
		 */
		public ButtonBuilder withButtonHoverColor(String buttonHoverColor) {
			this.buttonHoverColor = buttonHoverColor;
			return this;
		}

		/**
		 * 
		 * @param buttonColor Button Color
		 * @return Button with Color
		 */
		public ButtonBuilder withButtonColor(String buttonColor) {
			this.buttonColor = buttonColor;
			return this;
		}

		/**
		 * 
		 * @param textColor Text Color
		 * @return Button with Text Color
		 */
		public ButtonBuilder withTextColor(String textColor) {
			this.textColor = textColor;
			return this;
		}

		/**
		 * 
		 * @param textHoverColor Text Hover Color
		 * @return Button with Text Hover Color
		 */
		public ButtonBuilder withTextHoverColor(String textHoverColor) {
			this.textHoverColor = textHoverColor;
			return this;
		}

		/**
		 * 
		 * @param contextUnsafeRequired Context Unsafe Required
		 * @return If context unsafe is required
		 */
		public ButtonBuilder withContextUnsafeRequired(boolean contextUnsafeRequired) {
			this.contextUnsafeRequired = contextUnsafeRequired;
			return this;
		}

		/**
		 * 
		 * @param title Title
		 * @return Button with title
		 */
		public ButtonBuilder withTitle(String title) {
			this.title = title;
			return this;
		}

		/**
		 * 
		 * @param url URL
		 * @return Button with URL
		 */
		public ButtonBuilder withUrl(String url) {
			this.url = url;
			return this;
		}

		/**
		 * 
		 * @param target Target
		 * @return Button with target
		 */
		public ButtonBuilder withTarget(String target) {
			this.target = target;
			return this;
		}

		/**
		 * 
		 * @return Button
		 */
		public TableButton build() {
			TableButton button = new TableButton();
			button.setButtonHoverColor(buttonHoverColor);
			button.setButtonColor(buttonColor);
			button.setTextColor(textColor);
			button.setTextHoverColor(textHoverColor);
			button.setContextUnsafeRequired(contextUnsafeRequired);
			button.setTitle(title);
			button.setUrl(url);
			button.setTarget(target);
			return button;
		}
	}
}
