package com.abbott.aem.adc.freestylelibrede.servlets;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.models.SalesforceLeadRequest;
import com.abbott.aem.adc.freestylelibrede.services.SalesforceLeadService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class SalesforceLeadServletTest {
	
	private AemContext context = new AemContext();
	  
    @InjectMocks
    SalesforceLeadServlet mocksalesforceLeadServlet = new SalesforceLeadServlet();
      
    @Mock
    SlingHttpServletRequest request ;  
    
    @Mock
    SlingHttpServletResponse response; 
    @Mock
    private transient SalesforceLeadService leadService;
    
    SalesforceLeadRequest model;
    
    @BeforeEach
    void setup() throws IOException {
    	
        request = context.request();
        response = context.response(); 
        SalesforceLeadRequest model = request.adaptTo(SalesforceLeadRequest.class);             
    }   
    
    @Test
    protected void testDopost() throws ServletException, IOException {
	      	
    		mocksalesforceLeadServlet.doPost(request,response);
    		String responseString = leadService.createLead(model);
		    Assert.assertNull("lead",responseString);      
    }
 
}
