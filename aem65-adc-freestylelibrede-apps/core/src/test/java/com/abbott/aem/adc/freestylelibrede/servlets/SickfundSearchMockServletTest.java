package com.abbott.aem.adc.freestylelibrede.servlets;

import static org.mockito.ArgumentMatchers.any;
import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import junit.framework.Assert;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})

public class SickfundSearchMockServletTest {
	
	private AemContext context = new AemContext();
	
	@InjectMocks	
	SickfundSearchMockServlet exporter = new SickfundSearchMockServlet();
    MockSlingHttpServletRequest request;
    MockSlingHttpServletResponse response;

    @BeforeEach
    void setup() throws IOException {
        request = context.request();
        response= context.response();
       
       
    }
    
   
	@Test
    void doGet() throws IOException, ServletException {
        exporter.doGet(request,response);      

        Assert.assertNotNull("AOK Hessen",new String(response.getOutput(),"UTF-8"));


    }

}


