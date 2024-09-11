package com.abbott.aem.an.similac.core.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.ExporterOption;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.abbott.aem.an.similac.core.beans.FormComponentBean;
import com.abbott.aem.an.similac.core.beans.FormComponentBean.APIDetails;
import com.abbott.aem.an.similac.core.beans.FormComponentBean.HelpInformation;
import com.abbott.aem.an.similac.core.beans.FormComponentBean.PasswordStrength;
import com.abbott.aem.an.similac.core.beans.FormComponentBean.RenderOnDetails;
import com.day.cq.commons.jcr.JcrConstants;

/**
 * FormContainerModel is the SlingModel to hold the details of form components
 * 
 * @author Cognizant IBM
 *
 */
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = "jackson", extensions = "json", options = { @ExporterOption(name = "SerializationFeature.WRITE_DATES_AS_TIMESTAMPS", value = "true") })
public class FormComponentModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(FormComponentModel.class);

	private static final String TEXT_PROPERTY = "text";

	private static final String VALUE_PROPERTY = "value";

	private static final String TRUE = "true";
	
	private static final String FALSE = "false";
	
	private static final String BOOLEAN_FIELD_TYPE = "boolean";

	private static final String LABEL_PROPERTY = "label";

	private static final String VALIDATION_MSG_PROPERTY = "errorMessage";
	
	private static final String VALIDATION_TYPE_PROPERTY = "errorType";
	
	private static final String PATTERN_PROPERTY = "pattern";

	private static final String VALIDATION_TEXT = "validationText";

	private static final String VALIDATION_VALUE = "validationValue";
	
	private static final String VALIDATION_PATTERN = "validationPattern";
	
    private static final String VALIDATION_URL_PROPERTY = "url";
	
	private static final String VALIDATION_URL = "validationUrl";

	private static final String TEXTBOX = "textbox";

	private static final String MIN_ALLOWED_LENGTH = "minAllowedLength";

	private static final String MAX_ALLOWED_LENGTH = "maxAllowedLength";

	private static final String HIDDEN = "hidden";
	
	private static final String CAPTCHA = "captcha";
	
	private static final String GOOGLE_API = "googleApi";

	@SuppressWarnings("squid:S2068")
	private static final String PASSWORD = "password";

	@SuppressWarnings("squid:S2068")
	private static final String PASSWORD_STRENGTH = "passwordstrength";

	private static final String TEXTAREA = "textarea"; 

	private static final String RADIO = "radio";

	@SuppressWarnings("squid:S2068")
	private static final String PWD_STRENGTH_MSG_LABEL = "pwdStrengthMsgLabel";

	@SuppressWarnings("squid:S2068")
	private static final String PWD_STRENGTH_MSG_VALUE = "pwdStrengthMsgValue";
	
	private static final String LABEL = "label";
    
    private static final String VALUE_STR = "value";
    
    private static final String DIVIDER = "divider";
    
    private static final String SUBMIT = "submit";
    
    private static final String RESET = "reset";
    
    private static final String LINK_BUTTON = "linkButton";
	
	private static final String LINK = "link";
	
	private static final String HTML_TAG = "htmltag";

	@ChildResource(name = "items")
	private Resource optionResource;

	@ChildResource(name = "validation")
	private Resource validationResource;
	
	@ChildResource(name = "pwdStrengthrules")
	private Resource pwdRulesResource;

	@ValueMapValue
	@Named(JcrConstants.JCR_TITLE)
	private String title;
	
	@ValueMapValue
	private String onFocusLabel;
	
	@ValueMapValue
	private String id;

	@ValueMapValue
	private String name;
	
	@ValueMapValue
	private String pwdStrengthLabel;

	@ValueMapValue
	private String checkboxImgReq;
	
	@ValueMapValue
	private String checkboxImage;
	
	@ValueMapValue
	private String file;
	
	@ValueMapValue
	private String placeholder;

	@ValueMapValue
	private String tagName;

	@ValueMapValue
	private String btnClassName;
	
	@ValueMapValue
	private String displayLabelFormat;
	
	@ValueMapValue
	private String valueFormat;
	
	@ValueMapValue
	private String categoryType;
	
	@ValueMapValue
	private String type;

	@ValueMapValue
	private String maxLength;
	
	@ValueMapValue
	private String autocomplete;
	
	@ValueMapValue
	private String initValue;
	
	@ValueMapValue
	private String value;

	@ValueMapValue
	private String validateONValue;

	@ValueMapValue
	private String refrenceName;
	
	@ValueMapValue
	private String checkboxRenderOn;
	
	@ValueMapValue
	private String renderOnField;
	
	@ValueMapValue
	private String renderOnValue;
	
	@ValueMapValue
	private String fieldMapped;
	
	@ValueMapValue
	private String magento;
	
	@ValueMapValue
	private String otp;
	
	@ValueMapValue
	private String renderOnFieldHelpInfo;
	
	@ValueMapValue
	private String renderOnValueHelpInfo;
	
	@ValueMapValue
	private String fieldMappedHelpInfo;
	
	@ValueMapValue
	private String magentoHelpInfo;
	
	@ValueMapValue
	private String otpHelpInfo;

	@ValueMapValue
	private String row;

	@ValueMapValue
	private String disabled;
	
	@ValueMapValue
	private String mappedField;
	
	@ValueMapValue
	private String passIn;
	
	@ValueMapValue
	private String gaDetails;
	
	@ValueMapValue
	private String eventCategoryButton;
	
	@ValueMapValue
	private String eventActionButton;
	
	@ValueMapValue
	private String eventLabelButton;
	
	/**** Help Related Mappings ******/
	@ValueMapValue
	private String showHelp;
	
	@ValueMapValue
	private String icon;
	
	@ValueMapValue
	private String content;
	
	@ValueMapValue
	private String tooltipImageD;
	
	@ValueMapValue
	private String tooltipImageM;
	
	@ValueMapValue
	private String direction;
	
	@ValueMapValue
	private String backgroundColor;
	
	@ValueMapValue
	private String color;
	
	/**** API Related Mappings ******/
	@ValueMapValue
	private String apiCallRequired;

	@ValueMapValue
	private String apiUrl;
	
	@ValueMapValue
	private String apiMethod;
	
	@ValueMapValue
	private String[] apiDataValue;
	
	@ValueMapValue
	private String[] apiResponseKeyValue;
	
	@ValueMapValue
	private String href;
	
	@ValueMapValue
	private String primary;
	
	@ValueMapValue
	private String inlineBtn;
	
	@ValueMapValue
	private String rte;
	
	@ValueMapValue
	private String className;
	
	@ValueMapValue
	private String fieldLoader; 
	
    @ValueMapValue
	private String errorUpdateProfile; 
    
    @ValueMapValue
    private String ecomOnly;
    
    @ValueMapValue
    private String ecomOnlyHelpInfo;
    
	@ValueMapValue
	private String errorUpdateProfileNonDOUser;
	
	private FormComponentBean formComponent;

	private List<Map<String, String>> valueList;
	
	private LinkHelperModel linkHelper = new LinkHelperModel();
	
	/**** Captch Fields ******/
	@ValueMapValue private String size;
	
	@ValueMapValue private String theme;
	
	@ValueMapValue private String render;
	
	@ValueMapValue private String sitekey;
		
	@PostConstruct
	private void initMethod() {
		populateComponentObject();
	}

	/**
	 * This method will populate the Form component object
	 */
	public void populateComponentObject() {

		formComponent = new FormComponentBean();
		formComponent.setLabel(title);
		formComponent.setOnFocusLabel(onFocusLabel);
		formComponent.setName(name);
		formComponent.setAutocomplete(autocomplete);
		formComponent.setPlaceholder(placeholder);
		formComponent.setTagName(tagName);
		formComponent.setBtnClassName(btnClassName);
		formComponent.setPrimary(primary);
		formComponent.setInlineBtn(inlineBtn);
		formComponent.setMappedField(mappedField);
		formComponent.setValidateONValue(validateONValue);
		formComponent.setRefrenceName(refrenceName);
		formComponent.setValue(value);
		formComponent.setType(type);
		formComponent.setPassIn(passIn);
		formComponent.setHtml(rte);
		formComponent.setGaDetails(gaDetails);
		
		if (href != null) {
			linkHelper.setLinkHref(href);
			formComponent.setHref(linkHelper.getLinkHref());
		}
		
		formComponent.setInitValue(initValue);

		formComponent.setCategoryType(categoryType);
		formComponent.setDisplayLabelFormat(displayLabelFormat);
		formComponent.setValueFormat(valueFormat);

		if (type != null) {
			testType(formComponent);
		}

		if (disabled != null && disabled.equals(TRUE)) {
			formComponent.setDisabled(TRUE);
		}

		otherSettings();

	}

	/**
	 * Testing the type of the component and assigning values accordingly
	 * 
	 * @param formComponent The Bean object to store the information about this component
	 */
	private void testType(FormComponentBean formComponent) {
		if ((type.equals(SUBMIT) || type.equals(RESET) || type.equals(LINK_BUTTON) || type.equals(LINK)) && eventLabelButton != null) {
			formComponent.setDataGtmLabel(getAnalyticsLabel(eventCategoryButton, eventActionButton, eventLabelButton));
		}

		if (type.equals(TEXTBOX) || type.equals(GOOGLE_API) || type.equals(PASSWORD) || type.equals(PASSWORD_STRENGTH)
				|| type.equals(TEXTAREA)) {
			formComponent.setMaxLength(maxLength);
		} else if (type.equals(CAPTCHA)) {
			formComponent.setSize(size);
			formComponent.setTheme(theme);
			formComponent.setRender(render);
			formComponent.setSitekey(sitekey);
		} else if ((type.equals(HIDDEN) || type.equals(RADIO)) && initValue != null
				&& (initValue.contentEquals(TRUE) || initValue.contentEquals(FALSE))) {
			formComponent.setFieldType(BOOLEAN_FIELD_TYPE);
		} else if (type.equals(DIVIDER)) {
			formComponent.setClassName(className);
		}

		if(type.equals(HTML_TAG) && StringUtils.isNotBlank(className)) {
			formComponent.setClassName(className);
		}

		if (type.equals(TEXTAREA)) {
			formComponent.setRow(row);
		}
	}

	private String getAnalyticsLabel(String eventCategory, String eventAction, String eventLabel) {
		
        return eventCategory.concat("|")+ eventAction + "|" + eventLabel;
	}

	/**
	 * Part 2 of populateComponentObject()
	 */
	private void otherSettings() {
		if (primary != null && primary.equals(TRUE)) {
			formComponent.setPrimary(primary);
		}

		if (inlineBtn != null && inlineBtn.equals(TRUE)) {
			formComponent.setInlineBtn(inlineBtn);
		}

		if (checkboxImgReq != null && checkboxImgReq.equals(TRUE)) {
			formComponent.setImagePath(checkboxImage);
		}
		if (showHelp != null && showHelp.equals(TRUE)) {
			formComponent.setHelp(getHelpInformation());
		}
		if (apiCallRequired != null && apiCallRequired.equals(TRUE)) {
			formComponent.setFetchApi(getApiDetails());
		}
		if (checkboxRenderOn != null && checkboxRenderOn.equals(TRUE)) {
			formComponent.setRenderOn(getRenderOnDetails());
		}

		if (optionResource != null) {
			formComponent.setSourceValue(getResourceValue(optionResource));
		}
		if (validationResource != null) {
			formComponent.setValidations(getResourceValue(validationResource));
		}
		
        moreOtherSettings();
	}
      
      /**
	 * Part 3 of populateComponentObject()
	 */
	private void moreOtherSettings() {
		formComponent.setErrorUpdateProfile(errorUpdateProfile);
		formComponent.setErrorUpdateProfileNonDOUser(errorUpdateProfileNonDOUser);
		if (pwdRulesResource != null) {
			formComponent.setPasswordStrength(getPasswordStrength());
		}
		if (fieldLoader != null && fieldLoader.equals(TRUE)) {
			formComponent.setFieldLoader(TRUE);
		}
		
		if (id != null) {
			formComponent.setId(id);
		}
	}

	/**
	 * This methods will return the list of components validation and option
	 * resource node value
	 * 
	 * @param resource
	 * 
	 * @return resource value as List of Map List<Map<String, String>>
	 */
	public List<Map<String, String>> getResourceValue(Resource resource) {
		
		Node node = resource.adaptTo(Node.class);
		valueList = new ArrayList<>();
		if (node != null) {
			try {
				NodeIterator nodeIterator = node.getNodes();
				while (nodeIterator.hasNext()) {
					populateNodeValue(nodeIterator.nextNode());
				}
			} catch (RepositoryException e) {
				LOGGER.error("RepositoryException in getResourceValue ::",e);
			}
		}
		return Collections.unmodifiableList(valueList);
	}
	
    public Map<String, Map<String,String>> getResourceValueMap(Resource resource) {

		Map<String, Map<String,String>> valueMap = new HashMap<>();
		Node node = resource.adaptTo(Node.class);
		if (node != null) {
			try {
				NodeIterator nodeIterator = node.getNodes();
				while (nodeIterator.hasNext()) {
					Map<String, String> nodeValue = new HashMap<>();
					Node childNode = nodeIterator.nextNode();
					
					if (childNode.hasProperty(PWD_STRENGTH_MSG_LABEL) && childNode.hasProperty(PWD_STRENGTH_MSG_VALUE)) {
						nodeValue.put(LABEL, childNode.getProperty(PWD_STRENGTH_MSG_LABEL).getValue().getString());
						nodeValue.put(VALUE_STR, childNode.getProperty(PWD_STRENGTH_MSG_VALUE).getValue().getString());		
						valueMap.put(childNode.getProperty(PWD_STRENGTH_MSG_VALUE).getValue().getString(), nodeValue);
					} 
				}
			} catch (RepositoryException e) {
				LOGGER.error("RepositoryException in getResourceValueMap :: ",e);
			}
		}
		return valueMap;
	}
    
	private void populateNodeValue(Node childNode) throws RepositoryException {
			Map<String, String> nodeValue = new HashMap<>();
		if (checkProperty(childNode, TEXT_PROPERTY, VALUE_PROPERTY)) {
			nodeValue.put(LABEL_PROPERTY, childNode.getProperty(TEXT_PROPERTY).getValue().getString());
			String sourceValue = childNode.getProperty(VALUE_PROPERTY).getValue().getString();
			if( sourceValue.contentEquals(TRUE) || sourceValue.contentEquals(FALSE)) {
				formComponent.setFieldType(BOOLEAN_FIELD_TYPE);
			}
			nodeValue.put(VALUE_PROPERTY, sourceValue);
			valueList.add(nodeValue);
		
		} else if (checkProperty(childNode, VALIDATION_TEXT, VALIDATION_VALUE)) {
			nodeValue.put(VALIDATION_TYPE_PROPERTY, childNode.getProperty(VALIDATION_TEXT).getValue().getString());
			nodeValue.put(VALIDATION_MSG_PROPERTY, childNode.getProperty(VALIDATION_VALUE).getValue().getString());
			if(StringUtils.isNotBlank(getPropertyValue(childNode, MIN_ALLOWED_LENGTH))) {
				nodeValue.put(MIN_ALLOWED_LENGTH, getPropertyValue(childNode, MIN_ALLOWED_LENGTH));
			}
			if(StringUtils.isNotBlank(getPropertyValue(childNode, MAX_ALLOWED_LENGTH))) {
				nodeValue.put(MAX_ALLOWED_LENGTH, getPropertyValue(childNode, MAX_ALLOWED_LENGTH));
			}
			if(StringUtils.isNotBlank(getPropertyValue(childNode, VALIDATION_PATTERN))) {
				nodeValue.put(PATTERN_PROPERTY, getPropertyValue(childNode, VALIDATION_PATTERN));
			}
			if(StringUtils.isNotBlank(getPropertyValue(childNode, VALIDATION_URL))) {
				nodeValue.put(VALIDATION_URL_PROPERTY, getPropertyValue(childNode, VALIDATION_URL));
			}
			valueList.add(nodeValue);
			
		}
	}

	private String getPropertyValue(Node childNode, String propertyName) throws RepositoryException {
		return childNode.hasProperty(propertyName) ? childNode.getProperty(propertyName).getValue().getString() : "";
	}

	/**
	 * Validate the property which is present in node or not
	 * 
	 * @param childNode
	 * @param propertyOne
	 * @param propertyTwo
	 * @return 
	 * @throws RepositoryException
	 */
	private boolean checkProperty(Node childNode, String propertyOne, String propertyTwo) throws RepositoryException {
		return childNode.hasProperty(propertyOne) && childNode.hasProperty(propertyTwo);
	}

	/**
	 * Populates the API details
	 * 
	 * @return APIDetails
	 */
	private APIDetails getApiDetails() {
		APIDetails apiDetails = formComponent.new APIDetails();
		apiDetails.setMethod(apiMethod);
		apiDetails.setURL(apiUrl);
		apiDetails.setData(apiDataValue);
		apiDetails.setResponseKey(apiResponseKeyValue);
		return apiDetails;
	}

	/**
	 * Populates the password strength rules
	 * 
	 * @return PasswordStrength
	 */
	private PasswordStrength getPasswordStrength() {
		PasswordStrength passwordStrength = formComponent.new PasswordStrength();
		passwordStrength.setLabel(pwdStrengthLabel);
		passwordStrength.setRules(getResourceValueMap(pwdRulesResource));
		return passwordStrength;
	}
	/**
	 * Populates the Render on details
	 * 
	 * @return RenderOnDetails
	 */
	private RenderOnDetails getRenderOnDetails() {
		RenderOnDetails renderOnDetails = formComponent.new RenderOnDetails();
		renderOnDetails.setFieldName(renderOnField);
		renderOnDetails.setValue(renderOnValue);
		renderOnDetails.setFieldMapped(fieldMapped);
		renderOnDetails.setMagento(magento);
		renderOnDetails.setOtp(otp);
		renderOnDetails.setEcomOnly(ecomOnly);
		return renderOnDetails;
	}
	
	/**
	 * Populates the Help details
	 * 
	 * @return HelpInformation
	 */
	private HelpInformation getHelpInformation() {
		HelpInformation helpInfo = formComponent.new HelpInformation();
		helpInfo.setIcon(icon);
		helpInfo.setBackgroundColor(backgroundColor);
		helpInfo.setColor(color);
		helpInfo.setContent(content);
		helpInfo.setTooltipImageD(tooltipImageD);
		helpInfo.setTooltipImageM(tooltipImageM);
		helpInfo.setDirection(direction);
		helpInfo.setRenderOn(getRenderOnDetailsForHelp());
		return helpInfo;
	}
	
	private RenderOnDetails getRenderOnDetailsForHelp() {
		RenderOnDetails renderOnDetails = formComponent.new RenderOnDetails();
		renderOnDetails.setFieldName(renderOnFieldHelpInfo);
		renderOnDetails.setValue(renderOnValueHelpInfo);
		renderOnDetails.setFieldMapped(fieldMappedHelpInfo);
		renderOnDetails.setMagento(magentoHelpInfo);
		renderOnDetails.setOtp(otpHelpInfo);
		renderOnDetails.setEcomOnly(ecomOnlyHelpInfo);
		return renderOnDetails;
		
	}

	/**
	 * This methods will return the Form Component object
	 * 
	 * @return FormComponentBean
	 */
	public FormComponentBean getFormComponent() {
		return formComponent;
	}

}