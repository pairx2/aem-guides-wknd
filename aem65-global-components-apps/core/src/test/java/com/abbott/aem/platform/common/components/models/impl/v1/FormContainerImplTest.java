package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

import com.abbott.aem.platform.common.components.models.FormContainer;
import com.abbott.aem.platform.common.components.services.APILookupService;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

import org.apache.sling.api.resource.Resource;
import org.mockito.Mockito;

/**
 * @author Pawan.Namagiri
 */
@ExtendWith(AemContextExtension.class)
public class FormContainerImplTest {

	private final AemContext ctx = new AemContext();
	private final AemContext ctx2 = new AemContext();

	private APILookupService apiLookupService;

	private Page currentPage;

	private PageManager pageManager;
	
	private ProxyComponentService proxyComponentService;
	
	private Component component;

	@BeforeEach
	public void setUp() throws Exception {
		
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx2.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(FormContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FormContainerImplTest.json", "/content");
		ctx2.addModelsForClasses(FormContainerImpl.class);
		ctx2.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FormContainerImplTest2.json", "/content");

		pageManager = Mockito.mock(PageManager.class);
		currentPage = Mockito.mock(Page.class);
		ctx.currentPage(currentPage);
		ctx2.currentPage(currentPage);

	}

	@Test
	void testGetFormMode() {
		final String EXPECTED_FORM_MODE = "Wizard";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getFormMode();
		assertEquals(EXPECTED_FORM_MODE, actual);

		FormContainer obj1 = new FormContainerImpl();
		FormContainer obj2 = new FormContainerImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetFormType() {
		final String EXPECTED_FORM_TYPE = "Contact Us";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getFormType();
		assertEquals(EXPECTED_FORM_TYPE, actual);
	}

	@Test
	void testGetSuccessMessage() {
		final String EXPECTED_SUCCESS_MESSAGE = "Submitted Successfully";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getSuccessMessage();
		assertEquals(EXPECTED_SUCCESS_MESSAGE, actual);
	}

	@Test
	void testGetFailureMessage() {
		final String EXPECTED_FAILURE_MESSAGE = "Submission Failed";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getFailureMessage();
		assertEquals(EXPECTED_FAILURE_MESSAGE, actual);
	}

	@Test
	void testGetRecaptcha() {
		final String EXPECTED_RECAPTCHA = "7GHAW89";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getRecaptcha();
		assertEquals(EXPECTED_RECAPTCHA, actual);
	}

	@Test
	void testGetSubmit() {
		final String EXPECTED_GET_SUBMIT = "Submit";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getSubmit();
		assertEquals(EXPECTED_GET_SUBMIT, actual);
	}

	@Test
	void testGetReset() {
		final String EXPECTED_GET_RESET = "Reset";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getReset();
		assertEquals(EXPECTED_GET_RESET, actual);
	}

	@Test
	void testGetCancel() {
		final String EXPECTED_GET_CANCEL = "Cancel";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getCancel();
		assertEquals(EXPECTED_GET_CANCEL, actual);
	}
	
	@Test
	void testGetKountEnable() {
		final String EXPECTED_GET_KOUNT = "Kount";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getKountEnable();
		assertEquals(EXPECTED_GET_KOUNT, actual);
	}
	
	@Test
	void testGetKountClientID() {
		final String EXPECTED_GET_KOUNT_CLIENT = "Kount Client";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getKountClientID();
		assertEquals(EXPECTED_GET_KOUNT_CLIENT, actual);
	}
	
	@Test
	void testGetKountEnvironment() {
		final String EXPECTED_GET_KOUNT_ENVIRONMENT = "PROD";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getKountEnvironment();
		assertEquals(EXPECTED_GET_KOUNT_ENVIRONMENT, actual);
	}
	
	@Test
	void testGetIsSPA() {
		final String EXPECTED_GET_ISSPA = "True";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getIsSPA();
		assertEquals(EXPECTED_GET_ISSPA, actual);
	}

	@Test
	void testGetStepLabel() {
		final List<String> EXPECTED_GET_STEP_LABEL = new ArrayList<>();
		EXPECTED_GET_STEP_LABEL.add("step 1");
		EXPECTED_GET_STEP_LABEL.add("step 2");
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		List<String> actual = formContainer.getStepLabel();
		assertEquals(EXPECTED_GET_STEP_LABEL, actual);
	}

	@Test
	void testGetStepCompleteIcon() {
		final String EXPECTED_GET_STEP_COMPLETE_ICON = "/content/dam/abbott-platform/test.jpg";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getStepCompleteIcon();
		assertEquals(EXPECTED_GET_STEP_COMPLETE_ICON, actual);
	}

	@Test
	void testGetRequestType() {
		final String EXPECTED_GET_REQUEST_TYPE = "GET";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getRequestType();
		assertEquals(EXPECTED_GET_REQUEST_TYPE, actual);
	}

	@Test
	void testGetReCaptchaKey() {

		final String EXPECTED_GET_RECAPTCHA_KEY = "check";
		Resource resource = ctx.currentResource("/content/formContainer");
		Mockito.lenient().when(currentPage.adaptTo(Resource.class)).thenReturn(resource);
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getReCaptchaKey();
		assertEquals(EXPECTED_GET_RECAPTCHA_KEY, actual);

	}

	@Test
	void testGetRecaptchaScriptsrc() {

		final String EXPECTED_GET_RECAPTCHA_SCRIPT_SRC = "check";
		Resource resource = ctx.currentResource("/content/formContainer");
		Mockito.lenient().when(currentPage.adaptTo(Resource.class)).thenReturn(resource);
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getRecaptchaScriptsrc();
		assertEquals(EXPECTED_GET_RECAPTCHA_SCRIPT_SRC, actual);

	}

	@Test
	void testGetThankYouPage() {

		final String EXPECTED_THANKYOU_PAGE = "/content/test";
		Resource resource = ctx.currentResource("/content/formContainer");
		Mockito.lenient().when(pageManager.getPage("data")).thenReturn(currentPage);
		Mockito.lenient().when(currentPage.getPath()).thenReturn(EXPECTED_THANKYOU_PAGE);
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getThankYouPage();
		assertEquals(EXPECTED_THANKYOU_PAGE, actual);
	}

	//@Test
	void testGetThankYouPage2() {

		ctx.addModelsForClasses(FormContainerImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FormContainerImplTest.json", "/content");

		pageManager = Mockito.mock(PageManager.class);
		currentPage = Mockito.mock(Page.class);
		ctx.currentPage(currentPage);

		final String EXPECTED_THANKYOU_PAGE_2 = "/content/test";
		Resource resource = ctx.currentResource("/content/formContainer");
		Mockito.lenient().when(pageManager.getPage("data")).thenReturn(currentPage);
		Mockito.lenient().when(currentPage.getPath()).thenReturn(EXPECTED_THANKYOU_PAGE_2);
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getThankYouPage();
		assertEquals(EXPECTED_THANKYOU_PAGE_2, actual);
	}

	@Test
	void testGetUpdateRequest() {
		final String EXPECTED_GET_UPDATE_REQUEST = "check";

		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getUpdateRequest();
		assertEquals(EXPECTED_GET_UPDATE_REQUEST, actual);

		final String EXPECTED_GET_UPDATE_REQUEST_WHEN_NULL_INPUT = "";
		ctx2.currentResource("/content/formContainer");
		FormContainer formContainer2 = ctx2.request().adaptTo(FormContainer.class);
		String actual2 = formContainer2.getUpdateRequest();
		assertEquals(EXPECTED_GET_UPDATE_REQUEST_WHEN_NULL_INPUT, actual2);

	}

	@Test
	void testGetOnBeforeCall() {
		final String EXPECTED_GET_ON_BEFORE_CALL = "check";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getOnBeforeCall();
		assertEquals(EXPECTED_GET_ON_BEFORE_CALL, actual);

		final String EXPECTED_GET_UPDATE_REQUEST_WHEN_NULL_INPUT = "";
		ctx2.currentResource("/content/formContainer");
		FormContainer formContainer2 = ctx2.request().adaptTo(FormContainer.class);
		String actual2 = formContainer2.getOnBeforeCall();
		assertEquals(EXPECTED_GET_UPDATE_REQUEST_WHEN_NULL_INPUT, actual2);
	}

	@Test
	void testGetOnSuccess() {
		final String EXPECTED_GET_ON_SUCCESS = "check";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getOnSuccess();
		assertEquals(EXPECTED_GET_ON_SUCCESS, actual);

		final String EXPECTED_GET_ON_SUCCESS_WHEN_NULL_INPUT = "";
		ctx2.currentResource("/content/formContainer");
		FormContainer formContainer2 = ctx2.request().adaptTo(FormContainer.class);
		String actual2 = formContainer2.getOnSuccess();
		assertEquals(EXPECTED_GET_ON_SUCCESS_WHEN_NULL_INPUT, actual2);

	}

	@Test
	void testGetOnError() {
		final String EXPECTED_GET_ON_ERROR = "check";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getOnError();
		assertEquals(EXPECTED_GET_ON_ERROR, actual);

		final String EXPECTED_GET_ON_ERROR_WHEN_NULL_INPUT = "";
		ctx2.currentResource("/content/formContainer");
		FormContainer formContainer2 = ctx2.request().adaptTo(FormContainer.class);
		String actual2 = formContainer2.getOnError();
		assertEquals(EXPECTED_GET_ON_ERROR_WHEN_NULL_INPUT, actual2);

	}

	@Test
	void testGetOnComplete() {
		final String EXPECTED_GET_ON_COMPLETE = "check";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getOnComplete();
		assertEquals(EXPECTED_GET_ON_COMPLETE, actual);

		final String EXPECTED_GET_ON_COMPLETE_WHEN_NULL_INPUT = "";
		ctx2.currentResource("/content/formContainer");
		FormContainer formContainer2 = ctx2.request().adaptTo(FormContainer.class);
		String actual2 = formContainer2.getOnComplete();
		assertEquals(EXPECTED_GET_ON_COMPLETE_WHEN_NULL_INPUT, actual2);

	}
	
	@Test
	void testGetEnterpriseRecaptcha() {
		final String expected = "true";
		ctx.currentResource("/content/formContainer");
		FormContainer formContainer = ctx.request().adaptTo(FormContainer.class);
		String actual = formContainer.getEnterpriseRecaptcha();
		assertEquals(expected, actual);
	}

	;
}
