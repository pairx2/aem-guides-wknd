package com.abbott.aem.platform.common.components.models.impl.v1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Mock;

import com.abbott.aem.platform.common.components.models.PlatformPage;
import com.day.cq.commons.Externalizer;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;


@ExtendWith(AemContextExtension.class)
class PlatformPageImplTest {
	
	private static final String RESOURCE = "/content/platformpage";
	private static final String EXTERNALIZER_DOMAIN = "myDomain";
	private final AemContext ctx = new AemContext();
	private PlatformPage page;
	
	@Mock
    private Externalizer externalizer; 
	

	@BeforeEach
	public void setUp() throws Exception {
		ctx.addModelsForClasses(PlatformPageImpl.class);
		ctx.load().json("/com/abbott/aem/platform/common/components/models/impl/v1/PlatformPageImplTest.json", RESOURCE);
		ctx.currentPage(RESOURCE);
		page = ctx.request().adaptTo(PlatformPage.class);
		assertTrue(page instanceof PlatformPageImpl);
		((PlatformPageImpl) page).init();
	}

	@Test
	void testGetDivision() {
		assertEquals("testDivision", page.getDivision());
	}

	@Test
	void testGetSitename() {
		assertEquals("Abbott Platform", page.getSitename());

		PlatformPage obj1 = new PlatformPageImpl();
		PlatformPage obj2 = new PlatformPageImpl();
		assert obj1.equals(obj2);
		assert StringUtils.isNotBlank(obj1.toString());
	}

	@Test
	void testGetTheme() {
		assertEquals("abbott.theme-frestyle", page.getTheme());

	}

	@Test
	void testGetExternalizerDomain() {
		assertEquals("myDomain", page.getExternalizerDomain());
	}

	@Test
	void testGetReCaptchaSiteKey() {
		assertEquals("siteKey", page.getReCaptchaSiteKey());
	}

	@Test
	void testGetReCaptchaScriptsrc() {
		assertEquals("scriptSrc", page.getReCaptchaScriptsrc());
	}
	
	@Test
	void testGetGoogleMapApiKey() {
		assertEquals("mapApiKey", page.getGoogleMapApiKey());
	}
	
	@Test
	void testGetGoogleMapApiUrl() {
		assertEquals("mapApiUrl", page.getGoogleMapApiUrl());
	}
		
	@Test
	void testGetGtmId() {
		assertEquals("GTM-XXX", page.getGtmId());
	}
	
	@Test
	void testGetOgType() {
		assertEquals("website", page.getOgType());
	}
	
	@Test
	void testGetOgTitle() {
		assertEquals("Home Abbott", page.getOgTitle());
	}

	@Test
	void testGetMetaKeywords(){assertEquals("keywords", page.getMetaKeywords());}
	
	@Test
	void testGetOgDescription() {
		assertEquals("At Abbott we help people live fully with our life-changing technology", page.getOgDescription());
	}
	
	@Test
	void testGetOgImage() {
		externalizer = mock(Externalizer.class);
		
		String ogUrl = page.getOgImage();
        String externalizedOgUrl = "http://localhost:4502/content/dam/abbott/investorsImg1.jpg";
        when(externalizer.externalLink(null, EXTERNALIZER_DOMAIN, ogUrl)).thenReturn(externalizedOgUrl);
				
	}

	@Test
	void testGetCanonicalUrl() {
		assertEquals("/content/platformpage.html", page.getCanonicalUrl());
	}
	
	@Test
	void testGetPageTitle() {
		assertEquals("Sample Page", page.getPageTitle());
	}

	@Test
	void testGetCookieScript() {
		assertEquals("cookieScriptSrc", page.getCookieScript());
	}

	@Test
	void testGetAdobeAnalyticsScript() {
		assertEquals("https://assets.adobedtm.com/", page.getAdobeAnalyticsScript());
	}

	@Test
	void testGetLoginPage() {
		assertEquals("loginPageSrc", page.getLoginPage());
	}

	@Test
	void testGetJqueryVersion() {
		assertEquals("granite.utils.custom", page.getJqueryVersion());
	}
	@Test
	void testGetLogoutRedirectPage() { assertEquals("logoutRedirectPageSrc", page.getLogoutRedirectPage()); }
	
	@Test
	void testGetHrefPageMetaData() {
		assertEquals("true", page.getHrefPageMetaData());
	}
	
	@Test
	void testGetHrefLangLocale() {
		assertEquals("Href Language Locale", page.getHrefLangLocale());
	}
	
	@Test
	void testGetHrefLangAlternateUrl() {
		assertEquals("Href Lang Alternate Url", page.getHrefLangAlternateUrl());
	}
	
	@Test
	void testSiteDisclaimerExpFragPath() {
		assertEquals("/content/experience-fragments/bts/global-reference/master/en/disclaimer/siteentry/master", page.getSiteEnteringPopupNoGeoFragmentPath());
	}
	
	@Test
	void testSiteSectionDisclaimerExpFragPath() {
		assertEquals("/content/experience-fragments/bts/global-reference/master/en/disclaimer/sitesection/master", page.getSiteSectionSpecificFragmentPath());
	}
	
	@Test
	void testGetStructuredData() {
		assertEquals("none", page.getStructuredData());
	}
	
	@Test
	void testCookieExpirationTime() {
		assertEquals("Cookie Expiration Time", page.getCookieExpirationTime());
	}
	@Test
	void testCookieHidden() {
		assertEquals("Cookie Hidden", page.getCookieHidden());
	}
	@Test
	void testGetCmpId() {
		assertEquals("123ln", page.getTrustArcCmpId());
		
	
	}
	@Test
	void testGetGetBlockListUrl() {
		assertEquals("scripturl2", page.getTrustArcBlockListUrl());
		
	}
	
	 @Test 
	 void testGetCoreLibraryUrl()
	 { 
		 assertEquals("scripturl1",page.getTrustArcCoreLibraryUrl());
 
	 }
	 
	 @Test 
	 void  testGetTrustArcScriptUrl()
	 { 
		 assertEquals("scripturl3",page.getTrustArcScriptUrl());
 
	 }
	 
	 @Test
	 void testGetTrustArcEnable()
	 {
		 Assertions.assertThrows(UnsupportedOperationException.class, () -> page.getTrustArcEnable());
		 }
	@Test
	void testSelfValue() {
		assertEquals("123ln", page.getTrustArcSelfValue());
	}	 
}

