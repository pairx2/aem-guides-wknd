package com.abbott.aem.platform.common.constants;

import static org.junit.Assert.*;
import org.junit.Test;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class CommonConstantsTest {

    @Test
    public void testConstants() {
        String[] expectedStrings = {
                "action", "siteURL", "/content/dam", "/content", ".html", "www", "#",
                "http", "https://", ".html#", "metadata", "stackTitle", "stackLink",
                "isStackExternal", "links", "linkText", "destinationURL", "isExternal",
                "headline", "searchKeywords", "searchKeyword", "searchKeywordLink",
                "abbottcom", "siteName", "x-country-code", "x-preferred-language",
                "x-application-id", "x-application-access-key", "x-origin-secret",
                "en_us", "reCaptchaSiteKey", "reCaptchaScriptsrc", "searchResultsPage",
                "text", "value", "tagTitle", "tag", "EN", "US", "googleMapApiKey",
                "googleMapApiUrl", "abbott-platform/components/content/molecules/searchresultitem/v1/searchresultitem",
                "/apps/abbott-platform/components/content/molecules/searchcarditem/v1/searchcarditem",
                "/apps/abbott-platform/components/content/molecules/tabsearch/v1/tabsearch",
                "abbott-platform/datasource/theme/dropdown", "searchType", "/"
        };

        String[] actualStrings = {
                CommonConstants.ACTION, CommonConstants.SITE_URL, CommonConstants.CONTENT_DAM,
                CommonConstants.CONTENT, CommonConstants.HTML_EXTENSION, CommonConstants.WORLD_WIDE_WEB,
                CommonConstants.HASH, CommonConstants.HTTP, CommonConstants.HTTPS,
                CommonConstants.HTML_HASH, CommonConstants.META_DATA, CommonConstants.STACK_TITLE,
                CommonConstants.STACK_LINK, CommonConstants.STACK_EXTERNAL_LINK,
                CommonConstants.LINKS, CommonConstants.LINK_TEXT, CommonConstants.DESTINATION_URL,
                CommonConstants.IS_EXTERNAL, CommonConstants.TOP_SEARCH_HEADLINE,
                CommonConstants.TOP_SEARCH_KEYWORDS, CommonConstants.TOP_SEARCH_KEYWORD,
                CommonConstants.TOP_SEARCH_LINK, CommonConstants.ABBOTTCOM, CommonConstants.SITE_NAME,
                CommonConstants.X_COUNTRY_CODE, CommonConstants.X_PREFERRED_LANGUAGE,
                CommonConstants.X_APPLICATION_ID, CommonConstants.X_APPLICATION_ACCESS_KEY,
                CommonConstants.X_ORIGIN_SECRET, CommonConstants.EN_US, CommonConstants.RE_CAPTCHA_SITE_KEY,
                CommonConstants.RE_CAPTCHA_SCRIPT_SRC, CommonConstants.SEARCH_RESULTS_PAGE,
                CommonConstants.TEXT, CommonConstants.VALUE, CommonConstants.TAG_TITLE,
                CommonConstants.TAG, CommonConstants.X_PREFERRED_LANGUAGE_VALUE,
                CommonConstants.X_COUNTRY_CODE_VALUE, CommonConstants.GOOGLE_MAP_API_KEY,
                CommonConstants.GOOGLE_MAP_API_URL, CommonConstants.RESOURCE_TYPE_SEARCH_RESULT,
                CommonConstants.RESOURCE_TYPE_SEARCH_CARD, CommonConstants.RESOURCE_TYPE_TAB_SEARCH,
                CommonConstants.RESOURCE_TYPE_THEME_DROPDOWN, CommonConstants.SEARCH_TYPE,
                CommonConstants.SLASH
        };

        assertArrayEquals(expectedStrings, actualStrings);
    }

    @Test
    public void testPrivateConstructor() {
        try {
            invokePrivateConstructor();
            fail("Expected an IllegalStateException to be thrown");
        } catch (InvocationTargetException e) {
            Throwable cause = e.getCause();
            assertTrue("Expected cause to be IllegalStateException", cause instanceof IllegalStateException);
            assertEquals("Common Constants", cause.getMessage());
        }
    }

    private void invokePrivateConstructor() throws InvocationTargetException {
        try {
            Constructor<CommonConstants> constructor = CommonConstants.class.getDeclaredConstructor();
            constructor.setAccessible(true);
            constructor.newInstance();
        } catch (NoSuchMethodException | InstantiationException | IllegalAccessException e) {
            throw new RuntimeException("Unexpected exception: " + e);
        }
    }
}