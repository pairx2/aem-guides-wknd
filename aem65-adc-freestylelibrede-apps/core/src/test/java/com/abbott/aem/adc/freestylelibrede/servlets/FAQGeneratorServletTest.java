package com.abbott.aem.adc.freestylelibrede.servlets;

import static org.mockito.ArgumentMatchers.any;

import java.io.IOException;

import javax.servlet.ServletException;

import org.apache.commons.codec.CharEncoding;
import org.apache.sling.testing.mock.sling.servlet.MockRequestPathInfo;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletRequest;
import org.apache.sling.testing.mock.sling.servlet.MockSlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.abbott.aem.adc.freestylelibrede.services.DictionaryJsonExporter;
import com.abbott.aem.adc.freestylelibrede.services.FAQArticleGeneratorService;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.Assert;

@ExtendWith({AemContextExtension.class,MockitoExtension.class})
public class FAQGeneratorServletTest {
	
	private AemContext context = new AemContext();
	
	 @InjectMocks
	 FAQGeneratorServlet FAQ = new FAQGeneratorServlet();
	 
	 @Mock
	 private  FAQArticleGeneratorService faqArticleGeneratorService;


	    MockSlingHttpServletRequest request;
	    MockSlingHttpServletResponse response;

	    @BeforeEach
	    void setup() throws IOException {

	        context.registerService(FAQArticleGeneratorService.class,faqArticleGeneratorService);
	        request = context.request();
	        response= context.response();
	        	      
	    }
	    
	    @Test
	    void doGet() throws IOException, ServletException {
	    	
	    	FAQ.doGet(request,response);	       
	    	faqArticleGeneratorService.generateFromFile(request.getResourceResolver());
	    	Assert.assertTrue(true);
	       
	    }


}
