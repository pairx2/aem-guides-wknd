package com.abbott.aem.platform.common.components.models.utils;

import static junit.framework.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PlatformUtilTest {

    @Mock
    SlingHttpServletRequest request;

    @Mock
    Page page;

    @Mock
    ValueMap map;

    @BeforeEach
    public void setUp() throws Exception {
        page = Mockito.mock(Page.class);
    }

    @Test
    public void testDamValidateLinks() {
        String actual = PlatformUtil.ensureProperLink("/content/dam/abc");
        String expected = "/content/dam/abc";
        assertEquals(expected, actual);
    }

    @Test
    public void testContentValidateLinks() {
        String actual = PlatformUtil.ensureProperLink("/content/abbott");
        String expected = "/content/abbott.html";
        assertEquals(expected, actual);
    }

    @Test
    public void testWWWValidateLinks() {
        String actual = PlatformUtil.ensureProperLink("www.google.com");
        String expected = "https://www.google.com";
        assertEquals(expected, actual);
    }

    @Test
    public void testPassNullValue_avoidNPE() {
        String actual = PlatformUtil.ensureProperLink(null);
        String expected = null;
        assertEquals(expected, actual);
    }

    @Test
    public void testAddHttpsIfNonInternalLink() {
        String actual = PlatformUtil.addHttpsIfRequired("sample.freestyle.abbott/");
        String expected = "https://sample.freestyle.abbott/";
        assertEquals(expected, actual);
    }

    @Test
    public void testAddHttpsIfStartWithWWW() {
        String actual = PlatformUtil.addHttpsIfRequired("www.abbott.com");
        String expected = "https://www.abbott.com";
        assertEquals(expected, actual);
    }

    @Test
    public void testNotAddHttpsIfStartWithHttp() {
        String actual = PlatformUtil.addHttpsIfRequired("http://www.abbott.com");
        String expected = "http://www.abbott.com";
        assertEquals(expected, actual);
    }


    @Test
    public void testNotAddHttpsIfInternalLink() {
        String actual = PlatformUtil.addHttpsIfRequired("/content/test");
        String expected = "/content/test";
        assertEquals(expected, actual);
    }

    @Test
    public void testPropertyValue() {
        when(map.containsKey("test")).thenReturn(true);
        when(map.get("test", String.class)).thenReturn("https://www.google.com");
        String actual = PlatformUtil.getPropertyValue(map, "test");
        String expected = "https://www.google.com";
        assertEquals(expected, actual);
    }

    @Test
    public void testgetUrlvanity() {
        when(request.getContextPath()).thenReturn("/abc");
        //when(page.getPath()).thenReturn("/xyz");
        when(page.getVanityUrl()).thenReturn("/vanity");
        assertTrue(PlatformUtil.getURL(request, page).equals("/abc/vanity"));
    }

    @Test
    public void testgetUrl() {
        when(request.getContextPath()).thenReturn("/abc");
        when(page.getPath()).thenReturn("/xyz");
        //when(page.getVanityUrl()).thenReturn("/vanity");
        assertTrue(PlatformUtil.getURL(request, page).equals("/abc/xyz.html"));
    }

}