package com.abbott.aem.cloud.platform.core.environmentindicator;

import com.day.cq.wcm.api.WCMMode;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.apache.sling.xss.XSSAPI;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedConstruction;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.atLeast;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AemEnvironmentIndicatorFilterTest {

    @InjectMocks
    private AemEnvironmentIndicatorFilter filter;

    private final AemContext context = new AemContext();

    @Mock
    private  XSSAPI xssapi;

    MockedStatic<FrameworkUtil> mockedStatic;

    @BeforeEach
    public void setUp() {
        // Initialize the Map and add the required configurations key value pair
        Map<String, Object> config = Map.of("always.include.base.css", true,
                "always.include.color.css", true,
                "css.color", "#fff",
                "css.override", "#fff",
                "browser.title.prefix", "test");

        context.registerService(XSSAPI.class, xssapi);

        //mocking FrameworkUtil.getBundle static method
        Bundle bundle = context.bundleContext().getBundle();
        mockedStatic = mockStatic(FrameworkUtil.class);
        Answer<org.osgi.framework.Bundle> answer = invocationOnMock -> bundle;
        when(FrameworkUtil.getBundle(any(Class.class))).thenAnswer(answer);

        doReturn("test").when(xssapi).encodeForJSString(anyString());

        //set the osgi config service
        context.registerInjectActivateService(filter, config);

    }

    @AfterEach
    void tearDown(){
        mockedStatic.close();
    }

    @Test
    void testInit() throws ServletException {
        FilterConfig filterConfig = mock(FilterConfig.class);

        filter.init(filterConfig);
        verify(filterConfig, times(0)).getFilterName();
    }

    @Test
    void testDoFilter() throws ServletException, IOException {
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();

        FilterChain filterChain = mock(FilterChain.class);
        MockedConstruction<BufferedHttpServletResponse> mockedConstruction = mockConstruction(BufferedHttpServletResponse.class, (mocked, context) ->{
            BufferedServletOutput output = mock(BufferedServletOutput.class);
            when(mocked.getBufferedServletOutput()).thenReturn(output);
            when(output.getWriteMethod()).thenReturn(BufferedServletOutput.ResponseWriteMethod.WRITER);
            when(output.getBufferedString()).thenReturn("<body>SUCCESS</body>");
        });

        request.setMethod("GET");
        response.setContentType("html");
        context.response().getOutputStream();

        //Perform the filter operation
        filter.doFilter(request, response, filterChain);
        String actual = response.getOutputAsString();
        assertTrue(actual.contains("</body>"));
        mockedConstruction.close();
    }

    @Test
    void testDoFilter_whenEmptyContents() throws ServletException, IOException {
        // Simulate a request from AEM editor
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        FilterChain filterChain = mock(FilterChain.class);

        request.setMethod("GET");
        response.setContentType("html");

        // Perform the filter operation
        filter.doFilter(request, response, filterChain);
        String actual = response.getOutputAsString();
        assertEquals("", actual);
    }

    @Test
    void testDoFilter_whenNotServletRequest() throws ServletException, IOException {
        // Simulate a request from AEM editor
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        FilterChain filterChain = mock(FilterChain.class);

        request.setMethod("GET");

        // Perform the filter operation
        filter.doFilter(null, null, filterChain);
        verify(filterChain, times(1)).doFilter(null, null);
    }

    @Test
    void testDoFilter_whenImproperlyConfiguredCss() throws ServletException, IOException {
        // Simulate a request from AEM editor
        context.registerInjectActivateService(filter, new HashMap<>());
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();//mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        request.setMethod("GET");

        // Perform the filter operation
        filter.doFilter(request, response, filterChain);
        assertEquals("", filter.getCss());
    }

    @Test
    void testDoFilter_whenUnsupportedGetRequest() throws ServletException, IOException {
        // Simulate a request from AEM editor
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();
        FilterChain filterChain = mock(FilterChain.class);

        request.setMethod("PUT");

        // Perform the filter operation
        filter.doFilter(request, response, filterChain);
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testDoFilter_whenUnsupportedXhrRequest() throws ServletException, IOException {
        // Simulate a request from AEM editor
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();//mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        request.setMethod("GET");
        request.setHeader("X-Requested-With", "XMLHttpRequest");

        // Perform the filter operation
        filter.doFilter(request, response, filterChain);
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testDoFilter_whenUnsupportedEditorPage() throws ServletException, IOException {
        // Simulate a request from AEM editor
        MockSlingHttpServletRequest request = context.request();
        MockSlingHttpServletResponse response = context.response();//mock(HttpServletResponse.class);
        FilterChain filterChain = mock(FilterChain.class);

        request.setMethod("GET");
        request.setHeader("Referer", "/editor.html/testPage");
        request.setPathInfo("/testPage");

        // Perform the filter operation
        filter.doFilter(request, response, filterChain);
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    void testGetTitlePrefix() {
        assertEquals("test", filter.getTitlePrefix());
    }

    @Test
    void testDeactivate() {
        filter.deactivate();
        assertEquals("", filter.getCss());
    }

    @Test
    void testDestroy() {
        filter.destroy();
        atLeast(1);
    }

    @Test
    void testGetWcmMode() {
        // Simulate a request from AEM editor
        MockSlingHttpServletRequest request = context.request();
        request.setAttribute(WCMMode.class.getName(), WCMMode.EDIT);

        WCMMode wcmMode = filter.getWcmMode(request);
        assertEquals(WCMMode.EDIT, wcmMode);
    }
}

