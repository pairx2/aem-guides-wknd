package com.abbott.aem.an.similac.core.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

public class FormComponentBean {

	private String id;
	private String categoryType;
	private String label;
	private String onFocusLabel;
	private String name;
	private String type;
	private String maxLength;
	private String autocomplete;
	private String imagePath;
	private String placeholder;
	private String btnClassName;
	private String href;
	private String primary;
	private String inlineBtn;
	private String tagName;
	private String initValue;
	private String value;
	private String refrenceName;
	private String validateONValue;
	private String displayLabelFormat;
	private String valueFormat;
	private String fieldType;
	private String row;
	private String disabled;
	private String mappedField;
	private String passIn;
	private String html;
	private String gaDetails;
	private String className;
	private String fieldLoader;
	private String dataGtmLabel;
	private String errorUpdateProfile;
	private String errorUpdateProfileNonDOUser;

	private HelpInformation help;
	private APIDetails fetchApi;
	private RenderOnDetails renderOn;
	private PasswordStrength passwordStrength;

	@Setter
	@Getter
	private List<Map<String, String>> validations;

	@Setter
	@Getter
	private List<Map<String, String>> sourceValue;
	// For Captcha
	private String size;
	private String theme;
	private String render;
	private String sitekey;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOnFocusLabel() {
		return onFocusLabel;
	}

	public void setOnFocusLabel(String onFocusLabel) {
		this.onFocusLabel = onFocusLabel;
	}

	public String getGaDetails() {
		return gaDetails;
	}

	public void setGaDetails(String gaDetails) {
		this.gaDetails = gaDetails;
	}

	public String getDataGtmLabel() {
		return dataGtmLabel;
	}

