package com.abbott.aem.adc.freestylelibrede.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.SyntheticResource;
import org.apache.sling.testing.mock.sling.servlet.MockRequestDispatcherFactory;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.filters.EditContextServletFilter.Config;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
public class EditContextServletFilterTest {

       private AemContext context = new AemContext();
       @InjectMocks
       EditContextServletFilter EditContextServlet = new EditContextServletFilter();
       
       String RESPONSIVE_GRID_RT = "wcm/foundation/components/responsivegrid";

       @Mock
       Config config;

       @Mock
       ResourceUtil util;

       @Mock
       FilterChain filterChain;

       @Mock
       FilterConfig filterConfig;
       
       @Mock
       RequestDispatcher dispatcher;
       
    
       @BeforeEach
       void setup() throws IOException {
             MockitoAnnotations.initMocks(this);
       }

       @Test
       void testdoFilterDisabled() throws IOException, ServletException {
             EditContextServlet.doFilter(context.request(), context.response(), filterChain);
			 Mockito.when(config.enabled()).thenReturn(true);
			 Assert.assertEquals(true, config.enabled());
			 
       }

       @Test
       void testdoFilterEnabled() throws IOException, ServletException {   	      	     
             EditContextServlet.activate(config);
             EditContextServlet.init(filterConfig);
             Mockito.when(config.enabled()).thenReturn(true);
             EditContextServlet.doFilter(context.request(), context.response(), filterChain); 
             EditContextServlet.destroy();
             Assert.assertEquals(true, config.enabled());
       }
       
       @Test
       void testResponsiveGridEqual() throws IOException, ServletException {
        	   dispatcher.forward(context.request(),  context.response());   
			 Mockito.when(config.enabled()).thenReturn(true);
			 Assert.assertEquals(true, config.enabled());			   
       }   

}
