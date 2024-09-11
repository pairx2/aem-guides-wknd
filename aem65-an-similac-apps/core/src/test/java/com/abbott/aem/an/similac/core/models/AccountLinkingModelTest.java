package com.abbott.aem.an.similac.core.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The test class for the 'Account Linking' Sling Model
 * 
 * @author Anirudh Garg
 */
@ExtendWith(AemContextExtension.class)
public class AccountLinkingModelTest {

	private static final String REDIRECT_STR = "\"redirectToPreviousPage\":\"false\",\"enableRecaptcha\":\"false\",\"fields\":[{\"categoryType\":\"others\",\"label\":\"About You\",";

	private static final String NAME_STR = "\"name\":\"ABOUT_YOU\",\"type\":\"htmltag\",\"btnClassName\":\"col-6\",\"tagName\":\"h2\"}]}";
	
	/** The AEM context to drive the environment setup */
	private AemContext ctx;

	/** The model under test */
	private AccountLinkingModel accLinkModel;

	/** The expected result of the positive test */
	private String expectedPositiveJson = "{\"formTitle\":\"Account Linking Form \",\"formName\":\"Account Linking Form \","
			+ "\"actionPath\":\"https://dev.similac.com/api/public/profile/login\","
			+ "\"actionPathLinkingAccount\":\"https://dev.similac.com/api/public/profile/conflicting-account\","
			+ "\"redirectOnSuccessURL\":\"/content/an/similac/global/en/strongmoms/welcome\","
			+ "\"redirectOnSuccessURLSubscription\":\"/checkout/register.html\","
			+ "\"checkoutPageURL\":\"https://dev-secure.similac.com/checkout/cart\",\"myOffersURL\":\"/my_offers.html\","
			+ "\"actionPathToUpdateProfile\":\"/api/private/profile/update-profile-info\",\"site\":{" + REDIRECT_STR
			+ NAME_STR + ",\"social\":{" + REDIRECT_STR + NAME_STR + ",\"reRegister\":{" + REDIRECT_STR + NAME_STR
			+ "}";

	/** The expected result of the negative test */
	private String expectedNegativeJson = "{\"formTitle\":null,\"formName\":null,\"actionPath\":null,"
			+ "\"actionPathLinkingAccount\":null,\"redirectOnSuccessURL\":null,\"redirectOnSuccessURLSubscription\":null,"
			+ "\"checkoutPageURL\":null,\"myOffersURL\":null,\"actionPathToUpdateProfile\":null,"
			+ "\"site\":null,\"social\":null,\"reRegister\":null}";

	@BeforeEach
	void setup() {
		ctx = new AemContext();
		ctx.load().json("/com/abbott/aem/an/similac/core/models/AccountLinkingModel.json", "/content");
		ctx.addModelsForClasses(AccountLinkingModel.class);
	}

	@Test
	void testGetJson() {
		ctx.currentResource("/content/account-linking/jcr:content/account_linking");
		accLinkModel = ctx.request().adaptTo(AccountLinkingModel.class);
		String actual = accLinkModel.getFormJson();
		Assertions.assertEquals(expectedPositiveJson, actual);
	}

	@Test
	void testGetJsonNegative() {
		ctx.currentResource("/content/account-linking-negative/jcr:content/account_linking");
		accLinkModel = ctx.request().adaptTo(AccountLinkingModel.class);
		String actual = accLinkModel.getFormJson();
		Assertions.assertEquals(expectedNegativeJson, actual);
	}
}