	public void setDataGtmLabel(String dataGtmLabel) {
		this.dataGtmLabel = dataGtmLabel;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public String getRender() {
		return render;
	}

	public void setRender(String render) {
		this.render = render;
	}

	public String getSitekey() {
		return sitekey;
	}

	public void setSitekey(String sitekey) {
		this.sitekey = sitekey;
	}

	public String getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getName() {
		return name;
	}

	public String getMaxLength() {
		return maxLength;
	}

	public void setMaxLength(String maxLength) {
		this.maxLength = maxLength;
	}

	public String getAutocomplete() {
		return autocomplete;
	}

	public void setAutocomplete(String autocomplete) {
		this.autocomplete = autocomplete;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getPlaceholder() {
		return placeholder;
	}

	public void setPlaceholder(String placeholder) {
		this.placeholder = placeholder;
	}

	public String getBtnClassName() {
		return btnClassName;
	}

	public void setBtnClassName(String btnClassName) {
		this.btnClassName = btnClassName;
	}

	public String getMappedField() {
		return mappedField;
	}

	public void setMappedField(String mappedField) {
		this.mappedField = mappedField;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public String getInitValue() {
		return initValue;
	}

	public void setInitValue(String initValue) {
		this.initValue = initValue;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getRefrenceName() {
		return refrenceName;
	}

	public void setRefrenceName(String refrenceName) {
		this.refrenceName = refrenceName;
	}

	public String getValidateONValue() {
		return validateONValue;
	}

	public void setValidateONValue(String validateONValue) {
		this.validateONValue = validateONValue;
	}

	public String getDisplayLabelFormat() {
		return displayLabelFormat;
	}

	public void setDisplayLabelFormat(String displayLabelFormat) {
		this.displayLabelFormat = displayLabelFormat;
	}

	public String getValueFormat() {
		return valueFormat;
	}

	public void setValueFormat(String valueFormat) {
		this.valueFormat = valueFormat;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public String getRow() {
		return row;
	}

	public void setRow(String row) {
		this.row = row;
	}

	public String getDisabled() {
		return disabled;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public RenderOnDetails getRenderOn() {
		return renderOn;
	}

	public void setRenderOn(RenderOnDetails renderOn) {
		this.renderOn = renderOn;
	}

	public String getFieldLoader() {
		return fieldLoader;
	}

	public void setFieldLoader(String fieldLoader) {
		this.fieldLoader = fieldLoader;
	}

	public HelpInformation getHelp() {
		return help;
	}

	public void setHelp(HelpInformation help) {
		this.help = help;
	}

	public APIDetails getFetchApi() {
		return fetchApi;
	}

	public void setFetchApi(APIDetails fetchApi) {
		this.fetchApi = fetchApi;
	}

	public PasswordStrength getPasswordStrength() {
		return passwordStrength;
	}

	public void setPasswordStrength(PasswordStrength passwordStrength) {
		this.passwordStrength = passwordStrength;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getPrimary() {
		return primary;
	}

	public void setPrimary(String primary) {
		this.primary = primary;
	}

	public String getInlineBtn() {
		return inlineBtn;
	}

	public void setInlineBtn(String inlineBtn) {
		this.inlineBtn = inlineBtn;
	}

	public String getPassIn() {
		return passIn;
	}

	public void setPassIn(String passIn) {
		this.passIn = passIn;
	}

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getErrorUpdateProfile() {
		return errorUpdateProfile;
	}

	public void setErrorUpdateProfile(String errorUpdateProfile) {
		this.errorUpdateProfile = errorUpdateProfile;
	}

	public String getErrorUpdateProfileNonDOUser() {
		return errorUpdateProfileNonDOUser;
	}

	public void setErrorUpdateProfileNonDOUser(String errorUpdateProfileNonDOUser) {
		this.errorUpdateProfileNonDOUser = errorUpdateProfileNonDOUser;
	}

	/**
	 * Inner class to populate Help details
	 * 
	 * @author Cognizant
	 *
	 */
	public class HelpInformation {

		private String icon;
		private String content;
		private String backgroundColor;
		private String color;
		private String tooltipImageD;
		private String tooltipImageM;
		private String direction;
		private RenderOnDetails renderOn;

		public RenderOnDetails getRenderOn() {
			return renderOn;
		}

		public void setRenderOn(RenderOnDetails renderOn) {
			this.renderOn = renderOn;
		}

		public String getIcon() {
			return icon;
		}

		public void setIcon(String icon) {
			this.icon = icon;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getTooltipImageD() {
			return tooltipImageD;
		}

		public void setTooltipImageD(String tooltipImageD) {
			this.tooltipImageD = tooltipImageD;
		}

		public String getTooltipImageM() {
			return tooltipImageM;
		}

		public void setTooltipImageM(String tooltipImageM) {
			this.tooltipImageM = tooltipImageM;
		}

		public String getDirection() {
			return direction;
		}

		public void setDirection(String direction) {
			this.direction = direction;
		}

		public String getBackgroundColor() {
			return backgroundColor;
		}

		public void setBackgroundColor(String backgroundColor) {
			this.backgroundColor = backgroundColor;
		}

		public String getColor() {
			return color;
		}

		public void setColor(String color) {
			this.color = color;
		}
	}

	/**
	 * Inner class to populate API details
	 * 
	 * @author Cognizant
	 *
	 */
	public class APIDetails {

		private String url;
		private String method;

		@Setter
		@Getter
		private String[] data;

		@Setter
		@Getter
		private String[] responseKey;

		public String getURL() {
			return url;
		}

		public void setURL(String url) {
			this.url = url;
		}

		public String getMethod() {
			return method;
		}

		public void setMethod(String method) {
			this.method = method;
		}

	}

	public class PasswordStrength {
		private String label;
		private Map<String, Map<String, String>> rules;

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

		public Map<String, Map<String, String>> getRules() {
			return rules;
		}

		public void setRules(Map<String, Map<String, String>> rules) {
			this.rules = rules;
		}

	}

	public class RenderOnDetails {

		private String fieldName;
		private String value;
		private String fieldMapped;
		private String magento;
		private String otp;
		private String ecomOnly;

		public String getEcomOnly() {
			return ecomOnly;
		}

		public void setEcomOnly(String ecomOnly) {
			this.ecomOnly = ecomOnly;
		}

		public String getFieldName() {
			return fieldName;
		}

		public void setFieldName(String fieldName) {
			this.fieldName = fieldName;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getFieldMapped() {
			return fieldMapped;
		}

		public void setFieldMapped(String fieldMapped) {
			this.fieldMapped = fieldMapped;
		}

		public String getMagento() {
			return magento;
		}

		public void setMagento(String magento) {
			this.magento = magento;
		}

		public String getOtp() {
			return otp;
		}

		public void setOtp(String otp) {
			this.otp = otp;
		}
	}
}
