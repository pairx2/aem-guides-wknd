package com.abbott.aem.an.similac.core.models;

import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.an.similac.core.beans.FormComponentBean;
import com.abbott.aem.an.similac.core.beans.FormContainerBean;
import com.abbott.aem.an.similac.core.beans.SocialLoginBean;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class FormContainerModelTest {

	private static final String CONTENT_PATH = "/content";
	private static final String PROFILE_CONTENT_PATH = "/content/forms";
	private static final String FORM_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/registration-form.json";
	private static final String PROFILE_FORM_CONTENT_JSON = "/com/abbott/aem/an/similac/core/models/myProfile-form.json";
	private static final String MAX_ALLOWED_LENGTH = "maxAllowedLength";
	private static final String MIN_ALLOWED_LENGTH = "minAllowedLength";
	private static final String VALIDATION_PATTERN = "validationPattern";
	private static final String VALIDATION_TEXT = "validationText";
	private static final String VALIDATION_URL = "validationUrl";
	private static final String VALIDATION_VALUE = "validationValue";
	private static final String VALUE = "value";

 	private FormContainerModel formContainerModel;
	
	private ProfileFormContainerModel profileContainerModel;
 
	private AemContext context;

	@InjectMocks
	private FormComponentModel formComponentModelTest = new FormComponentModel();

	@Mock
	private FormComponentBean formComponent;

	@Mock
	private Iterable<Resource> childResources;

	@Mock
	private Resource resource;

	@Mock
	private Node node;

	@Mock
	private NodeIterator nodeIterator;

	@Mock
	private Property textProperty;

	@Mock
	private Property valueProperty;

	@Mock
	private Property validationTextProp;

	@Mock
	private Property validationValueProp;

	@Mock
	private Property minAllowedLengthPrty;

	@Mock
	private Property maxAllowedLengthPrty;

	@Mock
	private Property validationPaternPrty;

	@Mock
	private Property validationUrlPrty;

	@Mock
	private Value sourceText;

	@Mock
	private Value sourceValue;

	@Mock
	private Value validateText;

	@Mock
	private Value validateValue;

	@Mock
	private Value minAllowedLengthValue;

	@Mock
	private Value maxAllowedLengthValue;

	@Mock
	private Value validationPaternValue;

	@Mock
	private Value validationUrlValue;

	@BeforeEach
	void setUp() {
		context.load().json(FORM_CONTENT_JSON, CONTENT_PATH);
		context.addModelsForClasses(FormContainerModel.class);
		context.addModelsForClasses(FormComponentModel.class);		
		context.load().json(PROFILE_FORM_CONTENT_JSON, PROFILE_CONTENT_PATH);
		context.addModelsForClasses(ProfileFormContainerModel.class);
		context.addModelsForClasses(ProfileFormContainerModel.class);
	}
 
	@Test
	final void testFormContainer() {
		context.currentResource(context.resourceResolver().getResource("/content/registration/jcr:content/container"));
		formContainerModel = context.request().adaptTo(FormContainerModel.class);
		FormContainerBean formContainer = formContainerModel.getContainer();

		validateFormContainer(formContainer);
		validateSocialLogin(formContainerModel.getSocialLoginBean());		
		validateTextHTMLTagComp(formContainer.getFields().get(0));
		validateTextComp(formContainer.getFields().get(1));
		validateHelp(formContainer.getFields().get(2));
		validateOptionComp(formContainer.getFields().get(6));
		validateAPI(formContainer.getFields().get(7));
		validateButton(formContainer.getFields().get(8));
		validateLinkButton(formContainer.getFields().get(9));
		validatePwdStrength(formContainer.getFields().get(13));
		Assertions.assertNotNull(formContainerModel.getFormJson());
		Assertions.assertNotNull(formContainerModel.getSocialLoginJson());
	}
	
	@Test
	final void testProfileFormContainer() {
		context.currentResource(context.resourceResolver().getResource("/content/forms/myProfile/jcr:content/profileContainer"));
		profileContainerModel = context.request().adaptTo(ProfileFormContainerModel.class);
		FormContainerBean profileContainer = profileContainerModel.getContainer();
		
		validateProfileFormContainer(profileContainer);
		Assertions.assertNotNull(profileContainerModel.getProfileFormJson());		
	}
	
	private void validateProfileFormContainer(FormContainerBean profilecontainer) {
		Assertions.assertNotNull(profilecontainer);
		Assertions.assertNotNull(profilecontainer.getActionPath());
		Assertions.assertNotNull(profilecontainer.getFormName());
		Assertions.assertNotNull(profilecontainer.getFormTitle());		
	}
	@Test
	final void testProfileFormContainerEmptyResource() {
		context.currentResource(context.resourceResolver().getResource("/content/forms/emptyResource/jcr:content/profileContainer"));
		profileContainerModel = context.request().adaptTo(ProfileFormContainerModel.class);
		FormContainerBean profileContainer = profileContainerModel.getContainer();
		Assertions.assertNull(profileContainer);
		Assertions.assertNull(profileContainerModel.getProfileFormJson());
	}

	@Test
	final void testFormContainerEmptyResource() {
		context.currentResource(context.resourceResolver().getResource("/content/emptyResource/jcr:content/container"));
		formContainerModel = context.request().adaptTo(FormContainerModel.class);
		FormContainerBean formContainer = formContainerModel.getContainer();
		Assertions.assertNull(formContainer);
		Assertions.assertNull(formContainerModel.getFormJson());
		Assertions.assertNull(formContainerModel.getSocialLoginJson());
	}

	@Test
	final void testGetResourceValueForSource() throws RepositoryException {
		resourceValueMocking();
		Mockito.when(node.getProperty(VALUE)).thenReturn(valueProperty);
		Mockito.when(valueProperty.getValue()).thenReturn(sourceValue);
		Mockito.when(sourceValue.getString()).thenReturn("Source-Value");
		List<Map<String, String>> resourceValue = formComponentModelTest.getResourceValue(resource);
		Assertions.assertNotNull(resourceValue);
		Assertions.assertEquals(1, resourceValue.size());
	}

	@Test
	final void testGetResourceValueForSourceScenario2() throws RepositoryException {
		resourceValueMocking();
		Mockito.lenient().when(node.getProperty(VALUE)).thenReturn(valueProperty);
		Mockito.lenient().when(valueProperty.getValue()).thenReturn(sourceValue);
		Mockito.lenient().when(sourceValue.getString()).thenReturn("true");
		Mockito.doNothing().when(formComponent).setFieldType("boolean");
		Assertions.assertNotNull(formComponentModelTest.getResourceValue(resource));
	}

	@Test
	final void testGetResourceValueForSourceScenario3() throws RepositoryException {
		resourceValueMocking();
		Mockito.lenient().when(node.getProperty(VALUE)).thenReturn(valueProperty);
		Mockito.lenient().when(valueProperty.getValue()).thenReturn(sourceValue);
		Mockito.lenient().when(sourceValue.getString()).thenReturn("false");
		Assertions.assertNotNull(formComponentModelTest.getResourceValue(resource));
	}

	@Test
	final void testGetResourceValueForSourceScenario4() throws RepositoryException {
		Mockito.lenient().when(resource.getChildren()).thenReturn(childResources);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.hasNode(Mockito.anyString())).thenReturn(true);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty("text")).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(VALUE)).thenReturn(false);
		Assertions.assertTrue(formComponentModelTest.getResourceValue(resource).isEmpty());
	}

	@Test
	final void testGetResourceValueForValidation() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.when(node.hasProperty(VALIDATION_TEXT)).thenReturn(true);
		Mockito.when(node.getProperty(VALIDATION_TEXT)).thenReturn(validationTextProp);
		Mockito.when(validationTextProp.getValue()).thenReturn(validateText);
		Mockito.lenient().when(sourceText.getString()).thenReturn("required");
		Mockito.when(node.hasProperty(VALIDATION_VALUE)).thenReturn(true);
		Mockito.when(node.getProperty(VALIDATION_VALUE)).thenReturn(validationValueProp);
		Mockito.when(validationValueProp.getValue()).thenReturn(validateValue);
		Mockito.lenient().when(sourceValue.getString()).thenReturn("This is required field.");
		Mockito.when(node.hasProperty(MIN_ALLOWED_LENGTH)).thenReturn(true);
		Mockito.when(node.getProperty(MIN_ALLOWED_LENGTH)).thenReturn(minAllowedLengthPrty);
		Mockito.when(minAllowedLengthPrty.getValue()).thenReturn(minAllowedLengthValue);
		Mockito.lenient().when(minAllowedLengthValue.getString()).thenReturn("5");
		Mockito.when(node.hasProperty(MAX_ALLOWED_LENGTH)).thenReturn(true);
		Mockito.when(node.getProperty(MAX_ALLOWED_LENGTH)).thenReturn(maxAllowedLengthPrty);
		Mockito.when(maxAllowedLengthPrty.getValue()).thenReturn(maxAllowedLengthValue);
		Mockito.lenient().when(maxAllowedLengthValue.getString()).thenReturn("25");
		Mockito.when(node.hasProperty(VALIDATION_PATTERN)).thenReturn(true);
		Mockito.when(node.getProperty(VALIDATION_PATTERN)).thenReturn(validationPaternPrty);
		Mockito.when(validationPaternPrty.getValue()).thenReturn(validationPaternValue);
		Mockito.lenient().when(validationPaternValue.getString()).thenReturn("validation-patern");
		Mockito.when(node.hasProperty( VALIDATION_URL)).thenReturn(true);
		Mockito.when(node.getProperty( VALIDATION_URL)).thenReturn(validationUrlPrty);
		Mockito.when(validationUrlPrty.getValue()).thenReturn(validationUrlValue);
		Mockito.lenient().when(validationUrlValue.getString()).thenReturn("validation-url");

		List<Map<String, String>> resourceValue = formComponentModelTest.getResourceValue(resource);
		Assertions.assertNotNull(resourceValue);
		Assertions.assertEquals(1, resourceValue.size());
	}
 
	@Test
	final void testGetResourceValueForValidationScenario2() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.lenient().when(node.hasProperty(VALIDATION_TEXT)).thenReturn(true);
		Mockito.lenient().when(node.getProperty(VALIDATION_TEXT)).thenReturn(validationTextProp);
		Mockito.lenient().when(validationTextProp.getValue()).thenReturn(validateText);
		Mockito.lenient().when(sourceText.getString()).thenReturn("required");
		Mockito.lenient().when(node.hasProperty(VALIDATION_VALUE)).thenReturn(true);
		Mockito.lenient().when(node.getProperty(VALIDATION_VALUE)).thenReturn(validationValueProp);
		Mockito.lenient().when(validationValueProp.getValue()).thenReturn(validateValue);
		Mockito.lenient().when(sourceValue.getString()).thenReturn("This is required field.");
		Mockito.lenient().when(node.hasProperty(MIN_ALLOWED_LENGTH)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(MAX_ALLOWED_LENGTH)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(VALIDATION_PATTERN)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty( VALIDATION_URL)).thenReturn(false);
		Assertions.assertNotNull(formComponentModelTest.getResourceValue(resource));
	}

	@Test
	final void testGetResourceValueForValidationScenario3() throws RepositoryException {
		resourceValueValidationMocking();
		Mockito.lenient().when(node.hasProperty(VALIDATION_TEXT)).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(VALIDATION_VALUE)).thenReturn(false);
		Assertions.assertNotNull(formComponentModelTest.getResourceValue(resource));
	}

	private void validateTextHTMLTagComp(FormComponentBean htmlTag) {
		Assertions.assertNotNull(htmlTag.getTagName());
		Assertions.assertNotNull(htmlTag.getBtnClassName());
		Assertions.assertNotNull(htmlTag.getId());
	}

	private void validateFormContainer(FormContainerBean formContainer) {
		Assertions.assertNotNull(formContainer);
		Assertions.assertNotNull(formContainer.getActionPath());
		Assertions.assertNotNull(formContainer.getDisclaimer());
		Assertions.assertNotNull(formContainer.getFormName());
		Assertions.assertNotNull(formContainer.getFormTitle());
		Assertions.assertNotNull(formContainer.getRedirectOnSuccessURL());
		Assertions.assertNotNull(formContainer.getChekoutLoginErrorMessage());
		Assertions.assertNotNull(formContainer.getSaveLocal());
		Assertions.assertNotNull(formContainer.getSuccessMsgText());
		Assertions.assertNotNull(formContainer.getSuccessMsgHeading());
		Assertions.assertNotNull(formContainer.getRedirectToPreviousPage());
		Assertions.assertNotNull(formContainer.getErrorUpdateProfile());
		Assertions.assertNotNull(formContainer.getFields().get(0));
		Assertions.assertNotNull(formContainer.getForgotPasswordActionPath());
		Assertions.assertNotNull(formContainer.getRedirectOnSuccessURLSubscription());
		Assertions.assertNotNull(formContainer.getActionPathOnLoad());
		Assertions.assertNotNull(formContainer.getActionPathToUpdateProfile());
		Assertions.assertNotNull(formContainer.getErrorUpdateProfileNonDOUser());
		Assertions.assertNotNull(formContainer.getInitialDataURL());
		Assertions.assertNotNull(formContainer.getMainHeadLabel());
		Assertions.assertNotNull(formContainer.getSubHeadLabel());
		Assertions.assertNotNull(formContainer.getActionPathGetProfile());
		Assertions.assertNotNull(formContainer.getContentHead());
		Assertions.assertNotNull(formContainer.getFooterNote());
		Assertions.assertNotNull(formContainer.getSocialRegisterMessage());
		Assertions.assertNotNull(formContainer.getSubmissionType());
		Assertions.assertNotNull(formContainer.getEventCategory());
		Assertions.assertNotNull(formContainer.getEventType());
		Assertions.assertNotNull(formContainer.getHistoryRedirectUrl());
		Assertions.assertNotNull(formContainer.getRedirectOnSuccessURLNeosure());
		Assertions.assertNotNull(formContainer.getRedirectOnSuccessURLOasis());		
	}

	private void validateSocialLogin(SocialLoginBean socialLoginBean) {
		Assertions.assertNotNull(socialLoginBean);
		Assertions.assertNotNull(socialLoginBean.getRegistrationURL());
		Assertions.assertNotNull(socialLoginBean.getAccountLinkingURL());
		Assertions.assertNotNull(socialLoginBean.getSocialLoginSuccessURL());
	}

	private void validateAPI(FormComponentBean apiComp) {
		FormComponentBean.APIDetails api = apiComp.getFetchApi();
		Assertions.assertNotNull(apiComp.getFetchApi());
		Assertions.assertNotNull(api.getData());
		Assertions.assertNotNull(api.getMethod());
		Assertions.assertNotNull(api.getResponseKey());
		Assertions.assertNotNull(api.getURL());
	}

	private void validateTextComp(FormComponentBean textCompBean) {
		Assertions.assertNotNull(textCompBean.getCategoryType());
		Assertions.assertNotNull(textCompBean.getLabel());
		Assertions.assertNotNull(textCompBean.getName());
		Assertions.assertNotNull(textCompBean.getPlaceholder());
		Assertions.assertNotNull(textCompBean.getType());
		Assertions.assertNotNull(textCompBean.getValidations());
		Assertions.assertNotNull(textCompBean.getGaDetails());
		Assertions.assertNotNull(textCompBean.getMaxLength());
		Assertions.assertNotNull(textCompBean.getValue());
	}
 
	private void validateOptionComp(FormComponentBean optionCompBean) {
		Assertions.assertNotNull(optionCompBean.getCategoryType());
		Assertions.assertNotNull(optionCompBean.getDisplayLabelFormat());
		Assertions.assertNotNull(optionCompBean.getLabel());
		Assertions.assertNotNull(optionCompBean.getName());
		Assertions.assertNotNull(optionCompBean.getPlaceholder());
		Assertions.assertNotNull(optionCompBean.getSourceValue());
		Assertions.assertNotNull(optionCompBean.getType());
		Assertions.assertNotNull(optionCompBean.getValidations());
		Assertions.assertNotNull(optionCompBean.getValueFormat());
		Assertions.assertNotNull(optionCompBean.getPassIn());
		Assertions.assertNotNull(optionCompBean.getInitValue());
	}
 
	private void validateHelp(FormComponentBean helpcomp) {
		FormComponentBean.HelpInformation help = helpcomp.getHelp();
		Assertions.assertNotNull(helpcomp.getHelp());
		Assertions.assertNotNull(help.getColor());
		Assertions.assertNotNull(help.getContent());
		Assertions.assertNotNull(help.getTooltipImageD());
		Assertions.assertNotNull(help.getTooltipImageM());
		Assertions.assertNotNull(help.getDirection());
		Assertions.assertNotNull(help.getBackgroundColor());
		Assertions.assertNotNull(help.getIcon());
		Assertions.assertNotNull(helpcomp.getClassName());
	}
		  
	private void validateLinkButton(FormComponentBean linkButtonComponentBean) {
    	Assertions.assertNotNull(linkButtonComponentBean.getBtnClassName());
		Assertions.assertNotNull(linkButtonComponentBean.getType());
		Assertions.assertNotNull(linkButtonComponentBean.getPrimary());
		Assertions.assertNotNull(linkButtonComponentBean.getInlineBtn());			
	}

	private void validatePwdStrength(FormComponentBean helpComp) {
		FormComponentBean.PasswordStrength pwdStrengthComponentBean = helpComp.getPasswordStrength();
    	Assertions.assertNotNull(pwdStrengthComponentBean.getLabel());
		Assertions.assertNotNull(pwdStrengthComponentBean.getRules());
	}
	
	private void validateButton(FormComponentBean buttonComponentBean) {
		Assertions.assertNotNull(buttonComponentBean.getBtnClassName());
		Assertions.assertNotNull(buttonComponentBean.getType());
		Assertions.assertNotNull(buttonComponentBean.getPrimary());
		Assertions.assertNotNull(buttonComponentBean.getInlineBtn());
		Assertions.assertNotNull(buttonComponentBean.getHref());
	}	
	
	private void resourceValueMocking() throws RepositoryException {
		Mockito.lenient().when(resource.getChildren()).thenReturn(childResources);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.hasNode(Mockito.anyString())).thenReturn(true);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty("text")).thenReturn(true);
		Mockito.lenient().when(node.hasProperty(VALUE)).thenReturn(true);
		Mockito.lenient().when(node.getProperty("text")).thenReturn(textProperty);
		Mockito.lenient().when(textProperty.getValue()).thenReturn(sourceText);
		Mockito.lenient().when(sourceText.getString()).thenReturn("Source-Text");
	}

	private void resourceValueValidationMocking() throws RepositoryException {
		Mockito.lenient().when(resource.getChildren()).thenReturn(childResources);
		Mockito.lenient().when(resource.adaptTo(Node.class)).thenReturn(node);
		Mockito.lenient().when(node.hasNode(Mockito.anyString())).thenReturn(true);
		Mockito.lenient().when(node.getNodes()).thenReturn(nodeIterator);
		Mockito.lenient().when(nodeIterator.hasNext()).thenReturn(true, false);
		Mockito.lenient().when(nodeIterator.nextNode()).thenReturn(node);
		Mockito.lenient().when(node.hasProperty("text")).thenReturn(false);
		Mockito.lenient().when(node.hasProperty(VALUE)).thenReturn(false);
	}
	
	private void validateSMSProfileFormContainer(FormContainerBean smsProfileContainer) {
		Assertions.assertNotNull(smsProfileContainer);
		Assertions.assertNotNull(smsProfileContainer.getActionPath());
		Assertions.assertNotNull(smsProfileContainer.getFormName());
		Assertions.assertNotNull(smsProfileContainer.getFormTitle());
		Assertions.assertNotNull(smsProfileContainer.getPersonalInfo());		
	}
	
	@Test
	final void testSMSNotificationProfileFormContainer() {
		context.currentResource(context.resourceResolver().getResource("/content/forms/myProfile/jcr:content/profileContainer/smsNotificationContainer"));
		profileContainerModel = context.request().adaptTo(ProfileFormContainerModel.class);
		FormContainerBean smsProfileContainer = profileContainerModel.getContainer();
		
		validateSMSProfileFormContainer(smsProfileContainer);
		Assertions.assertNotNull(profileContainerModel.getProfileFormJson());	
	}
}
