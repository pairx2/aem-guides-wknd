package com.abbott.aem.cloud.platform.core.dispatcher.ttl;

import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.cm.ConfigurationException;
import org.osgi.service.component.ComponentContext;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Dictionary;
import java.util.Hashtable;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AbstractDispatcherCacheHeaderFilterTest {

    @Mock
    private FilterChain filterChain;

    @Mock
    private FilterConfig filterConfig;

    @Mock
    private ComponentContext componentContext;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    private AbstractDispatcherCacheHeaderFilter filter;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        filter = new AbstractDispatcherCacheHeaderFilter() {
            @Override
            protected String getHeaderName() {
                return "Cache-Control";
            }

            @Override
            protected String getHeaderValue(HttpServletRequest request) {
                return "no-cache";
            }

            @Override
            protected void doActivate(ComponentContext context) {
            }
        };
    }

    @Test
    void testDoFilterWhenNotHttpRequest() throws Exception {
        ServletRequest servletRequest = mock(ServletRequest.class);
        ServletResponse servletResponse = mock(ServletResponse.class);
        filter.doFilter(servletRequest, servletResponse, filterChain);
        verify(filterChain).doFilter(servletRequest, servletResponse);
    }

    @Test
    void testDoFilterWhenNotHttpResponse() throws Exception {
        ServletRequest servletRequest = mock(HttpServletRequest.class);
        ServletResponse servletResponse = mock(ServletResponse.class);
        filter.doFilter(servletRequest, servletResponse, filterChain);
        verify(filterChain).doFilter(servletRequest, servletResponse);
    }

    @Test
    void testDoFilterWhenAcceptsFalse() throws Exception {
        when(request.getMethod()).thenReturn("POST");
        when(request.getHeaders("Server-Agent")).thenReturn(Collections.enumeration(Collections.singletonList("Not-Dispatcher")));
        filter.doFilter(request, response, filterChain);
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void testDoFilterWhenAcceptsTrue() throws Exception {
        when(request.getMethod()).thenReturn("GET");
        when(request.getHeaders("Server-Agent")).thenReturn(Collections.enumeration(Collections.singletonList("Communique-Dispatcher")));
        filter.doFilter(request, response, filterChain);
        verify(filterChain).doFilter(request, response);
        verify(response).addHeader("Cache-Control", "no-cache");
    }

    @Test
    void testActivateWithNoFilterPattern() {
        ComponentContext context = mock(ComponentContext.class);
        Dictionary<String, Object> properties = new Hashtable<>();

        // Set up the ComponentContext
        when(context.getProperties()).thenReturn(properties);

        // No filter patterns specified, should throw ConfigurationException
        assertThrows(ConfigurationException.class, () -> filter.activate(context));
    }

    @Test
    void testActivateWithFilterEngineSling() throws Exception {
        ComponentContext context = mock(ComponentContext.class);
        BundleContext bundleContext = mock(BundleContext.class);
        Dictionary<String, Object> properties = new Hashtable<>();
        ServiceRegistration serviceRegistration = mock(ServiceRegistration.class);

        // Set up the ComponentContext
        when(context.getBundleContext()).thenReturn(bundleContext);
        when(context.getProperties()).thenReturn(properties);

        // Set up properties
        properties.put(AbstractDispatcherCacheHeaderFilter.PROP_FILTER_PATTERN, "example-pattern");
        properties.put(AbstractDispatcherCacheHeaderFilter.PROP_DISPATCHER_FILTER_ENGINE, AbstractDispatcherCacheHeaderFilter.PROP_DISPATCHER_FILTER_ENGINE_SLING);

        // Mock service registration
        when(bundleContext.registerService(eq(Filter.class.getName()), eq(filter), any())).thenReturn(serviceRegistration);
        filter.activate(context);
    }

    @Test
    void testActivateWithFilterEngineHttpWhiteboard() throws Exception {
        ComponentContext context = mock(ComponentContext.class);
        BundleContext bundleContext = mock(BundleContext.class);
        Dictionary<String, Object> properties = new Hashtable<>();
        ServiceRegistration serviceRegistration = mock(ServiceRegistration.class);

        // Set up the ComponentContext
        when(context.getBundleContext()).thenReturn(bundleContext);
        when(context.getProperties()).thenReturn(properties);

        // Set up properties
        properties.put(AbstractDispatcherCacheHeaderFilter.PROP_FILTER_PATTERN, "example-pattern");
        properties.put(AbstractDispatcherCacheHeaderFilter.PROP_DISPATCHER_FILTER_ENGINE, AbstractDispatcherCacheHeaderFilter.PROP_DISPATCHER_FILTER_ENGINE_HTTP_WHITEBOARD);

        // Mock service registration
        when(bundleContext.registerService(eq(Filter.class.getName()), eq(filter), any())).thenReturn(serviceRegistration);
        filter.activate(context);
    }

    @Test
    void testDeactivateWithServiceRegistrations() throws Exception {
        ComponentContext context = mock(ComponentContext.class);
        BundleContext bundleContext = mock(BundleContext.class);
        Dictionary<String, Object> properties = new Hashtable<>();
        ServiceRegistration serviceRegistration = mock(ServiceRegistration.class);

        // Set up the ComponentContext
        when(context.getBundleContext()).thenReturn(bundleContext);
        when(context.getProperties()).thenReturn(properties);

        // Set up properties
        properties.put(AbstractDispatcherCacheHeaderFilter.PROP_FILTER_PATTERN, "example-pattern");
        properties.put(AbstractDispatcherCacheHeaderFilter.PROP_DISPATCHER_FILTER_ENGINE, AbstractDispatcherCacheHeaderFilter.PROP_DISPATCHER_FILTER_ENGINE_HTTP_WHITEBOARD);

        // Mock service registration
        when(bundleContext.registerService(eq(Filter.class.getName()), eq(filter), any())).thenReturn(serviceRegistration);
        filter.activate(context);

        filter.deactivate(componentContext);
        verify(serviceRegistration).unregister();
    }

    @Test
    void testDestroy() {
        filter.destroy(); // No exception should be thrown
    }
}
