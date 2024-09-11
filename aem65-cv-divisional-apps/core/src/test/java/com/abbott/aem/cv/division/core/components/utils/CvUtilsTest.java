
package com.abbott.aem.cv.division.core.components.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import com.day.cq.wcm.api.Page;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CvUtilsTest {



    @Mock
    Page page;


    @BeforeEach
    public void setUp() throws Exception {
        page = Mockito.mock(Page.class);
    }

    @Test
    public void testDamValidateLinks() {
        String actual = CvUtils.ensureProperLink("/content/dam/abc");
        String expected = "/content/dam/abc";
        assertEquals(expected, actual);
    }

    @Test
    public void testContentValidateLinks() {
        String actual = CvUtils.ensureProperLink("/content/abbott");
        String expected = "/content/abbott.html";
        assertEquals(expected, actual);
    }

    @Test
    public void testWWWValidateLinks() {
        String actual = CvUtils.ensureProperLink("www.google.com");
        String expected = "www.google.com";
        assertEquals(expected, actual);
    }

    @Test
    public void testPassNullValue_avoidNPE() {
        String actual = CvUtils.ensureProperLink(null);
        String expected = null;
        assertEquals(expected, actual);
    }


}