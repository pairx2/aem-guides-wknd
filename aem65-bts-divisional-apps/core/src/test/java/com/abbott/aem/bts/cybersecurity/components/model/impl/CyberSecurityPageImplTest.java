package com.abbott.aem.bts.cybersecurity.components.model.impl;

import com.abbott.aem.platform.common.components.services.APILookupService;
import com.abbott.aem.platform.common.components.services.impl.APILookupServiceImpl;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.junit.Rule;
import java.lang.IllegalArgumentException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.rules.ExpectedException;

import com.abbott.aem.bts.cybersecurity.components.model.CybersecurityPage;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.mockito.InjectMocks;
import org.mockito.internal.matchers.Null;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * @author mukeshkumar.k
 */
@ExtendWith(AemContextExtension.class)
public class CyberSecurityPageImplTest {

	private final AemContext ctx = new AemContext();

	private APILookupService apiLookupService;

	@Rule
	public ExpectedException exception = ExpectedException.none();

	private CybersecurityPage cPage;

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(CybersecurityPageImpl.class);
		ctx.load().json("/com/abbott/aem/bts/cybersecurity/components/model/impl/cyberSecurityPage.json", "/content/bts/cybersecurity/us/en/secure/products/info");
		apiLookupService = ctx.registerInjectActivateService(new APILookupServiceImpl());
	}

	@Test
	void testPostConstruct() {
		ctx.currentResource("/content/bts/cybersecurity/us/en/secure/products/info/jcr:content");
		cPage = ctx.request().adaptTo(CybersecurityPage.class);
		String expected = "/content/bts/cybersecurity/us/en/secure/products/vsi";
		((CybersecurityPageImpl) cPage).init();
		assertTrue(cPage instanceof CybersecurityPageImpl);
		assertEquals("/content/bts/cybersecurity/us/en/secure/products",cPage.getProductPage());
		assertEquals("1234",cPage.getProductId());
		assertEquals("/content/bts/cybersecurity/us/en/sign-in", cPage.getSignInPage());
		assertEquals("", cPage.getHomePage());
		assertEquals("/content/bts/cybersecurity/us/en/secure/products/info.html",cPage.getInfoPage());
		assertEquals("/content/bts/cybersecurity/us/en/secure/products/vsi",cPage.getVsiPage());
	}

	@Test
	void testResourceNull() {
		ctx.currentResource((Resource) null);
		ctx.request().adaptTo(CybersecurityPage.class);
	}

	@Test
	void testGetApiEndPoint(){

		ctx.currentResource("/content/bts/cybersecurity/us/en/secure/products/info/jcr:content");
		cPage = ctx.request().adaptTo(CybersecurityPage.class);
		cPage.getApiEndPoint();
	}


	@Test
	final void testTableBodyParams() {
		cPage = ctx.request().adaptTo(CybersecurityPage.class);
		final String expected = "listUserPermission";
		ctx.currentResource("/content");
		CybersecurityPage cPage = ctx.request().adaptTo(CybersecurityPage.class);
		String actual = cPage.getTableBodyParams();
		assertEquals(expected, actual);

	}

	@Test
	public void testGetProductPage() {
		ctx.currentResource("/content/bts/cybersecurity/us/en/secure/products/info/jcr:content");
		cPage = ctx.request().adaptTo(CybersecurityPage.class);
		exception.expect(IllegalArgumentException.class);
		exception.expectMessage("Illegal Argument Exception");
		String expected = "/content/bts/cybersecurity/us/en/secure/products";
		ctx.currentResource("/content");
		CybersecurityPage cPage = ctx.request().adaptTo(CybersecurityPage.class);
		String actual = cPage.getProductPage();
		assertEquals(expected, actual);
	}

}
