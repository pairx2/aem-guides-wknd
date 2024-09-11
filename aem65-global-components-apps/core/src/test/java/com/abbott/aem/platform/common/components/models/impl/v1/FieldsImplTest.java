package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.Mockito;

import com.abbott.aem.platform.common.components.models.Fields;
import com.abbott.aem.platform.common.components.services.ProxyComponentService;
import com.abbott.aem.platform.common.components.services.ProxyPaths;
import com.day.cq.wcm.api.components.Component;

/**
 * The type Fields impl test.
 */
@ExtendWith(AemContextExtension.class)
class FieldsImplTest {

	private final AemContext ctx = new AemContext();
	private ProxyComponentService proxyComponentService;
	private Component component;

	/**
	 * Sets up.
	 *
	 * @throws Exception the exception
	 */
	@BeforeEach
	public void setUp() throws Exception {
		proxyComponentService = Mockito.mock(ProxyComponentService.class);
		component = Mockito.mock(Component.class);
		ProxyPaths path = null;
		Mockito.lenient().when(proxyComponentService.getProxyPath(component, path)).thenReturn("hello");
		ctx.registerService(ProxyComponentService.class, proxyComponentService);
		ctx.addModelsForClasses(FieldsImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/FieldsImplTest.json", "/content");

	}

	/**
	 * Test get validation error message.
	 */
	@Test
	void testGetValidationErrorMessage() {
		final String expected = "Enter a Valid Value";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getValidationErrorMessage();
		assertEquals(expected, actual);

		Fields obj1 = new FieldsImpl();
		Fields obj2 = new FieldsImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	/**
	 * Test get field icon.
	 */
	@Test
	void testGetFieldIcon() {
		final String expected = "double-icon";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getFieldIcon();
		assertEquals(expected, actual);
	}

	/**
	 * Test get left icon image.
	 */
	@Test
	void testGetLeftIcon() {
		final String expected = "/content/dam/abbott-platform/test.jpg";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getIconLeft();
		assertEquals(expected, actual);
	}

	/**
	 * Test right left icon image.
	 */
	@Test
	void testGetRightIcon() {
		final String expected = "/content/dam/abbott-platform/test.jpg";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getIconRight();
		assertEquals(expected, actual);
	}

	/**
	 * Test get placeholder.
	 */
	@Test
	void testGetPlaceholder() {
		final String expected = "Enter Email here";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getPlaceholder();
		assertEquals(expected, actual);
	}

	/**
	 * Test get double right icon.
	 */
	@Test
	void testGetDoubleRightIcon() {
		final String expected = "/content/dam/abbott-platform/test.jpg";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getDoubleIconRight();
		assertEquals(expected, actual);
	}

	/**
	 * Test get double left icon.
	 */
	@Test
	void testGetDoubleLeftIcon() {
		final String expected = "/content/dam/abbott-platform/test.jpg";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getDoubleIconLeft();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test is confirm password.
	 */
	@Test
	void testIsConfirmPassword() {
		final boolean expected = true;
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		boolean actual = fields.isConfirmPassword();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test is confirm password.
	 */
	@Test
	void testIsRegexRequired() {
		final boolean expected = false;
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		boolean actual = fields.isRegexRequired();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test get Regex pattern.
	 */
	@Test
	void testGetRegexPattern() {
		final String expected = "/^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getRegexPattern();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test Password policy required.
	 */
	@Test
	void testGetPasswordPolicyRequired() {
		final String expected = "false";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getPasswordPolicyRequired();
		assertEquals(expected, actual);
	}

	/**
	 * Test Password policy type.
	 */
	@Test
	void testGetPolicyType() {
		final String expected = "Moderate";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getPolicyType();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test Tooltip icon
	 */
	@Test 
	void testGetTooltipIcon(){
		final String expected = "/content/dam/abbott-platform/test.jpg";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getTooltipIcon();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test tooltip label
	 */
	@Test 
	void testGetTooltipLabel(){
		final String expected = "Tooltip Label";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getTooltipLabel();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test tooltip description
	 */
	@Test 
	void testGetTooltipDescription(){
		final String expected = "Tooltip Description";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getTooltipDescription();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test minimum char count
	 */
	@Test
	void testGetMinCharCount(){
		final int expected = 8;
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		int actual = fields.getMinCharCount();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test minimum char label
	 */
	@Test 
	void testGetMinCharLabel(){
		final String expected = "Min Char Label";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getMinCharLabel();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test minimum char description
	 */
	@Test 
	void testGetMinCharDescription(){
		final String expected = "Min Char Description";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getMinCharDescription();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test Alphabet label
	 */
	@Test 
	void testGetAlphabetLabel(){
		final String expected = "Alphabet Label";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getAlphabetLabel();
		assertEquals(expected, actual);
		
	}
	
	/**
	 * Test Alphabet description
	 */
	@Test 
	void testGetAlphabetDescription(){
		final String expected = "Alphabet Description";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getAlphabetDescription();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test  numeric label
	 */
	@Test 
	void testGetNumericLabel(){
		final String expected = "Numeric Label";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getNumericLabel();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test numeric description
	 */
	@Test
	void testGetNumericDescription(){
		final String expected = "Numeric Description";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getNumericDescription();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test Special char label
	 */
	@Test 
	void testGetSpecialCharLabel(){
		final String expected = "Special Character Label";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getSpecialCharLabel();
		assertEquals(expected, actual);
	}
	
	/**
	 * Test special character description
	 */
	@Test 
	void testGetSpecialCharDescription(){
		final String expected = "Special Character Description";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getSpecialCharDescription();
		assertEquals(expected, actual);
	}

	/**
	 * Test special character description
	 */
	@Test
	void testGetSpecialCharRegex() {
		final String expected = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getSpecialCharRegex();
		assertEquals(expected, actual);
	}
	@Test
	void testGetEnableTooltip() {
		final String expected = "false";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getEnableTooltip();
		assertEquals(expected, actual);
	}

	@Test
	void testGetRegexErrorMessage() {
		final String expected = "Enter a Valid Value";
		ctx.currentResource("/content/fields");
		Fields fields = ctx.request().adaptTo(Fields.class);
		String actual = fields.getRegexErrorMessage();
		assertEquals(expected, actual);
	}
}
