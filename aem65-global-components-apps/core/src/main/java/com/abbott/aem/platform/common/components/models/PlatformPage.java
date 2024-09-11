package com.abbott.aem.platform.common.components.models;

import com.adobe.cq.wcm.core.components.models.Page;

import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface PlatformPage extends Page {

    default String getDivision() {
        throw new UnsupportedOperationException();
    }

    default String getSitename() {
        throw new UnsupportedOperationException();
    }

    default String getTheme() {
        throw new UnsupportedOperationException();
    }

    default String getExternalizerDomain() {
        throw new UnsupportedOperationException();
    }

    default String getReCaptchaSiteKey() {
        throw new UnsupportedOperationException();
    }

    default String getReCaptchaScriptsrc() {
        throw new UnsupportedOperationException();
    }

    default String getGtmId() {
        throw new UnsupportedOperationException();
    }

    default String getOgType() {
        throw new UnsupportedOperationException();
    }

    default String getOgTitle() {
        throw new UnsupportedOperationException();
    }

    default String getOgDescription() {
        throw new UnsupportedOperationException();
    }

    default String getOgImage() {
        throw new UnsupportedOperationException();
    }

    default String getCanonicalUrl() {
        throw new UnsupportedOperationException();
    }

    default boolean isRightToLeft() {
        throw new UnsupportedOperationException();
    }

    default String getLanguageCode() {
        throw new UnsupportedOperationException();
    }

    default String getCountryCode() {
        throw new UnsupportedOperationException();
    }

    default String getEslEndPointURL() {
        throw new UnsupportedOperationException();
    }

    default boolean isCommerceEnabled() {
        throw new UnsupportedOperationException();
    }

	default String getCookieScript()  {
		throw new UnsupportedOperationException();
	}

    default String getAdobeAnalyticsScript()  {
        throw new UnsupportedOperationException();
    }

	default String getLoginFormFragmentPath()  {
		throw new UnsupportedOperationException();
	}
	
	default String getLoginPage(){
		throw new UnsupportedOperationException();
	}

    default String getLogoutRedirectPage() {
        throw new UnsupportedOperationException(); }
    
    default String getCartPage(){
        throw new UnsupportedOperationException();
    }

    default String newRelicAccountID() {
        throw new UnsupportedOperationException();
    }
    default String newRelicAgentID() {
        throw new UnsupportedOperationException();
    }

    default boolean isNewRelicCookiesEnabled() {
        throw new UnsupportedOperationException();
    }

    default String getGoogleMapApiKey() {
		throw new UnsupportedOperationException();
	}
	
	default String getGoogleMapApiUrl() {
		throw new UnsupportedOperationException();
	}
    default String getMetaKeywords(){throw new UnsupportedOperationException();}
    default String getPageTitle()  {
		throw new UnsupportedOperationException();
	}
    default String getHrefPageMetaData()  {
		throw new UnsupportedOperationException();
	}
    default String getHrefLangAlternateUrl()  {
		throw new UnsupportedOperationException();
	}
    default String getHrefLangLocale()  {
		throw new UnsupportedOperationException();
	}
    default String getJqueryVersion() {
        throw new UnsupportedOperationException();
    }
	default String getSiteEnteringPopupNoGeoFragmentPath() {
        throw new UnsupportedOperationException();
    }
	default String getSiteSectionSpecificFragmentPath() {
        throw new UnsupportedOperationException();
    }
    default String getStructuredData() {
        throw new UnsupportedOperationException();
    }
	default String getCookieExpirationTime() {
        throw new UnsupportedOperationException();
    }
	default String getCookieHidden() {
        throw new UnsupportedOperationException();
    }
	 default String getTrustArcCmpId() {
	        throw new UnsupportedOperationException();
	    }
	 default String getTrustArcBlockListUrl() {
	        throw new UnsupportedOperationException();
	    }
	 default String getTrustArcCoreLibraryUrl() {
	        throw new UnsupportedOperationException();
	    }
		
     default String getTrustArcScriptUrl() {
	        throw new UnsupportedOperationException();
	    }
		
	 default boolean getTrustArcEnable() {
	        throw new UnsupportedOperationException();	
	    }
     default String getFaqFolderPath() {
        throw new UnsupportedOperationException();
    }

     default String getFaqPagePath() {
        throw new UnsupportedOperationException();
    }
    default String getTrustArcSelfValue() {
        throw new UnsupportedOperationException();
    }
}