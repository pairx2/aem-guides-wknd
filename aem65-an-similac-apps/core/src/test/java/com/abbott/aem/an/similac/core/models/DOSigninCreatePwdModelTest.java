package com.abbott.aem.an.similac.core.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

/**
 * The test class for the 'Sign In/Create Password' Sling Model
 * 
 * @author Anirudh Garg
 */
@ExtendWith(AemContextExtension.class)
public class DOSigninCreatePwdModelTest {

	/** The AEM context to drive the environment setup */
	private AemContext ctx;

	/** The model under test */
	private DOSignInCreatePwdModel scpwModel;

	/** The expected JSON */
	private String expectedJson = "{\"redirectToPreviousPage\":\"false\",\"enableRecaptcha\":\"false\",\"fields\":[{"
			+ "\"categoryType\":\"others\",\"label\":\"About You\",\"name\":\"ABOUT_YOU\","
			+ "\"type\":\"htmltag\",\"btnClassName\":\"col-6\",\"tagName\":\"h2\"}]}"; 
			

	@BeforeEach
	void setup() {
		ctx = new AemContext();
		ctx.load().json("/com/abbott/aem/an/similac/core/models/do-signin-cpw.json", "/content");
		ctx.addModelsForClasses(AccountLinkingModel.class);
	}

	@Test
	void testGetSignInJson() {
		ctx.currentResource("/content/do-signin-cpw/jcr:content/do_signin_cpw");
		scpwModel = ctx.request().adaptTo(DOSignInCreatePwdModel.class);
		String actual = scpwModel.getSignInJson();
		Assertions.assertEquals(expectedJson, actual);
	}

	@Test
	void testGetCreatePwdJson() {
		ctx.currentResource("/content/do-signin-cpw/jcr:content/do_signin_cpw");
		scpwModel = ctx.request().adaptTo(DOSignInCreatePwdModel.class);
		String actual = scpwModel.getCreatePwdJson();
		Assertions.assertEquals(expectedJson, actual);
	}

	@Test
	void testGetJsonNegative() {
		ctx.currentResource("/content/signin-cpw-negative/jcr:content/do_signin_cpw");
		scpwModel = ctx.request().adaptTo(DOSignInCreatePwdModel.class);
		String actual = scpwModel.getSignInJson();
		Assertions.assertNull(actual);
	}
}
